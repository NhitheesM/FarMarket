import React, { useState, useEffect } from 'react';

const ProductListing = ({ onClose,farmingSupplyChain, provider, account }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const productsArray = [];
    const count = await farmingSupplyChain.getProductsCount();
    for (let i = 0; i < count; i++) {
      const product = await farmingSupplyChain.products(i);
      productsArray.push({
        id: product.id.toString(),
        name: product.name.toString(),
        category: product.category.toString(),
        quantity: product.quantity.toString(),
        price: product.price.toString(),
        producer: product.producer,
        distributor: product.distributor,
        wholesaler: product.wholesaler,
        retailer: product.retailer,
        isAvailable: product.isAvailable,
        initialTimestamp: product.initialTimestamp.toString()
      });
    }
    console.log(productsArray.length);
    setProducts(productsArray);
  };

  useEffect(() => {
    loadProducts();
  }, [farmingSupplyChain]);

  return (
    <div className='product-listing'> {/* Add the product-listing class */}
      <h2>Product Listing</h2>
      <button onClick={loadProducts}>Load Products</button>
      <table>
        <thead>
          <tr>
            <th>Product Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <br></br>
                <p>ID: {product.id}</p>
                <p>Name: {product.name}</p>
                <p>Category: {product.category}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
                <p>Producer: {product.producer}</p>
                <p>Distributor: {product.distributor}</p>
                <p>Wholesaler: {product.wholesaler}</p>
                <p>Retailer: {product.retailer}</p>
                <p>Is Available: {product.isAvailable ? "Yes" : "No"}</p>
                <p>Initial Timestamp: {product.initialTimestamp}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductListing;