# @kleffio/ui

Reusable Kleff UI package for `panel`, `www`, `docs`, and plugin frontends.

## Install

Use from any repo:

```bash
npm install git+https://github.com/kleffio/ui.git#main
```

Or add directly in `package.json`:

```json
{
  "dependencies": {
    "@kleffio/ui": "git+https://github.com/kleffio/ui.git#main"
  }
}
```

## Usage

Import package styles once in your app global stylesheet:

```css
@import "@kleffio/ui/styles.css";
```

Import components from the package root:

```tsx
import { Button, Card, NavigationMenu, buttonVariants } from "@kleffio/ui";
```

## Next.js

When consuming TypeScript source directly, add:

```ts
transpilePackages: ["@kleffio/ui"];
```
