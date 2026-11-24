# CvSU Mini Store

DCIT26 — Laboratory Exercise 3: React Props and Component Communication

A mini product catalog built with React, Vite and plain CSS. It uses the eight sample products in Table 1 of the laboratory handout, including two out-of-stock products. No database, backend or paid service is needed.

## Run the project

1. Install Node.js 22 (LTS or a newer supported LTS version) from https://nodejs.org/ if needed.
2. Extract the ZIP and open the `product-catalog` folder in VS Code.
3. Open Terminal > New Terminal. Make sure the current folder contains `package.json`.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the Local URL printed in the terminal (usually http://localhost:5173/).
6. To stop the development server, press Ctrl+C. To make a production build, run `npm run build`.

## Project structure

```text
product-catalog/
├── src/
│   ├── components/
│   │   └── ProductCard.jsx
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

## Guide questions

**1. What is the difference between props and state?**
Props are values passed from a parent component to a child component. State is data managed by a component that can change over time and cause the component to render again.

**2. Why can a child component not modify the props it receives?**
Props are read-only because the parent owns the data. Changing props directly would make the flow of data unpredictable, so the child should ask the parent to update the data instead.

**3. How does the onAddToCart callback allow data to flow from child to parent even though props only flow downward?**
App passes its handleAddToCart function to ProductCard as a prop. When the user clicks Add to Cart, ProductCard calls that function with its product title, and App updates its cart state.

**4. Why is the key prop required when rendering a list with .map()? What could happen if it is missing or duplicated?**
A unique key helps React identify each item when a list changes. Missing or duplicate keys can cause warnings and incorrect reuse of components or their state.

**5. What does the children prop allow you to do that a normal prop does not?**
The children prop lets a parent place nested JSX between the opening and closing tags of a component. In this project it lets App insert New and Sale labels without creating a separate prop for each label.

## Verify the behavior

- On first load, the cart displays “Your cart is empty.”
- Eight product cards appear; Wireless Mouse has a New badge and JavaScript Handbook has a Sale badge.
- Click Wireless Mouse twice, then Water Bottle once. The message should display “Items added to cart: 3 (Last added: Water Bottle)”.
- USB-C Hub and Laptop Sleeve appear faded, show Out of Stock and have disabled buttons.
- Prices use the peso sign, thousands separator and two decimal places.
- Resize the browser to check that the cards rearrange into fewer columns on smaller screens.
- Refresh the page to reset the cart; persistence is not part of this exercise.

## Git and GitHub submission

The ZIP includes a local Git repository with meaningful generated commits on `main`. Review and understand the code and make your own changes before submission. The included commits use a generator identity, not your personal account. Follow your instructor's academic integrity and Git authorship requirements.

1. Install Git from https://git-scm.com/ if needed.
2. In the project terminal, inspect the included history using `git log --oneline`.
3. Configure your own identity for future commits:

   ```bash
   git config user.name "Your Name"
   git config user.email "your-github-email@example.com"
   ```

4. Make any personal improvements or corrections, then commit them with `git add .` and `git commit -m "Describe your changes"`.
5. Sign in to GitHub, create a new empty repository named `product-catalog`, and do not initialize it with a README, license or .gitignore.
6. Connect and push the local project (replace YOUR-USERNAME):

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/product-catalog.git
   git push -u origin main
   ```

7. Open your repository on GitHub and check that your files and commit history are visible. Submit its actual URL to your instructor.

If the instructor requires you to make all four commits yourself, rebuild the project in a fresh repository using the same stages: setup, product data and component, callback and cart message, and styling. Do not represent generated commits as your own.
