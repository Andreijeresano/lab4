# CvSU Mini Store

DCIT26 — Laboratory Exercise 4: React useState and useEffect (Live Search and Filter)

This is an extension of Laboratory Exercise 3. The original eight products, reusable ProductCard, stock labels, badges, and cart are retained. Lab 4 adds controlled search and filter inputs, price sorting, a 300 ms search debounce, a result count, and a browser tab title effect.

## Run the project

1. Install Node.js 22 LTS or a newer supported LTS version and Git if needed.
2. Extract the ZIP and open the `product-catalog` folder in VS Code.
3. Open Terminal > New Terminal. Confirm the folder contains `package.json`.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the Local URL shown in the terminal (usually http://localhost:5173/). Stop the server with Ctrl+C. Run `npm run build` to create a production build.

## Project structure

```text
product-catalog/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   └── SearchBar.jsx
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Guide questions — Laboratory Exercise 4

**1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?**

`searchText` changes immediately so the input always shows what the user types. `debouncedSearch` changes only after a 300 ms pause, so filtering does not need to run with each new keyword while the user is typing. The component can still render for other state changes.

**2. What would happen if the debounce effect did not return a cleanup function?**

Old timers would keep running even when the user types another character. They could apply intermediate search values and cause unnecessary updates. The cleanup cancels the previous timer when the keyword changes or the component unmounts.

**3. What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?**

The dependency array tells React which values should trigger an effect again. An empty array runs the effect after mounting, with an additional setup/cleanup check in development Strict Mode. Without an array, the effect runs after every committed render.

**4. Why should we avoid sorting the original products array directly?**

JavaScript's `.sort()` changes the array it is called on. Sorting the original array would change the default product order and could affect other components that use the same data. Sorting a copy keeps the original list unchanged.

**5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**

It is better to calculate it during rendering because it already depends on the products, debounced keyword, category, and sort order. Storing the same derived information in another state could make the displayed products inconsistent with the filters.

## Behavior checklist (test in your browser before submission)

| Action | Expected result |
|---|---|
| Initial page load | Showing 8 of 8 products; Your cart is empty. |
| Type `mouse` or `MOUSE` | After 300 ms, only Wireless Mouse appears. |
| Type rapidly | The search result stays on the previous keyword until a 300 ms pause. |
| Select Books | JavaScript Handbook and React Essentials appear. |
| Enter `react` with Books selected | Only React Essentials appears. |
| Enter `mouse` with Books selected | No products found. |
| Clear Filters, then Price: Low to High | Notebook Set first; Mechanical Keyboard last. |
| Price: High to Low | Mechanical Keyboard first; Notebook Set last. |
| Search `xyz` | Friendly empty-state message; Showing 0 of 8 products. |
| Click Clear Filters | All controls reset immediately; all eight products return in their original order. |
| Change the result count | Browser title becomes CvSU Mini Store (N results). |
| Add Wireless Mouse, then Water Bottle | Cart count becomes 2; last added is Water Bottle. |
| Change or clear filters after adding items | Cart count and last added item remain unchanged. |
| Try USB-C Hub or Laptop Sleeve | Buttons are disabled, and the cart count does not change. |
| Resize to a narrow mobile screen | Controls and cards reflow without horizontal scrolling. |

## Git and GitHub submission

The supplied ZIP includes the local Git history. `main` preserves the Lab 3 version and `lab4-live-search` contains the Lab 4 extension. The latter branch is already checked out. The PDF wraps the branch name across lines; `lab4-live-search` is the valid hyphenated Git name.

1. Review the source and commit history. The generated commits are not your own work; follow your instructor's requirements and make your own changes and commits where required.

   ```bash
   git branch
   git log --oneline main..lab4-live-search
   git config user.name "Your Name"
   git config user.email "your-github-email@example.com"
   ```

2. If you already have the GitHub repository from Lab 3, use that same URL. Otherwise, create an empty repository named `product-catalog` on GitHub. Do not initialize it with a README or license.
3. Check the remote:

   ```bash
   git remote -v
   ```

   If no remote is listed, connect your repository (replace YOUR-USERNAME):

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/product-catalog.git
   ```

4. Push both branches:

   ```bash
   git push -u origin main
   git push -u origin lab4-live-search
   ```

   If you have made different commits in your own existing Lab 3 repo, do not force-push over them. Instead create the Lab 4 branch in your own repo, copy the changed files (`src/App.jsx`, `src/App.css`, `src/components/SearchBar.jsx`, and this README), make your own commits, and push both branches from there.

5. On GitHub, select the `lab4-live-search` branch and verify the files and history. Submit the actual repository URL to your instructor. Both branches must be visible on GitHub.

The Lab 3 guide questions remain available on the `main` branch (`git show main:README.md`).
