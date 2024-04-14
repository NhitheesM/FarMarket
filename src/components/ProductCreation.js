import React, { useState } from 'react';
import { ethers } from 'ethers';

const ProductCreation = ({ onClose, farmingSupplyChain, provider, account }) => {
  const [producer, setProducer] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const signer = provider.getSigner(account);
  
      if (!signer) {
        throw new Error('Signer not found');
      }
  
      const transaction = await farmingSupplyChain.connect(signer).createProduct(name, category, quantity, price, producer);
      await transaction.wait();
  
      const productCount = await farmingSupplyChain.getProductsCount();
  
      // Display an alert with the success message and the size of products
      alert(`Product created successfully!\nNumber of products: ${productCount}`);
  
      onClose();
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.message);
    }
  };

  return (
    <div className='product-creation-form'> {/* Add the product-creation-form class */}
      <h2>Product Creation</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)}/>
        <br />
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <br />
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />
        <label htmlFor="producer">Producer Address:</label>
        <input type="text" id="producer" value={producer} onChange={(e) => setProducer(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductCreation;