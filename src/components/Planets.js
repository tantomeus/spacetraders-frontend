import { useState } from "react";
import PlanetImg from "./PlanetImg";
import WaypointInfo from "./WaypointInfo";

export default function Planets({ waypoints = [], className = "", icons = false }) {
    const [openedWaypoint, setOpenedWaypoint] = useState("");

    return (
    <ul className={`${className} flex gap-4 justify-around items-end flex-wrap px-5 pb-5 text-center`}>
        {waypoints.map(waypoint => {

            return <li
            onMouseLeave={() => setOpenedWaypoint("")}
            onMouseEnter={() => setOpenedWaypoint(waypoint.symbol)}
            className="relative flex flex-col justify-between items-center mt-6"
            key={waypoint.symbol}>
                <PlanetImg type={waypoint.type}/>
                <span className="text-[0.6rem] mt-4">{waypoint.symbol}</span>

                {openedWaypoint === waypoint.symbol && waypoint.traits && <WaypointInfo waypoint={waypoint}/>}

            </li>
        })}
    </ul>)
}