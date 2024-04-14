// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FarmingSupplyChain {

    struct Product {
        uint id;
        string name;
        string category;
        uint quantity;
        uint price;
        address producer;
        address distributor;
        address wholesaler;
        address retailer;
        bool isAvailable;
        uint initialTimestamp;
    }

    struct Transaction {
        uint productId;
        uint timestamp;
        address recipientAddress;
    }

    uint public productsCount=0;

    Transaction[] public transactions;
    mapping(uint => Product) public products;
    mapping(address => Transaction[]) public boughtProducts;
    mapping(address => Transaction[]) public soldProducts;

    event ProductCreated(
        uint id,
        string name,
        string category,
        uint quantity,
        uint price,
        address producer,
        uint initialTimestamp
    );

    event ProductTransferred(
        uint id,
        address recipientAddress,
        string recipient
    );

    function createProduct(
        string memory _name,
        string memory _category,
        uint _quantity,
        uint _price,
        address _producer
    ) public {
        Product memory newProduct;
        newProduct.id = productsCount;
        newProduct.name = _name;
        newProduct.category = _category;
        newProduct.quantity = _quantity;
        newProduct.price = _price;
        newProduct.producer = _producer;
        newProduct.distributor = address(0);
        newProduct.wholesaler = address(0);
        newProduct.retailer = address(0);
        newProduct.isAvailable = true;
        newProduct.initialTimestamp = block.timestamp;
        products[newProduct.id]=newProduct;
        productsCount++;

        emit ProductCreated(
            newProduct.id,
            newProduct.name,
            newProduct.category,
            newProduct.quantity,
            newProduct.price,
            newProduct.producer,
            newProduct.initialTimestamp
        );
    }

    function transferProduct(uint _id, address _recipientAddress, string memory _recipient) public{
        require(_id < productsCount, "Product ID does not exist");
        Product storage product = products[_id];

        // The product's quantity must be greater than zero
        require(product.quantity > 0, "Product quantity is zero");

        // Record the transaction
        Transaction memory newTransaction;
        newTransaction.productId = _id;
        newTransaction.timestamp = block.timestamp;
        newTransaction.recipientAddress = _recipientAddress;
        transactions.push(newTransaction);

        // Store details
        if (keccak256(bytes(_recipient)) == keccak256("distributor")) {
            product.distributor = _recipientAddress;
            boughtProducts[_recipientAddress].push(newTransaction);
            soldProducts[product.producer].push(newTransaction);
        } else if (keccak256(bytes(_recipient)) == keccak256("wholesaler")) {
            product.wholesaler = _recipientAddress;
            boughtProducts[_recipientAddress].push(newTransaction);
            soldProducts[product.distributor].push(newTransaction);
        } else if (keccak256(bytes(_recipient)) == keccak256("retailer")) {
            product.retailer = _recipientAddress;
            boughtProducts[_recipientAddress].push(newTransaction);
            soldProducts[product.wholesaler].push(newTransaction);
        } else {
            revert("Invalid recipient");
        }

        // Emit an event for the transfer
        emit ProductTransferred(_id, _recipientAddress, _recipient);
    }

    
    function getProduct(uint _id) public view returns (
        string memory name,
        string memory category,
        uint quantity,
        uint price,
        address producer,
        address distributor,
        address wholesaler,
        address retailer,
        bool isAvailable,
        uint initialTimestamp
    ) {
        Product memory product = products[_id];

        return (
            product.name,
            product.category,
            product.quantity,
            product.price,
            product.producer,
            product.distributor,
            product.wholesaler,
            product.retailer,
            product.isAvailable,
            product.initialTimestamp
        );
    }

    function getTransactionsByProductId(uint _productId) public view returns (Transaction[] memory) {
        uint count = 0;
        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].productId == _productId) {
                count++;
            }
        }
        Transaction[] memory productTransactions = new Transaction[](count);
        count = 0;
        for (uint i = 0; i < transactions.length; i++) {
            if (transactions[i].productId == _productId) {
                productTransactions[count] = transactions[i];
                count++;
            }
        }
        return productTransactions;
    }

    function getBoughtProducts(address _address) public view returns (Transaction[] memory) {
        return boughtProducts[_address];
    }

    function getSoldProducts(address _address) public view returns (Transaction[] memory) {
        return soldProducts[_address];
    }

    function getProductsBoughtByAddress(address _address) public view returns (Product[] memory) {
        Transaction[] memory buyerTransactions = getBoughtProducts(_address);
        Product[] memory buyerProducts = new Product[](buyerTransactions.length);
        for (uint256 i = 0; i < buyerTransactions.length; i++) {
            buyerProducts[i] = products[buyerTransactions[i].productId];
        }
        return buyerProducts;
    }

    function getProductsSoldToAddress(address _address) public view returns (Product[] memory) {
        Transaction[] memory sellerTransactions = getSoldProducts(_address);
        Product[] memory sellerProducts = new Product[](sellerTransactions.length);
        for (uint256 i = 0; i < sellerTransactions.length; i++) {
            sellerProducts[i] = products[sellerTransactions[i].productId];
        }
        return sellerProducts;
    }

    function getProductsCount() public view returns (uint) {
        return productsCount;
    }
}
