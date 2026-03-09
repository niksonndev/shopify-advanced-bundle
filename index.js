document.addEventListener('alpine:init', () => {
  Alpine.data('bundleBuilder', (config) => ({
    products: config.products || [],
    requiredItems: config.requiredItems || 3,
    discountPercentage: config.discountPercentage || 15,
    currency: config.currency || 'USD',
    selectedIds: [],
    subtotal: 0,
    discountAmount: 0,
    finalTotal: 0,
    isAdding: false,
    errorMessage: '',
    successMessage: '',
    hasOrderNote: false,
    orderNote: '',

    init() {
      this.products = (this.products || []).filter(
        (p) => p && p.id && typeof p.price === 'number',
      );
      this.recalculateTotals();
    },

    get totalSelected() {
      return this.selectedIds.length;
    },

    canCheckout() {
      return this.totalSelected === this.requiredItems;
    },

    progressPercentage() {
      if (!this.requiredItems) return 0;
      return Math.min(
        100,
        Math.round((this.totalSelected / this.requiredItems) * 100),
      );
    },

    isSelected(id) {
      return this.selectedIds.includes(id);
    },

    formatPrice(cents) {
      const value = (cents || 0) / 100;
      try {
        return new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: this.currency,
        }).format(value);
      } catch (e) {
        return value.toFixed(2);
      }
    },

    toggleProduct(product) {
      this.clearMessages();
      const id = product.id;
      if (!id) return;
      if (this.isSelected(id)) {
        this.selectedIds = this.selectedIds.filter((vId) => vId !== id);
      } else {
        if (this.selectedIds.length >= this.requiredItems) {
          this.errorMessage =
            'You can only select exactly 3 products in this bundle.';
          return;
        }
        this.selectedIds.push(id);
      }
      this.recalculateTotals();
    },

    recalculateTotals() {
      let subtotal = 0;
      const selectedSet = new Set(this.selectedIds);
      for (const product of this.products) {
        if (selectedSet.has(product.id)) subtotal += product.price || 0;
      }
      this.subtotal = subtotal;
      if (this.canCheckout()) {
        const discount = subtotal * (this.discountPercentage / 100);
        this.discountAmount = Math.round(discount);
      } else {
        this.discountAmount = 0;
      }
      this.finalTotal = Math.max(0, this.subtotal - this.discountAmount);
    },

    clearMessages() {
      this.errorMessage = '';
      this.successMessage = '';
    },

    buildItemsPayload() {
      return this.selectedIds.map((id) => ({ id, quantity: 1 }));
    },

    async addBundleToCart() {
      this.clearMessages();
      if (!this.canCheckout()) {
        this.errorMessage =
          'Select exactly ' +
          this.requiredItems +
          ' products to complete your bundle.';
        return;
      }
      const items = this.buildItemsPayload();
      if (!items.length) return;
      this.isAdding = true;
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ items }),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.description ||
              errorData.message ||
              'Could not add the bundle to cart.',
          );
        }
        await response.json();
        this.successMessage = 'Bundle added to cart.';
      } catch (error) {
        console.error('[Bundle Builder]', error);
        this.errorMessage =
          error.message ||
          'Error adding (local preview: /cart/add.js does not exist here).';
      } finally {
        this.isAdding = false;
      }
    },
  }));
});
