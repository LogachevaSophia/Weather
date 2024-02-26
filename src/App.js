
import './App.css';

import CurrentThree from './components/CurrentWeatherThreeJs/CurrentWeatherThreeNew.tsx';

import { Routes, Route} from 'react-router-dom';
import CurrentWeather from './components/CurrentWeater/CurrentWeatherNew.tsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/cube" element={<CurrentThree />} />
      </Routes>
    </div>
  );
}

export default App;
