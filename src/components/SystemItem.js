import Link from "next/link";
import Planets from "./Planets";
import PlanetImg from "./PlanetImg";
import FactionImg from "./FactionImg";

export default function SystemItem({ system }) {

    return (
    <li className="bg-stone-900 rounded-primary">
        <div className="flex-wrap gap-8 p-4 flex-between">
            <div className="flex items-center h-16 gap-4">
                <PlanetImg type={system.type} origin="left"/>
                <h2 className="text-3xl">{system.symbol}</h2>
            </div>

            <Link href={`/systems/${system.symbol}`}
            className="ml-auto text-xl btn btn-color hover:btn-color-reversed">
                View
            </Link>
        </div>
        
        <div className="flex items-center text-xl uppercase">
            <hr className="opacity-50 grow"/>
            {system.factions?.length ? <FactionImg faction={system.factions[0]?.symbol}/> : ""}
            <hr className="opacity-50 grow"/>
        </div>

        {system.waypoints?.length
        ? <Planets waypoints={system.waypoints}/>
        : <p className="py-4 text-xl text-center uppercase">it{"'"}s empty here...</p>}
    </li>)
}