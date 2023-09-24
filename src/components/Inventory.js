"use client";

import { jettison, refine, refuelShip } from "@/services/api";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiRefinery } from "react-icons/gi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import { useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { convertSeconds } from "@/helpers/helpers";

export default function Inventory({ ship, waypoint, remainingSeconds }) {
    const { account, setAccount, setShips } = useAccount();
    const [targetedItem, setTargetedItem] = useState("");
    const [amount, setAmount] = useState(0);

    const waypointHasMarketplace = waypoint?.traits.find(trait => trait.symbol.includes("MARKETPLACE"));
    const isShipDocked = ship.nav.status ==="DOCKED";
    const isFuelFull = !(ship.fuel.capacity - ship.fuel.current);
    const shipHasRefinery = ship.modules.find(module => module.symbol.includes("REFINERY"));

    const resourcesRefine = [
        "COPPER_ORE",
        "SILVER_ORE",
        "GOLD_ORE",
        "ALUMINUM_ORE",
        "PLATINUM_ORE",
        "URANITE_ORE",
        "MERITIUM_ORE",
        "IRON_ORE",
        "FUEL"
    ];

    const isRefuelAvailable = waypointHasMarketplace && !isFuelFull && isShipDocked;

    async function handleRefuel() {
        try {
            const data = await refuelShip(account.token, ship.symbol);

            if (!data) throw new Error('eheh');

            setShips((ships) => ships.map((item) => ship.symbol === item.symbol
            ? {...item, fuel: data.fuel}
            : item));
            setAccount((account) => ({...account, credits: data.agent.credits}));
        } catch(err) {
            console.error(err);
        }
    }

    async function handleRefine(resource) {
        try {
            const data = await refine(account.token, ship.symbol, resource);

            if (!data) throw new Error('eheh');

            setShips((ships) => ships.map((item) => ship.symbol === item.symbol
            ? {...item, fuel: data.fuel}
            : item));
        } catch(err) {
            console.error(err);
        }
    }

    async function handleJettison(e, resource, units) {
        e.preventDefault();
        try {
            const data = await jettison(account.token, ship.symbol, resource, units);

            if (!data) throw new Error('eheh');

            setShips((ships) => ships.map((item) => ship.symbol === item.symbol
            ? {...item, cargo: data.cargo}
            : item));

            setTargetedItem("");
            setAmount(0);
        } catch(err) {
            console.error(err);
        }
    }

    return (
    <div className="window window-divide w-[30rem]">
        <div className="flex-between p-4">
            <h2 className="text-2xl">Inventory</h2>
            {!!remainingSeconds && <span>{convertSeconds(remainingSeconds)}</span>}
        </div>

        <div>
            <div className="flex-between rounded-primary p-4">
                <span>FUEL: {ship.fuel.current}/{ship.fuel.capacity}</span>

                <button disabled={!isRefuelAvailable}
                onClick={handleRefuel}
                className={`btn ${!isRefuelAvailable ?
                "disable-color" :
                "btn-color hover:btn-color-reversed"}`}>
                    <BsFillFuelPumpFill className="icon-size-primary"/>
                </button>
            </div>

            <ul className="pb-4 px-4 space-y-4 h-overflow">
                <li className="flex items-center">
                    <hr className="grow"/>
                    <span className="px-2">{ship.cargo.units}/{ship.cargo.capacity}</span>
                    <hr className="grow"/>
                </li>

                {ship.cargo.inventory.map((item) => {
                    const isRefineAvailable = resourcesRefine.includes(item.symbol)
                    && !remainingSeconds
                    && shipHasRefinery;

                    return (
                    <li
                    className="grid grid-cols-[1fr_0.7fr_5.5rem] gap-2 rounded-primary text-sm white-border p-2 item-hover-color"
                    key={item.symbol}>
                        <div className="flex items-center gap-2">
                            <span className="">{item.name}</span>
                            <hr className="grow"/>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="bg-stone-500 px-3 py-1 rounded-primary min-w-[2.5rem] text-center">
                                {item.units}
                            </span>
                            <hr className="grow"/>
                        </div>

                        <div className="flex justify-between">
                            <button disabled={!isRefineAvailable}
                            onClick={() => handleRefine(item.symbol.replace("_ORE", ""))}
                            className={`btn ${!isRefineAvailable
                            ? "disable-color"
                            : "btn-color hover:btn-color-reversed"}`}>
                                <GiRefinery className="h-6 w-6"/>
                            </button>

                            {targetedItem !== item.symbol &&
                            <button onClick={() => setTargetedItem(item.symbol)}
                            className="btn btn-color hover:btn-color-reversed">
                                <BiSolidTrashAlt className="h-6 w-6"/>
                            </button>}

                            {targetedItem === item.symbol &&
                            <button onClick={() => {
                                setTargetedItem("");
                                setAmount(0);
                            }} className="btn btn-color hover:btn-color-reversed">
                                <TiCancel className="h-6 w-6"/>
                            </button>}
                        </div>

                        {targetedItem === item.symbol &&
                        <form
                        onSubmit={(e) => handleJettison(e, targetedItem, amount)}
                        className="col-span-full flex justify-between gap-4">
                            <input value={amount} onChange={(e) => {
                                if (!isNaN(+e.target.value)) setAmount(+(e.target.value));
                                if (e.target.value > item.units) setAmount(+item.units);
                            }} placeholder="Amount" className="grow input py-3"/>
                            <button className="btn btn-color hover:btn-color-reversed">jettison</button>
                        </form>}
                    </li>)}
                )}
            </ul>
        </div>
    </div>)
}