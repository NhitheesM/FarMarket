import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Section from './components/Section';
import Display from './components/Display';
import Distribution from './components/Distribution';

// ABIs
import Ecommerce from './abis/Ecommerce.json';
import FarmingSupplyChain from './abis/FarmingSupplyChain.json';

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [ecommerce, setEcommerce] = useState(null);
  const [farmingSupplyChain, setFarmingSupplyChain] = useState(null);

  const [account, setAccount] = useState(null);

  const [equipments, setEquipments] = useState(null);
  const [seeds, setSeeds] = useState(null);
  const [fertilizers, setFertilizers] = useState(null);

  const [item, setItem] = useState({});
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [openSection, setOpenSection] = useState('Home');

  const togglePop = (item) => {
    setItem(item);
    setToggle(!toggle);
  };

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      const network = await provider.getNetwork();

      const ecommerce = new ethers.Contract(config[network.chainId].ecommerce.address, Ecommerce, provider);
      setEcommerce(ecommerce);

      const items = [];

      for (let i = 0; i < 9; i++) {
        const item = await ecommerce.items(i + 1);
        items.push(item);
      }

      const equipments = items.filter((item) => item.category === 'equipments');
      const seeds = items.filter((item) => item.category === 'seeds');
      const fertilizers = items.filter((item) => item.category === 'fertilizers');

      setEquipments(equipments);
      setSeeds(seeds);
      setFertilizers(fertilizers);

      const farmingSupplyChain = new ethers.Contract(config[network.chainId].farmingSupplyChain.address, FarmingSupplyChain, provider);
      setFarmingSupplyChain(farmingSupplyChain);

      const products = [];

      for (let i = 0; i < 10; i++) {
        const product = await farmingSupplyChain.products(i + 1);
        products.push(product);
      }
      console.log(products.length);

    } catch (error) {
      console.error("Error loading blockchain data:", error);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} openSection={openSection} setOpenSection={setOpenSection} />

      {openSection === 'Home' && (
        <>
          <h2>FarMarket Best Sellers</h2>

          {equipments && seeds && fertilizers && (
            <>
              <Section title={"Seeds & Plants"} items={seeds} togglePop={togglePop} />
              <Section title={"Farm Equipments"} items={equipments} togglePop={togglePop} />
              <Section title={"Fertilizers & Pesticides"} items={fertilizers} togglePop={togglePop} />
            </>
          )}
        </>
      )}

      {openSection === 'Distribution' && <Distribution farmingSupplyChain={farmingSupplyChain} provider={provider} account={account} />} {/* Render Distribution component when Product Description is clicked */}

      {toggle && (
        <Display item={item} provider={provider} account={account} ecommerce={ecommerce} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;
