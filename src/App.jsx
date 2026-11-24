import './App.css';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import ProductCard from './components/ProductCard.jsx';
import products from './data/products.js';

function App() {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
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
    setDebouncedSearch('');
    setCategory('All');
    setSortOrder('default');
  }

  // Wait until the user pauses typing before applying the search.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Derive the visible products without changing the original array.
  const filteredProducts = [...products].filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sortOrder === 'low-to-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

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
          <span aria-live="polite">Showing {filteredProducts.length} of {products.length} products</span>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="empty-state" role="status">
            <h3>No products found.</h3>
            <p>Try a different keyword or category.</p>
          </div>
        ) : (
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
        )}
      </main>
      <footer>DCIT26 · Laboratory Exercise 4</footer>
    </>
  );
}

export default App;
