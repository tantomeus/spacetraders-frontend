"use client";

import { useAccount } from "@/context/AccountContext";
import { flyToWaypoint, switchFlightMode } from "@/services/api"
import { useState } from "react";

export default function TravelWindow({ waypoints, departureSymbol, ship, onNavigation }) {
    const { account } = useAccount();
    const [flightMode, setFlightMode] = useState(ship.nav.flightMode);

    const speed = 0.04857 * ship.engine.speed;

    function handleFlightMode(token, ship, mode) {
        switchFlightMode(token, ship, mode);
        setFlightMode(mode);
    }

    function handleOnClick(token, ship, destination) {
        flyToWaypoint(token, ship, destination);
        onNavigation(false);
    }

    return <div className="z-[1000] divide-y divide-stone-500 absolute top-[5vh] left-1/2 transform -translate-x-1/2 bg-stone-900 w-[600px] pt-3">
        <div className="flex justify-between items-center px-6 pb-4">
            <h2 className="text-2xl">Flight Mode</h2>
            <div className="flex justify-center items-center">
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "CRUISE")}
                className={`${flightMode === "CRUISE" ? "bg-amber-600" : ""} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">CRUISE</span>
                </button>
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "BURN")}
                className={`${flightMode === "BURN" ? "bg-amber-600" : ""} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">BURN</span>
                </button>
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "DRIFT")}
                className={`${flightMode === "DRIFT" ? "bg-amber-600" : ""} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">DRIFT</span>
                </button>
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "STEALTH")}
                className={`${flightMode === "STEALTH" ? "bg-amber-600" : ""} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">STEALTH</span>
                </button>
            </div>
        </div>

        <ul className="overflow-auto max-h-[70vh] pt-4 text-xs">
        {waypoints.map((planet, i, arr) => {

        const check = planet.symbol === departureSymbol; 
        const {x, y} = (arr.find(item => item.symbol === departureSymbol));
        const timeSpending = ((x - planet.x)**2 + (y - planet.y)**2)**0.5 / speed;
        const fuelSpending = Math.ceil(speed * timeSpending * 1.008);

        return <li className="py-3 px-4 flex justify-between items-center" key={planet.symbol}>
            {planet.symbol}
            <div className="flex flex-col">
                {timeSpending >= 60 && <span>~{Math.ceil(timeSpending/60)} Minutes</span>}
                {timeSpending < 60 && <span>{!check ?"~"+Math.ceil(timeSpending) + " Seconds" : ""}</span>}
                {!check && <span>~{fuelSpending} Fuel</span>}
            </div>
            <button onClick={() => handleOnClick(account.token, ship.symbol, planet.symbol)} disabled={check} className={`${check?"bg-stone-600":"bg-amber-600"} text-xs/[1rem] p-2 rounded-md`}>SELECT</button>
        </li>})}
        </ul>
    </div>
}