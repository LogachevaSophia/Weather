import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import apiStore from "./Store/ApiStore.tsx"
import CurrentWeather from './components/CurrentWeater/CurrentWeather.tsx';
import CurrentThree from './components/CurrentWeatherThreeJs/CurrentWeatherThreeJs.tsx';
import CurrentWeatherNew from './components/CurrentWeatherNew/CurrentWeatherNew.tsx';

function App() {
  // useEffect(()=>{
  //   apiStore.getCurrentWeather()
  // },[])
  return (
    <div className="App">
      <CurrentWeatherNew/>
      {/* <CurrentWeather/> */}
      <CurrentThree/>
    </div>
  );
}

export default App;
