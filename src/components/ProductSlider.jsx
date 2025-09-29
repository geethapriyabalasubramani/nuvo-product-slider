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
      <div className="slider">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="slider">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="slider">
      <div className="header">
        <h1 className="heading">Featured Products</h1>
        <p className="blurb">
          Discover our carefully curated selection of premium products designed to enhance your lifestyle. 
          Each item is handpicked for its quality, style, and value.
        </p>
      </div>

      <div className="content">
        <div className="list">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`card ${selectedProduct?.id === product.id ? 'active' : ''}`}
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
              <div className="thumb">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img"
                  loading="lazy"
                />
              </div>
              <div className="row">
                <h3 className="name">{product.title}</h3>
                <button
                  className={`chevron ${selectedProduct?.id === product.id ? 'active' : ''}`}
                  aria-label={`View details for ${product.title}`}
                >
                  <span className="material-icons">
                    {selectedProduct?.id === product.id ? 'chevron_right' : 'chevron_left'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="details">
          {selectedProduct && (
            <div className="panel">
              <div className="price">
                ${selectedProduct.price}
              </div>
              <div className="desc">
                {selectedProduct.description}
              </div>
              <div className="rating">
                <div className="stars">
                  {renderStars(selectedProduct.rating.rate)}
                </div>
                <span className="count">({selectedProduct.rating.count})</span>
              </div>
              <button className="cta">
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
