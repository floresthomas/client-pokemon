import {GET_POKEID, GET_POKEMONS, GET_POKENAME, GET_TYPES, ORDER_ATTACK, ORDER_NAME, FILTER_CREATED, POKEMON_TYPE, POST_POKEMON, CLEAR_PAGE, LOADING} from "../actions/const"

const initialState = {
    pokemons: [],
    allPokemons: [],
    detail: [],
    types: [],
    loading: true
}

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_POKEMONS:   
        return{
            ...state,
            loading: false,
            pokemons: action.payload,
            allPokemons: action.payload
        }
        case GET_POKEID:
        return{
            ...state,
            loading: false,
            detail: action.payload
        }     

        case GET_POKENAME:
            if(action.payload.err){
                return {
                    ...state,
                pokemons: [action.payload]
                }
            }
        return{
            ...state,
            pokemons: action.payload
        }
        case ORDER_NAME:
        const orderName =
        action.payload === "asc"
        ? state.pokemons.sort((a, b) =>(a.name.localeCompare(b.name)))                 
        : state.pokemons.sort((a, b) => (b.name.localeCompare(a.name)))
        return{
            ...state,
            pokemons: orderName
        }
        case ORDER_ATTACK:
            const orderAttack =
            action.payload === "asc"
            ? state.pokemons.sort((a, b) => (a.attack - b.attack))
            : state.pokemons.sort((a, b) => (b.attack - a.attack));
        return{
            ...state,
            pokemons: orderAttack
        }
        case FILTER_CREATED:
        const createdFilter =
            action.payload === "created"
            ? state.allPokemons.filter((element) => element.createdInDb)
            : state.allPokemons.filter((element) => !element.createdInDb);
        return {
            ...state,
            pokemons: action.payload === "all" ? state.allPokemons : createdFilter,
        };  
        case GET_TYPES:
        return{
            ...state,
            types: action.payload
        }
        case POKEMON_TYPE:
            const filterType = 
            action.payload === "all"
            ? state.allPokemons
            : state.allPokemons.filter((element) => 
                element.type?.includes(action.payload)
            )
        return{
            ...state,
            pokemons: filterType
        }
        case POST_POKEMON:
        return{
            ...state,
            pokemons: [...state.pokemons, action.payload]
        }
        case CLEAR_PAGE:
        return{
            ...state,
            detail: []
        }
        case LOADING:
        return{
            ...state,
            loading: action.payload
        }
        default:
            return state
    }
}