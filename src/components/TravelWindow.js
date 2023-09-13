"use client";

import { useAccount } from "@/context/AccountContext";
import { flyToWaypoint, switchFlightMode } from "@/services/api"
import { useState } from "react";

export default function TravelWindow({ waypoints, departureSymbol, ship, onNavigation }) {
    const { account, setRerender } = useAccount();
    const [flightMode, setFlightMode] = useState(ship.nav.flightMode);

    function flightModeFactor(flightMode) {
        if (flightMode === "BURN") return {fuel: 2, speed: 0.5}
        if (flightMode === "DRIFT") return {fuel: 0, speed: 2}
        if (flightMode === "STEALTH") return {fuel: 2, speed: 2}
        return {fuel: 1, speed: 1}
    }
    
    const speed = 0.04857 * ship.engine.speed ;

    function handleFlightMode(token, ship, mode) {
        switchFlightMode(token, ship, mode);
        setFlightMode(mode);
    }

    function handleOnClick(token, ship, destination) {
        flyToWaypoint(token, ship, destination);
        onNavigation(false);
        setRerender((rerender) => !rerender);
    }

    return <div className="z-[1000] divide-y divide-stone-500 fixed top-[5vh] left-1/2 transform -translate-x-1/2 bg-stone-900 w-[600px] pt-3">
        <div className="flex justify-between items-center px-6 pb-4">
            <h2 className="text-2xl">Flight Mode</h2>
            <div className="flex justify-center items-center">
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "CRUISE")}
                className={`${flightMode === "CRUISE" ? "bg-amber-600" : "hover:bg-stone-50 hover:text-amber-600"} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">CRUISE</span>
                </button>
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "BURN")}
                className={`${flightMode === "BURN" ? "bg-amber-600" : "hover:bg-stone-50 hover:text-amber-600"} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">BURN</span>
                </button>
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "DRIFT")}
                className={`${flightMode === "DRIFT" ? "bg-amber-600" : "hover:bg-stone-50 hover:text-amber-600"} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">DRIFT</span>
                </button>
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "STEALTH")}
                className={`${flightMode === "STEALTH" ? "bg-amber-600" : "hover:bg-stone-50 hover:text-amber-600"} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">STEALTH</span>
                </button>
            </div>
        </div>

        <ul className="overflow-auto max-h-[70vh] pt-4 text-xs">
        {waypoints.map((planet, i, arr) => {

        const check = planet.symbol === departureSymbol; 
        const {x, y} = (arr.find(item => item.symbol === departureSymbol));
        const timeSpending = ((x - planet.x)**2 + (y - planet.y)**2)**0.5 / speed;
        const fuelSpending = ((Math.trunc(speed * timeSpending * 1.008) || 1) * flightModeFactor(flightMode).fuel) || 1;

        const displayed = (timeSpending || 10) * 3 * flightModeFactor(flightMode).speed;

        return <li className="py-3 px-4 grid grid-cols-[2fr_1fr_2fr_0.5fr_1fr] items-center" key={planet.symbol}>
            {planet.symbol}
            <span></span>
            <div className="flex flex-col">
                {!check && displayed >= 60 && <span>~{Math.ceil(displayed/60)} Minutes</span>}
                {!check && displayed < 60 && displayed > 30 && <span>~1 Minute</span>}
                {!check && displayed <=30 && <span>~30 Seconds</span>}
                {!check && <span>~{fuelSpending} Fuel</span>}
            </div>
            <span></span>
            <button onClick={() => handleOnClick(account.token, ship.symbol, planet.symbol, displayed)} disabled={check} className={`btn-color ${check?"bg-stone-600":"hover:btn-color-hover"} text-xs/[1rem]`}>SELECT</button>
        </li>})}
        </ul>
    </div>
}