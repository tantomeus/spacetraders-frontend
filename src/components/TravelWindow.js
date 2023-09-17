"use client";

import { useAccount } from "@/context/AccountContext";
import { useShips } from "@/context/ShipsContext";
import { flyToWaypoint, switchFlightMode, warpOrJump } from "@/services/api"
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function TravelWindow({ waypoints, departureSymbol, ship, onNavigation }) {
    const { account } = useAccount();
    const { setRerender, setShips } = useShips();
    const [controlledWaypoint, setControlledWaypoint] = useState("");
    const [translateX, setTranslateX] = useState("0%");
    
    const flightMode = ship.nav.flightMode;

    const transformStyles = {
        transform: `translateX(${translateX})`,
        transition: "all 0.4s"
    }

    const speed = 0.04857 * ship.engine.speed;

    function flightModeFactor(flightMode) {
        if (flightMode === "BURN") return {fuel: 2, speed: 0.5}
        if (flightMode === "DRIFT") return {fuel: 0, speed: 2}
        if (flightMode === "STEALTH") return {fuel: 2, speed: 2}
        return {fuel: 1, speed: 1}
    }

    function handleFlightMode(token, ship, mode) {
        switchFlightMode(token, ship, mode);
        setShips((ships) => ships.map((stateShip) => {
            const newShip = stateShip;
            if (newShip.symbol !== ship) return newShip;
            newShip.nav.flightMode = mode;
            return newShip;
        }));
    }

    function handleTravel(e, token, ship, destination, type) {
        if (type) {
            e.preventDefault();
            warpOrJump(token, ship, destination, type);
        }
        else flyToWaypoint(token, ship, destination);

        onNavigation(false);
        setRerender((rerender) => !rerender);
    }

    return <div className="window window-divide w-[38rem]">
        <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-2xl">Travel</h2>
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

        <ul className="overflow-y-auto max-w-full max-h-[70vh] pt-4 text-xs overflow-x-hidden">
            <li style={transformStyles} className="relative flex w-[200%]">

                <AiOutlineLeft
                onClick={() => setTranslateX("-50%")}
                className="cursor-pointer hover:fill-amber-500 absolute h-4 w-4 top-[50%] right-[50%] -translate-y-1/2 -translate-x-1/2"/>
                <AiOutlineRight
                onClick={() => setTranslateX("0%")}
                className="cursor-pointer hover:fill-amber-500 absolute h-4 w-4 top-[50%] right-[0] -translate-y-1/2 -translate-x-1/2"/>

                {["warp", "jump"].map(module => {
                const hasModule = !ship.modules.find(({symbol}) => symbol.includes(module.toUpperCase()));

                if (hasModule) return <p key={module} className="pl-6 pr-8 py-3 w-[50%] text-center text-xl">The ship does not have a {module} module</p>

                return <form key={module}
                className="pl-6 pr-8 py-3 grid grid-cols-[2fr_1fr_2fr_0.5fr_5.4rem] items-center w-[50%]"
                onSubmit={(e) => handleTravel(e, account.token, ship.symbol, controlledWaypoint, module)}>
                    <input placeholder="WAYPOINT"
                    onChange={(e) => setControlledWaypoint(e.target.value)} value={controlledWaypoint}
                    className="input h-full"/>
                    <span></span>
                    <span></span>
                    <span></span>
                    <button
                    className=" btn-color hover:btn-color-hover text-xs/[1rem]">{module}</button>
                </form>
                })}
            </li>

            {waypoints.map((planet, i, arr) => {

            const isShipDocked = ship.nav.status === "DOCKED";
            const isCurrentWaypount = planet.symbol === departureSymbol;
            const canFly = !isCurrentWaypount && !isShipDocked;

            const {x, y} = (arr.find(item => item.symbol === departureSymbol));
            const timeSpending = ((x - planet.x)**2 + (y - planet.y)**2)**0.5 / speed;
            const fuelSpending = ((Math.trunc(speed * timeSpending * 1.008) || 1) * flightModeFactor(flightMode).fuel) || 1;

            const displayed = (timeSpending || 10) * 3 * flightModeFactor(flightMode).speed;

            return <li className="py-3 pl-6 pr-8 grid grid-cols-[2fr_1fr_2fr_0.5fr_5.4rem] items-center" key={planet.symbol}>
                <span>{planet.symbol}</span>
                <span></span>
                <div className="flex flex-col">
                    {!isCurrentWaypount && displayed >= 60 && <span>~{Math.ceil(displayed/60)} Minutes</span>}
                    {!isCurrentWaypount && displayed < 60 && displayed > 30 && <span>~1 Minute</span>}
                    {!isCurrentWaypount && displayed <=30 && <span>~30 Seconds</span>}
                    {!isCurrentWaypount && <span>~{fuelSpending} Fuel</span>}
                </div>
                <span></span>
                <button onClick={(e) => handleTravel(e, account.token, ship.symbol, planet.symbol)} disabled={!canFly} className={`btn-color ${!canFly ? "bg-stone-600" : "hover:btn-color-hover"} text-xs/[1rem]`}>SELECT</button>
            </li>})}
        </ul>
    </div>
}