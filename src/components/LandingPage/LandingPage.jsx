import React from "react";
import { Link } from "react-router-dom"
import s from "./LandingPage.module.css"

export default function LandingPage() {
    return(
        <div className={s.imgLanding}>
            <div>
            <Link to="/home">
            <button className={s.boton} type="submit">Ingresar</button>
            </Link>
            </div>
        </div>
    )
}