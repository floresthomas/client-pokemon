import React from "react";
import { connect } from "react-redux"
import { useEffect, useState } from "react";
import { getPokemons } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card"
import Paginado from "../Paginado/Paginado";
import FilterTypes from "../Filters/FilterTypes";
import SearchBar from "../SearchBar/SearchBar";
import FilterSort from "../Filters/FilterSort";
import FilterAttack from "../Filters/FilterAttack";
import FilterCreated from "../Filters/FilterCreated";
import Loading from "../Loading/Loading";
import Navbar from "../NavBar/Navbar";
import s from "./Home.module.css"

const Home = ({ pokemons, getAllPokemones, loading}) => {

    //Se ejecuta despues de cada renderizado de los pokemones
    useEffect(() => {
        getAllPokemones();
    }, [getAllPokemones]);

    const [order, setOrderName] = useState("");
    const [attack, setOrderAttack] = useState("");
    
    //Pagina actual
    const [currentPage, setCurrentPage] = useState(1);
    //Cantidad de pokemones por pagina
    const pokemonsPerPage = 12;
    //Seteo el ultimo indice, sobre la pagina actual * la cantidad de pokemones por pagina
    const lastPokemon = currentPage * pokemonsPerPage;
    //Seteo el primer indice, ultimo indice de pokemon - la cantidad de pokemones por pagina
    const firstPokemon = lastPokemon - pokemonsPerPage;
    //Esta constante es la mas importante ya que va a ser la que va a guardar los personajes que se van a mostrar por pagina
                    //Cortame el array de personajes con el indice del primer personaje de esa pagina y el indice del ultimo personaje de esa pagina
    const currentPokemon = pokemons.slice(firstPokemon, lastPokemon);
    //Cuando yo vaya apretando, todos los indices van cambiando y el slice se va a ir modificando
    
    //El paginado me ayuda a renderizar, va a setear la pagina en el numero que yo vaya apretando
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    } 

    function handleClick(e){
        e.preventDefault();
        getAllPokemones(currentPokemon)
        setCurrentPage(1);
    }

    return(
        <div className={s.imgFondo}>
            <div>
                    <Navbar/>
                    <Link className={s.create} to='/pokemons'>Create Pokemon</Link>
                <div>
                    {/* Filtrado por ataque */}
                    <FilterAttack setOrderAttack={setOrderAttack}/>
                    {/* Filtrado por nombre */}
                    <FilterSort setOrderName={setOrderName}/>
                    {/* Filtrado por tipos de pokemon */}
                    <FilterTypes setPage={setCurrentPage}/>
                    {/* Filtrado por creados en el formulario */}
                    <FilterCreated setPage={setCurrentPage}/>
                    {/* Buscar por nombre */}
                    <SearchBar setPage={setCurrentPage}/>
                    
                </div>
                <div className={s.paginado}>
                    <Paginado
                    pokemonsPerPage={pokemonsPerPage}//Le paso mis pokemones por pagina
                    pokemons={pokemons.length}//Le paso mi estado de pokemones.length por que necesito un valor numerico
                    paginado={paginado}//Como paginado le paso mi constante paginado
                    />
                </div>
                <div className={s.container}>
                {loading ? (
                    <Loading/>
                ) : (
                currentPokemon?.map((c) => 
                    c.err ? (
                        <h2 key={c.err}>{c.err}</h2>
                      ): 
                      
                      ( 
                        <Card 
                        name={c?.name} 
                        image={c?.image}
                        type={c?.type}
                        key={c?.id}
                        id={c?.id}
                        />
                      )
                ) 
                )}
                </div>
            </div>
        </div>
    )
}

//Pedido de estado a redux, lo puedo hacer tambien con useSelector((state) => state.pokemons)
export const mapStateToProps = (state) => {
    return{
        pokemons: state.pokemons,
        loading: state.loading
    }
}

//Despacho la accion que necesito
export const mapDispatchToProps = (dispatch) => {
    return{
        getAllPokemones : () => dispatch(getPokemons())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);