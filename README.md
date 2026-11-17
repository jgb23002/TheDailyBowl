# The Daily Bowl

A responsive restaurant ordering prototype for the university assignment **AI-Powered Redesign of Your Restaurant or Store**. It uses React, TypeScript, Vite, Tailwind CSS, React Router, and LocalStorage.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local URL Vite prints. These commands check and preview the production bundle.

```sh
npm run lint
npm run build
npm run preview
```

## Ordering flow

1. Open **Menu**, browse by category, or use search and dietary filters together.
2. Add a menu item or use **Build Your Own Bowl** to choose a base, protein, toppings, and sauce. The builder shows the updated price as you choose ingredients.
3. Open **Cart** to update quantities and review the subtotal. The cart is saved in the current browser across reloads.
4. Select **Proceed to Checkout**, then **Place Demo Order**. The prototype clears the cart and shows a receipt that survives a reload in the same tab.

Menu items, ratings, and tax and fee values are demo data. Checkout is simulated and requires no payment information or backend. The bowl builder calculates prices in the browser from ingredient prices.

## Deploy

Push the project files to a Git repository. Both hosting configurations serve React Router URLs such as `/menu/bowls` when opened or refreshed directly.

- **Netlify** — Import the repository as a new project. The included `netlify.toml` sets Node 22, runs `npm run build`, publishes `dist`, and defines the SPA rewrite. [Netlify rewrite documentation](https://docs.netlify.com/manage/routing/redirects/rewrites/)
- **Vercel** — Import the repository and select the **Vite** preset. Use Node 22 or newer in the project settings. The included `vercel.json` sets the build command, output directory, and SPA rewrite. [Vite on Vercel documentation](https://vercel.com/docs/frameworks/frontend/vite)

## Design reference and imagery

The site follows the original Figma file’s dark green and cream palette, steaming bowl mark, mobile navigation, menu category grid, and ordering screens. The wider layouts introduce a full navigation header, wider food grids, and side-by-side order summaries. [Original Figma design](https://www.figma.com/design/Dw8VTa6R1Oj6aI4kxALOvn/The-Daily-Bowl---Restaurant-Menu-Wireframe-2?node-id=0-1)

The food photographs in `public/images/` were made with the built-in image generation tool. The site serves the selected contact sheet tiles as individual images.

<details>
<summary>Image generation prompts</summary>

**Hero**

> Use case: photorealistic-natural. A single editorial restaurant photograph, wide landscape 3:2, no text. Overhead close-up of a deep dark green ceramic harvest grain bowl on a textured warm olive-stone tabletop, warm soft sunlight. Beautiful identifiable rows of paprika roasted sweet potatoes, flaky golden chickpeas, quinoa, sliced avocado, shredded purple cabbage, cucumber, leafy greens, and a creamy tahini drizzle. One hand gently sets down the bowl at upper right, linen and a few leaves at the edges. Center the appetizing bowl with breathing room for a wide web banner crop. The scene has the mood of an independent farm-to-table fast-casual restaurant, saturated natural warm brown and forest green tones, true photographic detail, realistic cookware and ingredients. No words, collage, graphics, or watermarks.

**Menu dishes**

> Use case: photorealistic-natural. One tightly controlled 3-column by 3-row contact sheet of nine separate photorealistic restaurant food photographs, edge to edge with identical square cells, exactly 3x3, no gutters, no text or labels. Each dish centered inside its own equal square, visible crockery with generous space inside crop, dark muted olive or warm cream tabletop, homestyle editorial window light, complementary warm photographic tones. Row one left to right: harvest grain bowl of roasted sweet potato, chickpeas, greens and avocado in a dark ceramic bowl; tofu rice bowl with grilled tofu cubes, broccoli and cabbage; two sliced falafel wraps full of green and purple vegetables. Row two: grilled veggie wrap with peppers and zucchini cut into halves; wood-fired margherita pizza with basil and melted mozzarella; mushroom cream penne pasta with parmesan and parsley. Row three: creamy hummus and folded pita with olive oil; crispy golden potato bites with herbed dip; bright mint lemonade in a glass with lemon and ice. Make each photo independent, premium, natural, strongly identifiable. Even lighting with tactile surfaces, no letters, no people, no logos.

**Dessert, About, and bowl builder**

> Use case: photorealistic-natural. A single square contact sheet of exactly four independent square editorial restaurant photos in a 2 by 2 grid with equal tiles and no border, divisions only by the separate photo compositions. Top left: a dark fudgy chocolate brownie on cream pottery, chocolate crumbs and soft light. Top right: two hands holding an abundant colorful salad bowl with little gem lettuce, cherry tomatoes, cucumber, chickpeas, roasted sweet potato and feta, with light herringbone counter behind it. Bottom left: wooden chopping board with freshly chopped market vegetables, whole heirloom tomatoes, cucumbers and herbs, a warm cream countertop. Bottom right: overhead custom grain bowl with avocado, pickled cabbage, crispy tofu, sweet potatoes and rice in ceramic stoneware, dark earthy olive table. Tactile, realistic artisan cafe imagery, warmly lit, with each subject centered well within its tile. No text or graphic elements.

</details>
