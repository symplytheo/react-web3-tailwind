import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { injected } from './wallet/connect';
import { useState } from 'react';

function App() {
  const [minting, setMinting] = useState(false);
  const { account, active, library, activate, deactivate } = useWeb3React();

  const handleConnect = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMint = async () => {
    setMinting(true);

    const myAcct = '0xaA3132DB6d461A858321a1037593a4aC84B2911A'; // address  to receive payment
    const amount = '0.01'; // amount in ETH

    const options = {
      from: account,
      to: myAcct,
      value: Web3.utils.toWei(amount, 'ether'), // convert price to wei
    };

    await library.eth.sendTransaction(options, (err, result) => {
      setMinting(false);
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  };

  const handleDisconnect = () => {
    try {
      deactivate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold underline">Hello Viabtc!</h1>
      {active && (
        <div>
          Connected as <b>{account}</b>
        </div>
      )}
      {!active ? (
        <button
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
          onClick={handleConnect}
        >
          Connect
        </button>
      ) : minting ? (
        <span className="text-center text-2xl font-bold">Minting...</span>
      ) : (
        <div className='flex justify-center items-center gap-4'>
          <button
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
          onClick={handleMint}
        >
          Mint
        </button>
        <button
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
          onClick={handleDisconnect}
        >
          Disconnect
        </button>
        </div>
      )}
    </div>
  );
}

export default App;
