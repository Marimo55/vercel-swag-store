## Getting Started

Install dependencies

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

In general, the project has 4 pages:

- Home page - this page contains the random promotional banner, hero section, featured product section (with the featured products presented first)
- Search page - this page contains the search bar and a category filter. Initially 6 products are displayed. Searching or filtering updates the url bar, and persists the search.
- PDP page - this page containes the data specifically for a product, displaying the product name, tags, random in stock status, product quantity, description, and an add to cart cta.
- Cart page - this page contains who section - order summary, and cart items. Cart items have the following actions -> increase/decrease quantity, remove item. Order summary displays a summary of the order.

## Deployed on Vercel

Project is deployed on vercel with the following url -> [vercel-swag-store-umber.vercel.app](https://vercel-swag-store-umber.vercel.app/)
