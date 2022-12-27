import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPokemonId, clearPage } from "../../actions";
import s from "./Detail.module.css"

const DetailPokemon = ({
  match: {
    params: { id },
  },
  pokemonDetail,
  getPokemonId,
  clearPage
}) => {
  useEffect(() => {
    getPokemonId(id);
    return () => clearPage()
  }, [getPokemonId, clearPage, id]);

  const {
    name,
    life,
    attack,
    defending,
    speed,
    height,
    weight,
    image,
    image2,
    types,
  } = pokemonDetail;

  return (
    <div className={s.imgBg}>
      {
      pokemonDetail && (
          <div className={s.container}>
              <div className={s.title}>
                <h4>{name}</h4>
              </div>
              <h2 className={s.data}>
                Id : <span>{id}</span>
              </h2>
              <h2 className={s.data}>
                Life : <span>{life} </span>
              </h2>
              <h2 className={s.data}>
                Attack : <span>{attack} </span>
              </h2>
              <h2 className={s.data}>
                Defense : <span>{defending}</span>
              </h2>
              <h2 className={s.data}>
                Speed : <span>{speed}</span>
              </h2>
              <h2 className={s.data}>
                Height : <span>{height}</span>
              </h2>
              <h2 className={s.data}>
                Weight : <span>{weight}</span>
              </h2>
              <p className={s.data}>
              <div> <h2>Type :</h2> {types?.length > 0 && types?.map((e, key) => (<h2 key={key}> {e.name ? e.name : e} </h2>)) }</div>
              </p>
              <img className={s.imageVg} src={image2 ? image2 : image} alt={name}/>
          </div>
      )}
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    pokemonDetail: state.detail,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getPokemonId: (id) => dispatch(getPokemonId(id)),
    clearPage: () => dispatch(clearPage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPokemon);
