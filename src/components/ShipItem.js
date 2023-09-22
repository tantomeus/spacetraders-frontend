"use client";

import { useAccount } from "@/context/AccountContext";
import { dockOrOrbit } from "@/services/api";
import { FaHelicopterSymbol } from "react-icons/fa6"
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import TravelWindow from "./TravelWindow";
import FlightWindow from "./FlightWindow";
import Overlay from "./Overlay";
import ShipImg from "./ShipImg";
import Inventory from "./Inventory";
import Mining from "./Mining";
import TransferCargo from "./TransferCargo";

export default function ShipItem({ ship, system }) {
    const remainingTravel = useMemo(() => {
        return Math.trunc((new Date(ship.nav.route.arrival) - new Date()) / 1000);
    }, [ship.nav.route.arrival])

    const [seconds, setSeconds] = useState(remainingTravel);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    // travel, flightInfo, inventory, mining, transfer
    const [openedWindow, setOpenedWindow] = useState("");
    const { account, setShips, fetchShipsData } = useAccount();
    const ref = useRef(null);

    const waypoint = system?.find((waypoint) => ship.nav.waypointSymbol === waypoint.symbol);
    const status = ship.nav.status;
    const remainingMine = ship.cooldown.remainingSeconds;

    function handleToggleDropdown() {
        setIsDropDownOpen((value) => !value);
    }

    function handleOpenWindow(name) {
        setOpenedWindow(name);
        setIsDropDownOpen(false);
    }

    async function handleDockOrOrbit() {
        try {
            const data = await dockOrOrbit(account.token, ship.symbol, status === "DOCKED" ? "orbit" : "dock");
            if (!data) throw new Error("watta u doin");
            setShips((ships) => ships.map(item => item.symbol == ship.symbol ? {
                ...item, nav: data.nav
            } : item));
        } catch(err) {
            console.error(err);
        }
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
        if (status === "IN_TRANSIT" && remainingTravel > 0) {
            let interval = setInterval(() => {
                setSeconds((time) => time - 1);
            }, 1000);

            setTimeout(() => {
                fetchShipsData(account.token)
            }, remainingTravel * 1000 + 1000);

            return function() {
                clearInterval(interval);
            }
        }
    }, [remainingTravel, status, account.token, fetchShipsData]);

    useEffect(() => {
        if (remainingMine) {
            const interval = setInterval(() => {
                setShips((ships) => ships.map((item) => ship.symbol === item.symbol ?
                {...item, cooldown: {...item.cooldown, remainingSeconds: item.cooldown.remainingSeconds - 1}} :
                item));
            }, 1000);
        
            return function() {
                clearInterval(interval);
            }
        }
    }, [remainingMine, ship.symbol, setShips]);

    
    if (status === "IN_TRANSIT") return (
    <li className="flex items-center gap-6 item-hover-color p-4 rounded-primary">
        <ShipImg status={status} ship={ship}/>

        <div className="space-y-4">
            <div className="flex gap-2 items-center text-md">
                <h3>{ship.symbol}</h3>
                &bull;
                <span>{ship.frame.name.replace("Frame ", "")}</span>
            </div>

            <button onClick={() => handleOpenWindow("inventory")}
            className="text-xs px-2 py-1 rounded-full uppercase bg-stone-600 hover:bg-stone-500">
                inventory
            </button>
        </div>

        <button onClick={() => handleOpenWindow("flightInfo")}
        className="ml-auto btn btn-color hover:btn-color-reversed text-xs/[1rem]">VIEW FLIGHT</button>

        {openedWindow === "flightInfo" && createPortal(<>
            <FlightWindow ship={ship} seconds={seconds}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "inventory" && createPortal(<>
            <Inventory ship={ship}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}
    </li>)


    return (
    <li className="flex items-center gap-6 item-hover-color p-4 rounded-primary">
        <div className="relative flex justify-center items-center h-20 w-20">
            <FaHelicopterSymbol
            className="absolute p-2 rounded-full h-full w-full bg-stone-400 fill-amber-600"/>
            <ShipImg onClick={handleDockOrOrbit} status={status} ship={ship}/>
        </div>

        <div className="space-y-4">
            <div className="flex gap-2 items-center text-md">
                <h3>{ship.symbol}</h3>
                &bull;
                <span>{ship.frame.name.replace("Frame ", "")}</span>
            </div>

            <button onClick={() => handleOpenWindow("inventory")}
            className="text-xs px-2 py-1 rounded-full uppercase bg-stone-600 hover:bg-stone-500">
                inventory
            </button>
        </div>

        <div ref={ref} className="relative ml-auto">
            <button onClick={handleToggleDropdown}
            className="btn btn-color hover:btn-color-reversed text-xs/[1rem]">
                COMMAND
            </button>

            {isDropDownOpen && <div className="z-50 rounded-lg absolute right-0 top-10 flex flex-col w-28 bg-stone-700 divide-y divide-stone-500 overflow-hidden">
                <button onClick={() => handleOpenWindow("travel")} className="dropdown-item">Travel</button>
                <button onClick={() => handleOpenWindow("mining")} className="dropdown-item">Mine</button>
                <button onClick={() => handleOpenWindow("transfer")} className="dropdown-item">Transfer</button>
            </div>}
        </div>

        {openedWindow === "travel" && createPortal(<>
            <TravelWindow onNavigation={setOpenedWindow} ship={ship} waypoints={system}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "inventory" && createPortal(<>
            <Inventory waypoint={waypoint} ship={ship}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "mining" && createPortal(<>
            <Mining ship={ship} waypoint={waypoint}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "transfer" && createPortal(<>
            <TransferCargo ship={ship} waypoint={waypoint}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}
    </li>)
}