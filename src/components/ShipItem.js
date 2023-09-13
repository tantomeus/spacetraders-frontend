"use client";

import { useAccount } from "@/context/AccountContext";
import { docking, orbiting } from "@/services/api";
import { useEffect, useRef, useState } from "react";
import TravelWindow from "./TravelWindow";
import FlightWindow from "./FlightWindow";
import { convertSeconds, shipImg } from "@/helpers/helpers";
import Overlay from "./Overlay";
import ShipImg from "./ShipImg";

export default function ShipItem({ ship, system }) {
    const time = Math.trunc((new Date(ship.nav.route.arrival) - new Date()) / 1000);
    const [timer, setTimer] = useState(() => convertSeconds(time));

    const [status, setStatus] = useState(ship.nav.status);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const { account, setRerender } = useAccount();
    const ref = useRef(null);

    function handleOpenDropdown() {
        setIsDropDownOpen((value) => !value);
    }

    function handleOpenWindow() {
        setIsWindowOpen(true);
        setIsDropDownOpen(false);
    }

    function handleDockOrOrbiting() {
        if (status === "DOCKED") {
            orbiting(account.token, ship.symbol);
            setStatus("IN_ORBIT");
        } else {
            docking(account.token, ship.symbol);
            setStatus("DOCKED");
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
        if (status === "IN_TRANSIT" && time >= 0) {
            let interval = setInterval(() => {
                setTimer(time);
            }, 1000);

            return function () {
                clearInterval(interval);
            }
        }
    }, [time, status, isWindowOpen]);

    useEffect(() => {
        if (status === "IN_TRANSIT") {
            setTimeout(() => {
                setRerender((rerender) => !rerender);
            }, time * 1000 + 1000);
        }
    }, []);
    
    if (status === "IN_TRANSIT") return (
    <li className="flex items-center gap-6">
        <ShipImg status={status} ship={ship}/>
        <div className="space-y-4">
            <h3 className="font-medium">{ship.symbol}</h3>
            {!ship.cargo.inventory.length ? <span className="inline-block text-xs bg-stone-500 px-2 py-1 rounded-full">No cargo</span> : ship.cargo.inventory.map((item, i) => <span key={i}>{item.name}</span>)}
        </div>
        <button onClick={() => setIsWindowOpen(true)} className="ml-auto btn-color hover:btn-color-hover text-xs/[1rem]">VIEW FLIGHT</button>

        {isWindowOpen && <>
            <FlightWindow ship={ship} timer={timer}/>
            <Overlay onClose={setIsWindowOpen}/>
        </>}
    </li>)

    return <li className="flex items-center gap-6">
        <ShipImg onClick={handleDockOrOrbiting} status={status} ship={ship}/>
        <div className="space-y-4">
            <h3 className="font-medium">{ship.symbol}</h3>
            {!ship.cargo.inventory.length ? <span className="inline-block text-xs bg-stone-500 px-2 py-1 rounded-full">No cargo</span> : ship.cargo.inventory.map((item, i) => <span key={i}>{item.name}</span>)}
        </div>
        <div ref={ref} className="relative ml-auto">
            <button onClick={handleOpenDropdown} className="btn-color hover:btn-color-hover text-xs/[1rem]">COMMAND</button>

            {isDropDownOpen && <div className="z-50 rounded-lg absolute right-0 top-10 flex flex-col w-28 bg-stone-700 divide-y divide-stone-500 overflow-hidden">
                <button onClick={handleOpenWindow} className="text-xs text-left p-3 hover:bg-stone-600">Travel</button>
                <button className="text-xs text-left p-3 hover:bg-stone-600">Buy</button>
                <button className="text-xs text-left p-3 hover:bg-stone-600">Sell</button>
            </div>}
        </div>
        
        {isWindowOpen && <>
            <TravelWindow onNavigation={setIsWindowOpen} ship={ship} departureSymbol={ship.nav.waypointSymbol} waypoints={system}/>
            <Overlay onClose={setIsWindowOpen}/>
        </>}
    </li>
}