import React from 'react'
import s from "./Paginado.module.css"

 const Paginado = ({pokemonsPerPage, pokemons, paginado}) => {
    const pageNumber = []; //Declaro un array vacio
                
    //Recorro un array en el cual voy a tomar el numero redondo del resultado de dividir todos los pokemones por los
    //pokemones por pagina que yo quiero
    //Y ese numero que yo genero lo pusheo a mi array pageNumber, resultando asi un array de numeros
    for (let i = 0; i < Math.ceil(pokemons/pokemonsPerPage); i++) {
        pageNumber.push(i+1);
    }
  return (
    <nav>
        <ul className={s.ul}>
            {//Aca digo que si tengo ese arreglo mapeamelo 
             //Y devolveme por ese array cada uno de los numeros que te devuelva el paginado
                pageNumber && pageNumber.map((number)=> (
                    <p key={number} >
                    <button className={s.number} onClick={()=> paginado(number)}>{number}</button>
                    </p>
                ))
            }
        </ul>
    </nav>
  )
};

export default Paginado;