"use client";

import { useAccount } from "@/context/AccountContext";
import { flyToWaypoint, switchFlightMode, warpOrJump } from "@/services/fleet";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function TravelWindow({ waypoints, ship, onNavigation }) {
    const { account, setShips, fetchShipsData, notify } = useAccount();
    const [controlledWaypoint, setControlledWaypoint] = useState("");
    const [translateX, setTranslateX] = useState("0%");

    const isShipDocked = ship.nav.status === "DOCKED";
    const departureSymbol = ship.nav.waypointSymbol;
    const flightMode = ship.nav.flightMode;

    const transformStyles = {
        transform: `translateX(${translateX})`,
        transition: "all 0.4s"
    }
    const iconStyles = "cursor-pointer hover:fill-amber-500 absolute h-4 w-4 top-[50%]";

    const speed = 0.04857 * ship.engine.speed;

    function flightModeFactor(flightMode) {
        if (flightMode === "BURN") return {fuel: 2, speed: 0.5}
        if (flightMode === "DRIFT") return {fuel: 0, speed: 2}
        if (flightMode === "STEALTH") return {fuel: 2, speed: 2}
        return {fuel: 1, speed: 1}
    }

    async function handleFlightMode(token, ship, mode) {
        try {
            const data = await switchFlightMode(token, ship, mode);
            setShips((ships) => ships.map((item) => item.symbol === ship ? {...item, nav: data} : item));
        } catch(err) {
            notify(err.message);
        }
    }

    async function handleTravel(e, token, ship, destination, type) {
        e.preventDefault();
        try {
            let data;
            if (type) data = await warpOrJump(token, ship, destination, type);
            else data = await flyToWaypoint(token, ship, destination);

            onNavigation(false);
            fetchShipsData(token);
        } catch(err) {
            notify(err.message);
        }
    }

    return (
    <div className="window w-[38rem]">
        <div className="flex-between px-6 py-4">
            <h2 className="text-2xl">Travel</h2>

            <div className="flex justify-center items-center">
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "CRUISE")}
                className={`${flightMode === "CRUISE"
                ? "btn-color"
                : "hover:btn-color-reversed"} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">CRUISE</span>
                </button>

                <button onClick={() => handleFlightMode(account.token, ship.symbol, "BURN")}
                className={`${flightMode === "BURN"
                ? "btn-color"
                : "hover:btn-color-reversed"} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">BURN</span>
                </button>

                <button onClick={() => handleFlightMode(account.token, ship.symbol, "DRIFT")}
                className={`${flightMode === "DRIFT"
                ? "btn-color"
                : "hover:btn-color-reversed"} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">DRIFT</span>
                </button>
                
                <button onClick={() => handleFlightMode(account.token, ship.symbol, "STEALTH")}
                className={`${flightMode === "STEALTH"
                ? "btn-color"
                : "hover:btn-color-reversed"} border p-2 text-xs/[1rem] skew-x-[20deg]`}>
                    <span className="block skew-x-[-20deg]">STEALTH</span>
                </button>
            </div>
        </div>

        <ul className="h-overflow max-w-full pt-4 text-xs">
            <li style={transformStyles} className="relative flex w-[200%]">
                
                <AiOutlineLeft
                onClick={() => {
                    setTranslateX("-50%");
                    setControlledWaypoint("");
                }}
                className={`${iconStyles} right-[50%] -translate-y-1/2 -translate-x-1/2`}/>

                <AiOutlineRight
                onClick={() => {
                    setTranslateX("0%");
                    setControlledWaypoint("");
                }}
                className={`${iconStyles} right-[0] -translate-y-1/2 -translate-x-1/2`}/>

                {["warp", "jump"].map(module => {
                const hasModule = !ship.modules.find(({symbol}) => symbol.includes(module.toUpperCase()));

                    if (hasModule) return <p key={module}
                    className="pl-6 pr-8 py-3 w-[50%] text-center text-xl">
                        The ship does not have a {module} module
                    </p>

                    return <form key={module}
                    className="pl-6 pr-8 py-3 grid grid-cols-[2fr_1fr_2fr_0.5fr_5.4rem] items-center w-[50%]"
                    onSubmit={(e) => handleTravel(e, account.token, ship.symbol, controlledWaypoint, module)}>
                        <div className="relative">
                            <input onChange={(e) => setControlledWaypoint(e.target.value.toUpperCase())} value={controlledWaypoint}
                            className="input py-3 w-full peer"/>
                            <label className={`floating-label peer-focus:translate-y-[-150%] ${controlledWaypoint
                                ? "translate-y-[-150%] scale-[80%] text-stone-50 z-10" : ""}`}>Waypoint</label>
                        </div>

                        <span></span>
                        <span></span>
                        <span></span>

                        <button
                        disabled={isShipDocked}
                        className={`btn ${isShipDocked
                        ? "disable-color"
                        : "btn-color hover:btn-color-reversed"} text-xs/[1rem]`}>
                            {module}
                        </button>
                    </form>
                })}
            </li>

            {waypoints?.map((planet, i, arr) => {

            const isCurrentWaypount = planet.symbol === departureSymbol;
            const canFly = !isCurrentWaypount && !isShipDocked;

            const {x, y} = (arr.find(item => item.symbol === departureSymbol));
            const timeSpending = ((x - planet.x)**2 + (y - planet.y)**2)**0.5 / speed;
            const fuelSpending = ((Math.trunc(speed * timeSpending * 1.008) || 1)
            * flightModeFactor(flightMode).fuel) || 1;

            const displayed = (timeSpending || 10) * 3 * flightModeFactor(flightMode).speed;

            return (
            <li className="py-3 pl-6 pr-8 grid grid-cols-[2fr_1fr_2fr_0.5fr_5.4rem] items-center"
            key={planet.symbol}>
                <span>{planet.symbol}</span>

                <span></span>
                <div className="flex flex-col">
                    {!isCurrentWaypount && displayed >= 60 && <span>~{Math.ceil(displayed/60)} Minutes</span>}
                    {!isCurrentWaypount && displayed < 60 && displayed > 30 && <span>~1 Minute</span>}
                    {!isCurrentWaypount && displayed <=30 && <span>~30 Seconds</span>}
                    {!isCurrentWaypount && <span>~{fuelSpending} Fuel</span>}
                </div>
                <span></span>

                <button
                onClick={(e) => handleTravel(e, account.token, ship.symbol, planet.symbol)}
                disabled={!canFly}
                className={`btn ${!canFly
                ? "disable-color"
                : "btn-color hover:btn-color-reversed"} text-xs/[1rem]`}>
                    SELECT
                </button>
            </li>)})}
        </ul>
    </div>)
}