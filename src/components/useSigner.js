import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const useSigner = () => {
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setSigner(provider.getSigner());
        } else {
          setSigner(null);
        }
      });

      provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setSigner(provider.getSigner());
        }
      });
    }
  }, []);

  return signer;
};

export default useSigner;