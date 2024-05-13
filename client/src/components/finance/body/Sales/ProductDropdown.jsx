import { useEffect, useState } from "react";
import axios from "axios";

const ProductDropdown = ({ onSelect }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8070/product/");
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <label htmlFor="product">Select a Product:</label>
      <select className="text-dark"
        id="product"
        name="product"
        onChange={(e) => onSelect(e.target.value)}
      >
        {/* Render dropdown options */}
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductDropdown;