import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createPokemon, getTypes } from "../../actions";
import { Link } from "react-router-dom"
import s from "./Create.module.css"

const FormPokemon = ({ createPokemon, getTypes, TYPES }) => {

  useEffect(() => {
    getTypes();
  }, []);

  const [newPokemon, setNewPokemon] = useState(false);

  const handleNewPokemon = () => {
    newPokemon ? setNewPokemon(false) : setNewPokemon(true);
  };

  //State input
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    life: "",
    attack: "",
    defending: "",
    speed: "",
    height: "",
    weight: "",
    image: ""
  });

  const { name, life, attack, defending, speed, height, weight, image } = input;

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
;
    setErrors(
      validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const validations = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "name is required";
    };
    if (!input.attack) {
      errors.attack = "Attack is required"
    }
    return errors;
  };

  //SELECT TYPES
  const [select, setSelect] = useState({ types: [] });

  const { types } = select;

  const handleSelectChange = (e) => {
    e.preventDefault();
    setSelect({
      types: [...types, e.target.value],
    });
  };

  const deleteTypes = (e, key)=> {
    e.preventDefault();
    let newTypes = [];
    if(types && types.length > 0){
      for(let i = 0; i< types.length; i++){
        if(i !== key){
          newTypes.push(types[i])
        };
      };
    };
    setSelect({
      types : newTypes
    });
   };

  //SUBMIT POKEMON
  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      name: name,
      life: life,
      attack: attack,
      defending: defending,
      speed: speed,
      height: height,
      weight: weight,
      types: types,
      image: image,
    };

    if (!obj.name || !obj.life || !obj.attack || !obj.defending || !obj.speed || !obj.height || !obj.weight) {
      setErrors({
        name: "name is required",
        life: "life is required",
        attack: "attack is required",
        defending: "defense is required",
        speed: "speed is required",
        height: "heigth is required",
        weight : "weigth is required"
      });
      return alert("Please complete the fields correctly")
    } else {
       createPokemon(obj);
       setInput({
        name:"",
        life:"",
        attack:"",
        defending:"",
        speed:"",
        height:"",
        weight:"",
        image:""
      });
      setSelect({types: ""});
       return alert("Pokemon Created")
    };
  };

  console.log(types);
  return (
    <div className={s.imgForm}>
      <h1 className={s.titleForm}> Crea tu Pokemon</h1>
      <div className={s.containerForm}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          // onChange={(e) => handleChange(e)}
          className={s.name}
        />
        {errors.name && errors.name === "name is required" ? (
          <p>{errors.name}</p>
        ) : (
          <p> </p>
        )}
        <label>Life: </label>
        <input
          type="number"
          name="life"
          value={life}
          onChange={(e) => handleChange(e)}
          className={s.life}
        />
        {errors.life && errors.life === "life is required" ? (
        <p>{errors.life}</p>
        ) : (
          <p></p>
        )}
        <label>Attack: </label>
        <input
          type="number"
          name="attack"
          value={attack}
          onChange={(e) => handleChange(e)}
          className={s.attack}
        />
        {errors.attack && errors.attack === "attack is required" ? (
        <p>{errors.attack}</p>
        ) : (
          <p></p>
        )}
        <label>Defense: </label>
        <input
          type="number"
          name="defending"
          value={defending}
          onChange={(e) => handleChange(e)}
          className={s.defense}
        />
        {errors.defending && errors.defending === "defense is required" ? (
        <p>{errors.defending}</p>
        ) : (
          <p></p>
        )}
        <label>Speed: </label>
        <input
          type="number"
          name="speed"
          value={speed}
          onChange={(e) => handleChange(e)}
          className={s.speed}
        />
        {errors.speed && errors.speed === "speed is required" ? (
        <p>{errors.speed}</p>
        ) : (
          <p></p>
        )}
        <label>Heigth: </label>
        <input
          type="number"
          name="height"
          value={height}
          onChange={(e) => handleChange(e)}
          className={s.heigth}
        />
        {errors.height && errors.height === "heigth is required" ? (
        <p>{errors.height}</p>
        ) : (
          <p></p>
        )}
        <label>Weigth: </label>
        <input
          type="number"
          name="weight"
          value={weight}
          onChange={(e) => handleChange(e)}
          className={s.weigth}
        />
        {errors.weight && errors.weight === "weigth is required" ? (
        <p>{errors.weight}</p>
        ) : (
          <p></p>
        )}
        <label>Image: </label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => handleChange(e)}
          className={s.image}
        />
        <div>
          <label>Select type</label>
          <select className={s.types} value={select.types} onChange={(e) => handleSelectChange(e)}>
            {TYPES && TYPES.length > 0 ? (
              TYPES.map((t) => {
                return (
                  <>
                    <option value={t.name}>{t.name}</option>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </select>
          {select.types && select.types.length > 0 ? (
            select?.types?.map((pointer, key) => {
              return (
                <>
                  <p>{pointer}</p>
                  <button onClick={(e) => deleteTypes(e,key)}>x</button>
                </>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <button className={s.buttonCreate} type="submit" onClick={handleNewPokemon}>
          Crear pokemon
        </button>
        <Link to="/home">
              <button className={s.volver}>Home</button>
        </Link>
      </form>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    TYPES: state.types,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    createPokemon: (payload) => dispatch(createPokemon(payload)),
    getTypes: () => dispatch(getTypes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPokemon);
