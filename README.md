# Shopify Advanced Bundle Builder (PoC)

A high-performance, conversion-focused bundling solution for Shopify. This Proof of Concept (PoC) demonstrates how to extend Shopify's native features using a modern, lightweight frontend stack.

![Preview](./demo.gif)

## 🚀 Tech Stack & Rationale

* **Alpine.js v3**: Core reactive state management. Chosen for its minimal footprint and ability to handle complex bundling logic (discounts, validations, and AJAX API payloads) without the overhead of heavy frameworks.
* **Tailwind CSS**: Utility-first styling for a fully responsive, clean, and professional UI.
* **Liquid Architecture**: The project follows Shopify's Theme OS 2.0 structure (`sections/` and `snippets/`) for production-ready organization.
* **Shopify AJAX API**: Pre-wired for `/cart/add.js` integration, capable of injecting multiple items into the cart in a single request.

## 🛠️ Key Features

* **Real-time Logic**: Subtotal and discount calculations update instantly as users toggle products.
* **Visual Feedback**: Progress bar and state-driven badges (Alpine.js) guide the user to complete the bundle.
* **Business Rules**: Logic enforced to ensure exactly 3 items are selected before enabling the checkout, preventing cart errors.
* **Mock Environment**: Includes a standalone `index.html` for immediate previewing without a live Shopify store.

## 📂 Project Structure

- `theme/sections/advanced-bundle-builder.liquid`: Main UI component and Liquid logic.
- `theme/snippets/`: Decoupled scripts and styles for better maintainability.
- `index.html`: Static preview file using mock data for demonstration purposes.

## 📝 How to View
Simply open `index.html` in your browser to see the Alpine.js reactivity and Tailwind layout in action. For Shopify integration, refer to the files inside the `theme/` directory.

## 📄 License
This project is licensed under the [MIT License](LICENSE).