import { useState, useEffect } from 'react';
import './ProductSlider.scss';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=5');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="product-slider">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-slider">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="product-slider">
      <div className="product-slider__header">
        <h1 className="product-slider__title">Featured Products</h1>
        <p className="product-slider__description">
          Discover our carefully curated selection of premium products designed to enhance your lifestyle. 
          Each item is handpicked for its quality, style, and value.
        </p>
      </div>

      <div className="product-slider__content">
        <div className="product-slider__list">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`product-item ${selectedProduct?.id === product.id ? 'active' : ''}`}
              onClick={() => handleProductSelect(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProductSelect(product);
                }
              }}
              aria-label={`Select ${product.title}`}
            >
              <div className="product-item__image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-item__image"
                  loading="lazy"
                />
              </div>
              <div className="product-item__content">
                <h3 className="product-item__title">{product.title}</h3>
                <button
                  className={`product-item__chevron ${selectedProduct?.id === product.id ? 'active' : ''}`}
                  aria-label={`View details for ${product.title}`}
                >
                  <span className="material-icons">
                    {selectedProduct?.id === product.id ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="product-slider__details">
          {selectedProduct && (
            <div className="product-details">
              <div className="product-details__price">
                ${selectedProduct.price}
              </div>
              <div className="product-details__description">
                {selectedProduct.description}
              </div>
              <div className="product-details__rating">
                <div className="rating-stars">
                  {renderStars(selectedProduct.rating.rate)}
                </div>
                <span className="rating-count">({selectedProduct.rating.count})</span>
              </div>
              <button className="product-details__add-to-cart">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
