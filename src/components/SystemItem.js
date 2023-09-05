import Link from "next/link";
import Planets from "./Planets";
import PlanetItem from "./PlanetItem";
export default function SystemItem({ system }) {

    return <li className="bg-stone-900 divide-y divide-stone-500">
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center h-16">
                <div className="w-24"><PlanetItem type={system.type} origin="left"/></div>
                <h2 className="text-3xl">{system.symbol}</h2>
            </div>
            <Link href={`systems/${system.symbol}`} className="bg-amber-600 text-xl p-2 rounded-md">View</Link>
        </div>
        <Planets waypoints={system.waypoints}/>
    </li>
}