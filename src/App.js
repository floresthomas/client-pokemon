import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home.jsx"
import DetailPokemon from './components/DetailPokemon/DetailPokemon.jsx';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path="/detail/:id" component={DetailPokemon} />
        <Route path="/pokemons" component={CreatePokemon}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
