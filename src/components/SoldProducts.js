import React, { useState } from 'react';

const SoldProducts = ({ onClose, farmingSupplyChain, provider, account }) => {
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signer = provider.getSigner(account);

      if (!signer) {
        throw new Error('Signer not found');
      }

      const products = await farmingSupplyChain.connect(signer).getProductsSoldToAddress(address);
      console.log(products.length);

      const productsArray = [];
      for (let i = 0; i < products.length; i++) {
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
      setProducts(productsArray);
    } catch (err) {
      console.error('Error getting transactions:', err);
      setError(err.message);
    }
  };

  return (
    <div className="sold-products">
      <h2>Sold Products</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Seller Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <br />
        <button type="submit">Get Products</button>
      </form>
      <br></br>
      <h3>Number of Products : {products.length}</h3>
      <br></br>
      <br></br>
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
      
      {error && <div>Error: {error}</div>}
      
      <button type="button" onClick={onClose}>Close</button>
    </div>
  );
};

export default SoldProducts;