import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css"

export default function Card({ name, image, type, id}){
    return(
        <div className={s.containerCard}>      
            <h2 className={s.title}>{name}</h2>        
            <h5 className={s.type}>{ `${type}`}</h5>
            <img className={s.imgCard} src={image}/>
            <Link to={`/detail/${id}`}>
            <button className={s.buttonCard}>Detail</button>
            </Link>
        </div>
    )
}