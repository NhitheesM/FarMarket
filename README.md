# FarMarket

FarMarket is a decentralized marketplace built on Ethereum, leveraging smart contracts for secure and transparent transactions.  
This project uses **Solidity** for the backend (smart contracts) and **React.js** for the frontend, with **Hardhat** as the development framework.

---

## 🚀 Technology Stack & Tools

- **[Solidity](https://soliditylang.org/)** → Smart Contracts & Tests  
- **[Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** → Frontend & Testing  
- **[Hardhat](https://hardhat.org/)** → Ethereum Development Environment  
- **[Ethers.js](https://docs.ethers.io/v5/)** → Blockchain Interaction  
- **[React.js](https://reactjs.org/)** → Frontend Framework  

---

## ⚙️ Requirements for Initial Setup

- Install [Node.js](https://nodejs.org/en/) (LTS recommended)  
- Install [Git](https://git-scm.com/) (for cloning the repository)  

---

## 🛠️ Setting Up the Project

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/FarMarket.git
cd FarMarket
## 🛠️ Setting Up the Project

### 2️⃣ Install Dependencies
bash
npm install

### 3️⃣ Run Tests
bash
Copy code
npx hardhat test

### 4️⃣ Start Local Hardhat Node
bash
Copy code
npx hardhat node

### 5️⃣ Deploy Smart Contracts
Open a new terminal and run:

bash
Copy code
npx hardhat run ./scripts/deploy.js --network localhost

### 6️⃣ Start Frontend
bash
Copy code
npm run start
The frontend should now be running on: http://localhost:3000
