import Link from "next/link";
import Planets from "./Planets";
import PlanetImg from "./PlanetImg";
import FactionImg from "./FactionImg";

export default function SystemItem({ system }) {

    return <li className="bg-stone-900 rounded-primary">
        <div className="flex-between gap-8 p-4">
            <div className="flex items-center h-16 gap-4">
                <PlanetImg type={system.type} origin="left"/>
                <h2 className="text-3xl">{system.symbol}</h2>
            </div>

            <Link href={`/systems/${system.symbol}`}
            className="btn btn-color hover:btn-color-reversed text-xl ml-auto">
                View
            </Link>
        </div>
        
        <div className="flex items-center uppercase text-xl">
            <hr className="grow opacity-50"/>
            {system.factions.length ? <FactionImg faction={system.factions[0]?.symbol}/> : ""}
            <hr className="grow opacity-50"/>
        </div>

        {system.waypoints.length
        ? <Planets waypoints={system.waypoints}/>
        : <p className="text-center py-4 text-xl uppercase">it{"'"}s empty here...</p>}
    </li>
}