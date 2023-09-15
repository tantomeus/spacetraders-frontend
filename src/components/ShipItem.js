"use client";

import { useAccount } from "@/context/AccountContext";
import { dockOrOrbit, mineAsteroid } from "@/services/api";
import { FaHelicopterSymbol } from "react-icons/fa6"
import { useEffect, useRef, useState } from "react";
import TravelWindow from "./TravelWindow";
import FlightWindow from "./FlightWindow";
import { convertSeconds, shipImg } from "@/helpers/helpers";
import Overlay from "./Overlay";
import ShipImg from "./ShipImg";
import Inventory from "./Inventory";

export default function ShipItem({ ship, system }) {
    const time = Math.trunc((new Date(ship.nav.route.arrival) - new Date()) / 1000);
    const [timer, setTimer] = useState(() => convertSeconds(time));

    const [status, setStatus] = useState(ship.nav.status);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [openedWindow, setOpenedWindow] = useState(false); // travel, flightInfo, inventory
    const { account, setRerender } = useAccount();
    const ref = useRef(null);

    function handleOpenDropdown() {
        setIsDropDownOpen((value) => !value);
    }

    function handleOpenWindow(name) {
        setOpenedWindow(name);
        setIsDropDownOpen(false);
    }

    function handleDockOrOrbit() {
        if (status === "DOCKED") {
            dockOrOrbit(account.token, ship.symbol, "orbit")
            setStatus("IN_ORBIT");
        } else {
            dockOrOrbit(account.token, ship.symbol, "dock");
            setStatus("DOCKED");
        }
    }

    function handleMineAsteroid() {
        mineAsteroid(account.token, ship.symbol);
        setIsDropDownOpen(false);
    }

    useEffect(() => {
        function close(e) {
            if(e.target.closest(".relative") === ref.current) return;
            setIsDropDownOpen(false);
        }
        document.body.addEventListener("mousedown", close);
        return function() {
            document.body.removeEventListener("mousedown", close);
        }
    }, []);

    useEffect(() => {
        if (status === "IN_TRANSIT" && time >= 0) {
            let interval = setInterval(() => {
                setTimer(time);
            }, 1000);

            return function () {
                clearInterval(interval);
            }
        }
    }, [time, status, openedWindow]);

    useEffect(() => {
        if (status === "IN_TRANSIT") {
            setTimeout(() => {
                setRerender((rerender) => !rerender);
            }, time * 1000 + 1000);
        }
    }, []);
    
    if (status === "IN_TRANSIT") return (
    <li className="flex items-center gap-6 hover:bg-stone-800 p-4">
        <ShipImg status={status} ship={ship}/>
        <div className="space-y-4">
            <h3 className="font-medium">{ship.symbol}</h3>
            <button onClick={() => handleOpenWindow("inventory")} className="text-xs bg-stone-600 px-2 py-1 rounded-full uppercase hover:bg-stone-500">inventory</button>
        </div>
        <button onClick={() => handleOpenWindow("flightInfo")} className="ml-auto btn-color hover:btn-color-hover text-xs/[1rem]">VIEW FLIGHT</button>

        {openedWindow === "flightInfo" && <>
            <FlightWindow ship={ship} timer={timer}/>
            <Overlay onClose={setOpenedWindow}/>
        </>}

        {openedWindow === "inventory" && <>
            <Inventory ship={ship}/>
            <Overlay onClose={setOpenedWindow}/>
        </>}
    </li>)

    return <li className="flex items-center gap-6 hover:bg-stone-800 p-4">
        <div className="relative flex justify-center items-center h-20 w-20">
            <FaHelicopterSymbol className="absolute p-2 rounded-full h-full w-full bg-stone-400 fill-amber-600"/>
            <ShipImg onClick={handleDockOrOrbit} status={status} ship={ship}/>
        </div>
        <div className="space-y-4">
            <h3 className="font-medium">{ship.symbol}</h3>
            <button onClick={() => handleOpenWindow("inventory")} className="text-xs bg-stone-600 px-2 py-1 rounded-full uppercase hover:bg-stone-500">inventory</button>
        </div>
        <div ref={ref} className="relative ml-auto">
            <button onClick={handleOpenDropdown} className="btn-color hover:btn-color-hover text-xs/[1rem]">COMMAND</button>

            {isDropDownOpen && <div className="z-50 rounded-lg absolute right-0 top-10 flex flex-col w-28 bg-stone-700 divide-y divide-stone-500 overflow-hidden">
                <button onClick={() => handleOpenWindow("travel")} className="text-xs text-left p-3 hover:bg-stone-600">Travel</button>
                <button onClick={handleMineAsteroid} className="text-xs text-left p-3 hover:bg-stone-600">Mine</button>
                <button className="text-xs text-left p-3 hover:bg-stone-600">Refuel</button>
            </div>}
        </div>
        
        {openedWindow === "travel" && <>
            <TravelWindow onNavigation={setOpenedWindow} ship={ship} departureSymbol={ship.nav.waypointSymbol} waypoints={system}/>
            <Overlay onClose={setOpenedWindow}/>
        </>}

        {openedWindow === "inventory" && <>
            <Inventory ship={ship}/>
            <Overlay onClose={setOpenedWindow}/>
        </>}
    </li>
}