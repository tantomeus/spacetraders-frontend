"use client";

import { useAccount } from "@/context/AccountContext";
import { dockOrOrbit } from "@/services/fleet";
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
import Dropdown from "./Dropdown";
import Trade from "./Trade";


export default function ShipItem({ ship, system }) {
    const remainingTravel = useMemo(() => {
        return Math.trunc((new Date(ship.nav.route.arrival) - new Date()) / 1000);
    }, [ship.nav.route.arrival]);

    const remainingMine = useMemo(() => {
        return ship.cooldown.remainingSeconds;
    }, [ship.cooldown.remainingSeconds]);

    const [secondsTravel, setSecondsTravel] = useState(remainingTravel);
    const [secondsMine, setSecondsMine] = useState(remainingMine);

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    // travel, flightInfo, inventory, mining, transfer, deliver
    const [openedWindow, setOpenedWindow] = useState("");
    const { account, setShips, fetchShipsData, notify, contracts} = useAccount();
    const ref = useRef(null);

    const waypoint = system?.find((waypoint) => ship.nav.waypointSymbol === waypoint.symbol);
    const status = ship.nav.status;
    const shipHasMineModule = ship.modules.find(module => module.symbol.includes("MINERAL"));
    const canCarryCargo = ship.cargo.capacity > 0;
    const contract = contracts?.[0] || {};
    const hasContractCargo =  ship.cargo.inventory?.find(item => item.symbol === contract.terms.deliver[0].tradeSymbol);
    const isContractTermsComplied = contract.accepted && hasContractCargo && ship.nav.waypointSymbol === contract.terms.deliver[0].destinationSymbol;

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
            setShips((ships) => ships.map(item => item.symbol == ship.symbol ? {
                ...item, nav: data.nav
            } : item));
        } catch(err) {
            notify(err.message);
        }
    }

    useEffect(() => {
        setSecondsMine(remainingMine);
    }, [remainingMine]);

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
                setSecondsTravel((time) => time - 1);
            }, 1000);

            setTimeout(() => {
                fetchShipsData(account.token);
            }, remainingTravel * 1000);

            return function() {
                clearInterval(interval);
            }
        }
    }, [remainingTravel, status, account.token, fetchShipsData]);

    useEffect(() => {
        if (remainingMine > 0) {
            const interval = setInterval(() => {
                setSecondsMine(seconds => seconds - 1);
            }, 1000);

            setTimeout(() => {
                fetchShipsData(account.token);
            }, remainingMine * 1000);
        
            return function() {
                clearInterval(interval);
            }
        }
    }, [fetchShipsData, account.token, remainingMine, ship.symbol, setShips]);

    
    if (status === "IN_TRANSIT") return (
    <li className="flex items-center gap-6 item-hover-color p-4 rounded-primary">

        <ShipImg status={status} ship={ship}/>

        <div className="space-y-4">
            <div className="flex gap-2 items-center text-md">
                <h3>{ship.symbol}</h3>
                &bull;
                <span>{ship.frame.name.replace("Frame ", "")}</span>
            </div>

            {canCarryCargo && <button onClick={() => handleOpenWindow("inventory")}
            className="text-xs px-2 py-1 rounded-full uppercase bg-stone-600 hover:bg-stone-500">
                inventory
            </button>}
        </div>

        <button onClick={() => handleOpenWindow("flightInfo")}
        className="ml-auto btn btn-color hover:btn-color-reversed text-xs/[1rem]">VIEW FLIGHT</button>

        {openedWindow === "flightInfo" && createPortal(<>
            <FlightWindow ship={ship} seconds={secondsTravel}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "inventory" && createPortal(<>
            <Inventory ship={ship} remainingSeconds={secondsMine}/>
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

            {canCarryCargo && <button onClick={() => handleOpenWindow("inventory")}
            className="text-xs px-2 py-1 rounded-full uppercase bg-stone-600 hover:bg-stone-500">
                inventory
            </button>}
        </div>

        <div ref={ref} className="relative ml-auto">
            <button onClick={handleToggleDropdown}
            className="btn btn-color hover:btn-color-reversed text-xs/[1rem]">
                COMMAND
            </button>

            {isDropDownOpen && 
            <Dropdown options={[
                {name: "Travel", handler: () => handleOpenWindow("travel")},
                {name: canCarryCargo && shipHasMineModule ? "Mine" : "", handler: () => handleOpenWindow("mining")},
                {name: canCarryCargo ? "Transfer" : "", handler: () => handleOpenWindow("transfer")},
                {name: canCarryCargo && isContractTermsComplied ? "Deliver" : "", handler: () => handleOpenWindow("deliver")},
            ]}/>}
        </div>

        {openedWindow === "deliver" && createPortal(<>
            <Trade heading="Deliver"
            selectedGoods={{name: hasContractCargo.name, symbol: hasContractCargo.symbol, tradeVolume: hasContractCargo.units}}
            selectedShip={ship}
            setSelectedGoods={setOpenedWindow}
            status="deliver"/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "travel" && createPortal(<>
            <TravelWindow onNavigation={setOpenedWindow} ship={ship} waypoints={system}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "inventory" && createPortal(<>
            <Inventory waypoint={waypoint} ship={ship} remainingSeconds={secondsMine}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "mining" && createPortal(<>
            <Mining ship={ship} waypoint={waypoint} remainingSeconds={secondsMine}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}

        {openedWindow === "transfer" && createPortal(<>
            <TransferCargo ship={ship} waypoint={waypoint}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)}
    </li>)
}