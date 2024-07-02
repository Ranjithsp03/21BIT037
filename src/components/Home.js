import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Static/css/TopProducts.css'
function TopProducts() {
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('');
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (company && category) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await axios.get(
            `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minprice=${minPrice}&maxprice=${maxPrice}`,
            {
              headers: {
                Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE5ODk2NDIxLCJpYXQiOjE3MTk4OTYxMjEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImY3OGE4NGQ4LWFjYjQtNGUyZC1hM2E5LTlmYmZjODAwY2JhOSIsInN1YiI6InJhbmppdGguMjFpdEBrY3QuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6ImY3OGE4NGQ4LWFjYjQtNGUyZC1hM2E5LTlmYmZjODAwY2JhOSIsImNsaWVudFNlY3JldCI6IkdQUm9wYlpiRG16S0NCRm8iLCJvd25lck5hbWUiOiJSYW5qaXRoIiwib3duZXJFbWFpbCI6InJhbmppdGguMjFpdEBrY3QuYWMuaW4iLCJyb2xsTm8iOiIyMUJJVDAzNyJ9.tgvo30hi60eOVmsenBoZ31kgyKJIRh8TAAS4JDzfv-Q"}`,
              },
            }
          );
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [company, category, top, minPrice, maxPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Company:
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Category:
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Top:
            <input type="number" value={top} onChange={(e) => setTop(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Min Price:
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Max Price:
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </label>
        </div>
        <button type="submit">Fetch Products</button>
      </form>
      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <p>Name: {product.name}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopProducts;
