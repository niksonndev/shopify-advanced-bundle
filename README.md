# Advanced Bundle Builder (Shopify)

Seção Liquid para temas Shopify que permite o cliente **montar um pacote** escolhendo uma quantidade fixa de produtos de uma coleção e ganhar um **desconto percentual** automático. Ao completar o pacote, um botão adiciona todos os itens ao carrinho de uma vez.

## Stack

- **Liquid** – dados da loja e da coleção
- **Tailwind CSS** – estilos (deve estar disponível no tema)
- **Alpine.js v3** – interatividade (seleção, totais, adicionar ao carrinho)

## Requisitos no tema

1. **Tailwind CSS**  
   O tema precisa ter Tailwind disponível (build próprio ou CDN). Exemplo por CDN no `theme.liquid`:

   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```

2. **Alpine.js v3**  
   Alpine deve ser carregado antes da seção. Exemplo no `theme.liquid` (antes do `</body>`):

   ```html
   <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
   ```

## Instalação

1. Copie a pasta `sections` para o seu tema Shopify (ou apenas o arquivo `sections/advanced-bundle-builder.liquid`).
2. No **Editor de temas** (Customize), adicione a seção **“Advanced Bundle Builder”** na página desejada (início, coleção, página, etc.).
3. Nas configurações da seção:
   - **Coleção**: escolha a coleção cujos produtos entram no pacote.
   - **Quantidade de itens no pacote**: ex.: 3 (o cliente precisa selecionar exatamente esse número).
   - **Desconto do pacote**: ex.: 15%.
   - Ajuste título, destaque e subtítulo se quiser.

## Comportamento

- O cliente vê os produtos da coleção em cards (imagem, nome, preço).
- Seleciona exatamente **N** itens (valor configurado). Não pode selecionar mais que N.
- A interface mostra:
  - progresso (X/N itens),
  - subtotal,
  - valor do desconto (quando o pacote está completo),
  - total final.
- Ao clicar em **“Adicionar pacote ao carrinho”**, a seção chama a API `/cart/add.js` com todos os itens (variant id + quantity). O desconto visual é apenas informativo; o desconto real precisa ser aplicado no carrinho (discount code, script de carrinho ou app).

## Desconto real no carrinho

Esta seção **não** aplica automaticamente o desconto no carrinho. Ela apenas:

- adiciona os variantes selecionados ao carrinho,
- mostra na UI o valor do desconto que o cliente “ganharia”.

Para aplicar de fato o desconto você pode:

- Criar um **código de desconto** (ex.: `PACOTE15`) e instruir o cliente a usá-lo, ou
- Usar um **app de desconto por pacote** / script que leia os itens do carrinho e aplique o desconto quando as condições forem atendidas, ou
- Implementar uma **Discount API** (Shopify Functions) ou lógica no checkout, se sua loja suportar.

## Evento opcional: atualizar carrinho na UI

Após adicionar o pacote, a seção dispara um evento customizado para o tema atualizar o carrinho (drawer, contador, etc.):

```javascript
window.dispatchEvent(new CustomEvent('cart:refresh'));
```

No seu tema, escute esse evento e chame a API do carrinho ou atualize o HTML do carrinho conforme sua implementação.

## Estrutura do projeto

```
shopify-advanced-bundle/
└── sections/
    └── advanced-bundle-builder.liquid   # Seção única
```

## Schema da seção

- `collection` – coleção dos produtos do pacote  
- `required_items` (2–6) – quantidade exata de itens  
- `discount_percentage` (5–50%) – desconto exibido e referência para aplicar no carrinho  
- `heading_title`, `heading_highlight`, `subheading` – textos da seção  

Tudo configurável pelo Editor de temas.
