import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import ProductCard from './components/ProductCard.jsx';
import products from './data/products.js';

function App() {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState('');

  function handleAddToCart(title) {
    setCartCount((previousCount) => previousCount + 1);
    setLastAdded(title);
  }

  function clearFilters() {
    setSearchText('');
    setCategory('All');
    setSortOrder('default');
  }

  // Derive the visible products without changing the original array.
  const filteredProducts = [...products].filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchText.trim().toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sortOrder === 'low-to-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <span className="eyebrow">CAMPUS ESSENTIALS</span>
          <h1>CvSU Mini Store</h1>
          <p>Find everyday essentials for school and beyond.</p>
        </div>
      </header>
      <main className="container">
        <section className="cart-message" aria-live="polite" aria-atomic="true">
          <strong>Shopping Cart</strong>
          <p>{cartCount === 0 ? 'Your cart is empty.' :
            `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}</p>
        </section>
        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClearFilters={clearFilters}
        />
        <div className="section-heading">
          <h2>Product Catalog</h2>
          <span>{products.length} products</span>
        </div>
        <section className="product-grid" aria-label="Products">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {product.id === 1 && <span className="badge new">New</span>}
              {product.id === 4 && <span className="badge sale">Sale</span>}
            </ProductCard>
          ))}
        </section>
      </main>
      <footer>DCIT26 · Laboratory Exercise 3</footer>
    </>
  );
}

export default App;
