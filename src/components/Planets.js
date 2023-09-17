import PlanetItem from "./PlanetItem";

import { GiShipWheel, GiTakeMyMoney } from "react-icons/gi";

export default function Planets({ waypoints = [], className = "", icons = false }) {
    return <ul className={`${className} flex gap-4 justify-around flex-wrap px-5 pb-5 text-center `}>
        {waypoints.map((point) => {

            const hasShipyard = point.traits?.find(item => item.symbol === "SHIPYARD");
            const hasMarketplace = point.traits?.find(item => item.symbol === "MARKETPLACE");

            return <li className={`flex flex-col justify-start`} key={point.symbol}>
                <PlanetItem type={point.type}/>
                <span className="text-[0.6rem]">{point.symbol}</span>
                {icons && <div className="grid grid-cols-2 gap-2 mt-2">
                    {!!hasShipyard ?
                    <GiShipWheel className="bg-amber-600 p-2 rounded-full w-10 h-10 border border-stone-50 justify-self-end"/> :
                    <GiShipWheel className="bg-stone-700 p-2 rounded-full w-10 h-10 border border-stone-50 justify-self-end"/>}
                    {!!hasMarketplace ?
                    <GiTakeMyMoney className="bg-amber-600 p-2 rounded-full w-10 h-10 border border-stone-50 justify-self-start"/> :
                    <GiTakeMyMoney className="bg-stone-700 p-2 rounded-full w-10 h-10 border border-stone-50 justify-self-start"/>}
                </div>}
            </li>
        })}
    </ul>
}