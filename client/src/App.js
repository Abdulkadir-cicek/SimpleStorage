import logo from './logo.svg';
   
import Web3 from 'web3'

import React, {UseState} from "react"

import {simpleStorageAbi} from './abis'

import './App.css';

function App() {
var web3 = new Web3(Web3.providers.HttpProvider("http://localhost:7545")) // web 3 ü ganachedeki
  const contractAddr = '0xb7eDAEa546D156cCa2BfC655cE7D9b25fb71abfa'        // local hostumuza bağladık
  const simpleContract = new Web3.eth.Contract(simpleStorageAbi, contractAddr);
  const [number, setNumber] = useState(0)
  const [getNumber, setGetNumber] = useState ('0x00')

  const handleGet = async (e) => { // buton kodladık 
    e.preventDefault(); // blockchainden veri yazma
    const result = await simpleContract.methods.get().call(); // methdolardan get'i çağırır
    setGetNumber(result);
    console.log(result);
  } 
                                  // e = event(olay)
  const handleSet = async (e) => { // Blockchaine veri yazma
    e.preventDefault();
    const accounts = await window.etherum.enable();
    const account = accounts[0];
    const gas = await simpleContract.methods.set(number).estimateGas(); //gazı tahmin etmek için estimateGas fonks. çağırdık
    const result = await simpleContract.methods.set(number).send({
      from: account,
      gas
    }
    )
    console.log(result);
  }
  return (
    <div className="App">
      <header className="App-header">
       <form onSubmit={handleSet}>
        <label>
          Set Number:
          <input type = 'text' name = "name" value = {number} onChange={ e => setNumber(e.target.value)} />
                </label>     
                <input type = 'submit' value = 'Set Number' />
                </form>
                <br/>
                <button onClick={handleGet} type='button'>  
                Get Number
                </button>
                {getNumber}          
      </header>
    </div>
  );
}

export default App;
