import React, { useState, useEffect } from "react";
import style from './Keplr.module.css'
const Keplr = ()=> {

  const [detect,setDetect] = useState(false);
  const [error,setError] = useState(false);
  const [data,setData] = useState({address:null, algo:null});
  const [input,setInput] = useState('cosmoshub-4');

  useEffect(() => {
      if (window.keplr) setDetect(true);
  },[]);

  const inputChangeHandler = (e) =>{
    setInput(e.target.value)
    if(error)setError(false);
  };

  const connect = (chainId) => async () => {
    if(chainId){
      try{
        await window.keplr.enable(chainId);
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        setData({address:accounts[0].address, algo: accounts[0].algo})
      }catch{
        setError(true)
      }
      
    }
  };
  if(!detect) return <p className={style.none}>Расширение Keplr не установлено</p>
  return(
    <>
      {error && <p className={style.none}>Невалидный chainId</p>}
      <div>
      {!data.address 
        ? <div className={style.wrapper}>
            <input value={input} onChange={inputChangeHandler} className={error ? style.error : ''}/>
            <button disabled={!input} onClick={connect(input)}>Подключиться</button>
          </div>
        : <div className={style.wrapper}>
            <p>address: {data.address}</p>
            <p>algo: {data.algo}</p>
          </div>
      }
      </div>
      
    </>
  );
};

export default Keplr;