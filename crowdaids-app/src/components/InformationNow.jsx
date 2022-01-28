import React from 'react';
import './InformationNow.sass';
import { IconContext } from "react-icons";
import { ImArrowDown } from "react-icons/im";
import { TiArrowDownOutline } from "react-icons/ti";
import { BiStar } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { mapBeach } from './helpers'
import logger from '../logger'

function InformationNow({ maxMin, tide, wind, weather, swellDir, coordMap, arrS, arrW, fav, toggleFavorite, id, name, theme }) {
    logger.info('InformationNow -> render')

    return (
        <div className={`${theme} grid__center center center1`}>
            <aside className="grid__center-aside">
                <div id="favorites">
                    <h2>INFORME ACTUAL DE SURF </h2>
                    <IconContext.Provider value={{ color: '#d8a600', size: "1em", style: { verticalAlign: 'middle' } }}>
                        <span className="favorite--icon" onClick={() => toggleFavorite(id, name)}>{fav?.isFav ? <BsStarFill /> : <BiStar />} Agregar a favoritos</span>
                    </IconContext.Provider>
                </div>
                <div className="map" style={{ backgroundImage: `url(${`https://api.maptiler.com/maps/basic/256/9/${coordMap()}.png?key=7aiwCGhglRXo4QbAr4RI`})` }} >
                    <div className="arrow--swell" style={{ transform: `rotateZ(${arrS()}deg)` }}>
                        <IconContext.Provider value={{ color: "orange", size: "2rem", className: "iconS" }} >
                            <ImArrowDown className="iconS" />
                        </IconContext.Provider >
                    </div>
                    <div className="arrow--wind" style={{ transform: `rotateZ(${arrW()}deg)` }}>
                        <IconContext.Provider value={{ color: "green", size: "2rem", className: "iconW" }} >
                            <TiArrowDownOutline className="iconW" />
                        </IconContext.Provider >
                    </div>
                    {mapBeach()}
                </div>
            </aside>
            <aside className="grid__center-aside1">
                <div className="aside1--elements">
                    <span><h3>Surf altura</h3></span>
                    <span className="actual--data">{maxMin()}</span>
                </div>
                <div className="aside1--elements">
                    <span><h3>Marea</h3></span>
                    <span className="actual--data">{tide()}m</span>
                </div>
                <div className="aside1--elements">
                    <span><h3>Viento</h3></span>
                    <span className="actual--data">{wind()}</span>
                </div>
                <div className="aside1--elements">
                    <span><h3>Clima</h3></span>
                    <span className="actual--data">{weather()}</span>
                </div>
                <div className="aside1--elements">
                    <span><h3>Oleaje</h3></span>
                    <span className="actual--data">{swellDir()}</span>
                </div>
            </aside>
        </div>
    )

}

export default InformationNow