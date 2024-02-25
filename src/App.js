import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import apiStore from "./Store/ApiStore.tsx"
import CurrentWeather from './components/CurrentWeater/CurrentWeather.tsx';
import CurrentThree from './components/CurrentWeatherThreeJs/CurrentWeatherThreeJs.tsx';

function App() {
  // useEffect(()=>{
  //   apiStore.getCurrentWeather()
  // },[])
  return (
    <div className="App">
      <CurrentWeather/>
      <CurrentThree/>
    </div>
  );
}

export default App;
