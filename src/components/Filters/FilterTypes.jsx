import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTypes, filterTypes } from "../../actions";
import s from "./FilterTypes.module.css"

const FilterTypes = ({ getTypes, filterTypes, types, setPage }) => {
    useEffect(() => {
        getTypes();
    }, [getTypes])

    const handleTypes = (e) => {
        e.preventDefault();
        filterTypes(e.target.value)
        setPage(1);
    }

    return (
        <>
          <select className={s.filtro} onChange={(e) => handleTypes(e)}>
            <option hidden value="">
              Types
            </option>
            <option value="all">All</option>
            {types?.map((element) => (
              <option key={element.name} value={element.name}>
                {element.name}
              </option>
            ))}
          </select>
        </>
      );
    };

export const mapStateToProps = (state) => {
    return {
      types: state.types,
    };
  };

export const mapDispatchToProps = (dispatch) => {
    return {
      filterTypes: (payload) => dispatch(filterTypes(payload)),
      getTypes: () => dispatch(getTypes()),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(FilterTypes);
