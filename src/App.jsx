import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonGroupDemo from './ButtonGroupDemo';
import ChartDemo from './ChartDemo';
import BtcChart from './BtcChart';

function App() {
  return (
    <>
      <ButtonGroupDemo />
      <ChartDemo />
      <BtcChart />
    </>
  );
}

export default App
