function ProductCard({ title, price, category = 'General', inStock, onAddToCart, children }) {
  return (
    <article className={`product-card ${!inStock ? 'out-of-stock' : ''}`}>
      <div className="card-top">
        <span className="category">{category}</span>
        {children}
      </div>
      <h2>{title}</h2>
      <p className="price">
        ₱{price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      {inStock ? (
        <p className="stock available">In Stock</p>
      ) : (
        <p className="stock unavailable">Out of Stock</p>
      )}
      <button type="button" disabled={!inStock} onClick={() => onAddToCart(title)}>
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
