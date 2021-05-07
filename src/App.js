import logo from './logo.svg';
import './App.css';
import { Snake } from './components/Snake';
import { Instructions } from './components/Instructions';
function App() {
  return (
    <div className="App">
        <Snake />
        <Instructions />
    </div>
  );
}

export default App;
