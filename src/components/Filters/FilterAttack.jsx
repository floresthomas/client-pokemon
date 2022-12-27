import React from "react";
import { connect } from "react-redux";
import { orderAttack } from "../../actions";
import s from "./FilterAttack.module.css"

const FilterAttack = ({ orderAttack, setOrderAttack }) => {
  //detecta el cambio para ordernar por ataque
  const handleOrderAttack = (e) => {
    e.preventDefault();
    orderAttack(e.target.value);
    //seteo el estado local que uno vacio, para que se modifique y vuelva a renderizar la pagina con los pokemones cambiados
    setOrderAttack(`ordenado, ${e.target.value}`);
  };
  return (
    <>
      <select className={s.filtro} onChange={(e) => handleOrderAttack(e)}>
        <option hidden value="">
          Order attack
        </option>
        <option value="asc">desc attack</option>
        <option value="desc">asc attack</option>
      </select>
    </>
  );
};

//despachamos la accion que necesito
export const mapDispatchToProps = (dispatch) => {
  return {
    orderAttack: (payload) => dispatch(orderAttack(payload)),
  };
};

export default connect(null, mapDispatchToProps)(FilterAttack);