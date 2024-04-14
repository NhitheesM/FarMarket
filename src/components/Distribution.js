import ProductCreation from './ProductCreation';
import ProductListing from './ProductListing';
import ProductTransfer from './ProductTransfer';
import Transactions from './Transactions';
import BoughtProducts from './BoughtProducts';
import SoldProducts from './SoldProducts';
import React from 'react';

const Distribution = ({ farmingSupplyChain, provider, account }) => {
  const [showProductCreation, setShowProductCreation] = React.useState(false);
  const [showProductListing, setShowProductListing] = React.useState(false);
  const [showProductTransfer, setShowProductTransfer] = React.useState(false);
  const [showTransactions, setShowTransactions] = React.useState(false);
  const [showSoldProducts, setShowSoldProducts] = React.useState(false);
  const [showBoughtProducts, setShowBoughtProducts] = React.useState(false);

  const handleProductCreationClick = () => {
    setShowProductCreation(true);
  };

  const handleCloseProductCreation = () => {
    setShowProductCreation(false);
  };

  const handleProductListingClick = () => {
    setShowProductListing(true);
  };

  const handleCloseProductListing = () => {
    setShowProductListing(false);
  };

  const handleProductTransferClick = () => {
    setShowProductTransfer(true);
  };

  const handleCloseProductTransfer = () => {
    setShowProductTransfer(false);
  };

  const handleTransactionsClick = () => {
    setShowTransactions(true);
  };

  const handleCloseTransactions = () => {
    setShowTransactions(false);
  };

  const handleBoughtProductsClick = () => {
    setShowBoughtProducts(true);
  };

  const handleCloseBoughtProducts = () => {
    setShowBoughtProducts(false);
  };

  const handleSoldProductsClick = () => {
    setShowSoldProducts(true);
  };

  const handleCloseSoldProducts = () => {
    setShowSoldProducts(false);
  };

  return (
    <div>
      <h2 className='disth2'>Product Distribution</h2>
      <button className='distButton' onClick={handleProductCreationClick}>Product Creation</button>
      <button className='distButton' onClick={handleProductListingClick}>Product Listing</button>
      <button className='distButton' onClick={handleProductTransferClick}>Product Transfer</button>
      <button className='distButton' onClick={handleTransactionsClick}>Transactions</button>
      <button className='distButton' onClick={handleBoughtProductsClick}>Bought Products</button>
      <button className='distButton' onClick={handleSoldProductsClick}>Sold Products</button>
      {showProductCreation && <ProductCreation onClose={handleCloseProductCreation} farmingSupplyChain={farmingSupplyChain} provider={provider} account={account}/>}
      {showProductListing && <ProductListing onClose={handleCloseProductListing} farmingSupplyChain={farmingSupplyChain} provider={provider} account={account}/>}
      {showProductTransfer && <ProductTransfer onClose={handleCloseProductTransfer} farmingSupplyChain={farmingSupplyChain} provider={provider} account={account}/>}
      {showTransactions && <Transactions onClose={handleCloseTransactions} farmingSupplyChain={farmingSupplyChain} provider={provider} account={account}/>}
      {showBoughtProducts && <BoughtProducts onClose={handleCloseBoughtProducts} farmingSupplyChain={farmingSupplyChain} provider={provider} account={account}/>}
      {showSoldProducts && <SoldProducts onClose={handleCloseSoldProducts} farmingSupplyChain={farmingSupplyChain} provider={provider} account={account}/>}
    </div>
  );
};

export default Distribution;