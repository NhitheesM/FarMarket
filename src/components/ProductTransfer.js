import React, { useState } from 'react';
import { ethers } from 'ethers';

const ProductTransfer = ({ onClose, farmingSupplyChain, provider, account }) => {
  const [id, setId] = useState('');
  const [recipient, setRecipient] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const signer = provider.getSigner(account);
  
      if (!signer) {
        throw new Error('Signer not found');
      }
  
      const transaction = await farmingSupplyChain.connect(signer).transferProduct(parseInt(id), recipientAddress, recipient);
      await transaction.wait();
  
      // Display an alert with the success message and the size of products
      alert(`Product Transfered successfully!`);
  
      onClose();
    } catch (err) {
      console.error('Error transferring product:', err);
      setError(err.message);
    }
  };

  return (
    <div className='product-transfer-form'> {/* Add the product-transfer-form class */}
      <h2>Product Transfer</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Product ID:</label>
        <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
        <br />
        <label htmlFor="recipient">Recipient Type:</label>
        <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)}/>
        <br />
        <label htmlFor="recipientAddress">Recipient Address:</label>
        <input type="text" id="recipientAddress" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} />
        <br />
        
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default ProductTransfer;