import React, { useState } from 'react';

const Transaction = ({ onClose, farmingSupplyChain, provider, account }) => {
  const [productId, setProductId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signer = provider.getSigner(account);

      if (!signer) {
        throw new Error('Signer not found');
      }

      const transactions = await farmingSupplyChain.connect(signer).getTransactionsByProductId(productId);
      console.log(transactions.length);

      const transactionsArray = [];
      for (let i = 0; i < transactions.length; i++) {
        const trans = transactions[i];
        transactionsArray.push({
            productId: trans.productId.toString(),
            timestamp: trans.timestamp.toString(),
            recipientAddress: trans.recipientAddress.toString()
        });
      }
      setTransactions(transactionsArray);
    } catch (err) {
      console.error('Error getting transactions:', err);
      setError(err.message);
    }
  };

  return (
    <div className='product-transactions'> {/* Add the product-transactions class */}
      <h2>Product Transactions</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="productId">Product ID:</label>
        <input type="text" id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <br />
        <button type="submit">Get Transactions</button>
      </form>
     <table>
        <thead>
          <tr>
            <th>Product ID</th><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <th>Timestamp</th><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <th>Recipient Address</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.productId}</td><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <td>{transaction.timestamp.toString()}</td><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <td>{transaction.recipientAddress.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={onClose}>Close</button>
    </div>
  );
};

export default Transaction;