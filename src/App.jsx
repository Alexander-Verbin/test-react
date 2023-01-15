import React from 'react';
import style from './App.module.css';
import Keplr from './components/Keplr/Keplr';

const App = (props) => {
  return (
    <div className={style.App}>
      <Keplr/>
    </div>
  );
}

export default App;
