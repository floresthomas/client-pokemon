import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKEID,
  GET_POKENAME,
  GET_TYPES,
  POST_POKEMON,
  POKEMON_TYPE,
  ORDER_NAME,
  ORDER_ATTACK,
  FILTER_CREATED,
  CLEAR_PAGE,
  LOADING,
} from "./const";

//Utilizamos redux thunk ya que este nos permite hacer acciones asíncronicas
//Nos retrasa el dispatch de una accion hasta que nos llegue la data es decir, hasta que se cumpla la accion asincronica

//Obtener todos los pokemons
export const getPokemons = () => {
  return async function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.get(
      "https://api-pokemon-production-405e.up.railway.app/pokemons"
    );
    return dispatch({
      type: GET_POKEMONS,
      payload: response.data.data,
    });
  };
};
// //Obtener pokemons por su id
export const getPokemonId = (id) => {
  return async (dispatch) => {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.get(
      `https://api-pokemon-production-405e.up.railway.app/pokemons/${id}`
    );
    return dispatch({
      type: GET_POKEID,
      payload: response.data.data,
    });
  };
};
//Obtener pokemons por su nombre
export const getPokemonName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://api-pokemon-production-405e.up.railway.app/pokemons?name=${name}`
      );
      return dispatch({
        type: GET_POKENAME,
        payload: response.data.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_POKENAME,
        payload: { err: err.response.data.msg },
      });
    }
  };
};

//Obtener todos los tipos
export const getTypes = () => {
  return async function (dispatch) {
    const response = await axios.get(
      "https://api-pokemon-production-405e.up.railway.app/types"
    );
    dispatch({
      type: GET_TYPES,
      payload: response.data,
    });
  };
};

//Crear un pokemon
export const createPokemon = (payload) => {
  return async (dispatch) => {
    let res = await axios.post(
      "https://api-pokemon-production-405e.up.railway.app/pokemons",
      payload
    );
    dispatch({ type: POST_POKEMON, payload: res.data.msg });
  };
};

//Filtrar por tipos de pokemones
export const filterTypes = (payload) => {
  return {
    type: POKEMON_TYPE,
    payload,
  };
};
//Ordenar por nombre
export const orderByName = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};
//Ordenar por ataque
export const orderAttack = (payload) => {
  return {
    type: ORDER_ATTACK,
    payload,
  };
};
//Filtrar por creados y pokemons de la api
export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const clearPage = () => {
  return {
    type: CLEAR_PAGE,
  };
};
