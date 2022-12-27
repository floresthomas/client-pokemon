import React, { useState } from "react";
import { connect } from "react-redux"
import { getPokemonName } from "../../actions/index";
import s from "./SearchBar.module.css"

 function SearchBar({getPokemonName, setPage}) {
    const [name, setName] = useState("");

    function handleName(e){
        e.preventDefault();
        setName(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      };

    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            return alert("SearchBar is empty")
        } 
        if(name){
            getPokemonName(name)
        }
        setPage(1)
        setName("");
    }

    return(
        <div className={s.searchbar}>
            <input
            type = "text"
            placeholder= "Search name..."
            value={name || ""}
            onChange={(e) => handleName(e)}
            onKeyPress={handleEnter}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}

export const mapDispatchToProps = (dispatch) => {
    return {
      getPokemonName: (name) => dispatch(getPokemonName(name)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(SearchBar);