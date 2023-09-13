"use client";

import { useAccount } from "@/context/AccountContext";
import { purchaseShip } from "@/services/api";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"
import ShipImg from "./ShipImg";

export default function ShipyardItem({ ship, waypoint }) {
    const { account, setAccount } = useAccount();
    const [descriptionHidden, setDescriptionHidden] = useState(true);

    function handlePurchase(token, type, waypoint, price) {
        purchaseShip(token, type, waypoint);
        setAccount((acc) => ({...acc, credits: acc.credits - price}))
    }

    return <li>
        <div className="border-solid border border-stone-500 rounded-md text-sm p-4 space-y-4">

            <div className="flex justify-between items-center gap-2">
                <ShipImg ship={ship}/>
                <h3 className="text-lg">{ship.name}</h3>
            </div>

            <hr className="grow opacity-50"/>

            <div className="flex flex-col items-start">
                <p className={descriptionHidden ? "overflow-hidden h-5" : ""}>{ship.description}</p>
                {descriptionHidden && <span>...</span>}
                <button className="flex items-center justify-center w-full text-md mt-2" onClick={() => setDescriptionHidden(descr => !descr)}>
                    <hr className="grow opacity-50 pr-3"/>
                    {descriptionHidden ? <AiOutlineDown className="text-xl pl-2"/> : <AiOutlineUp className="text-xl pl-2"/>}
                    <span className="pr-2">{descriptionHidden ? "MORE" : "LESS"}</span>
                    <hr className="grow opacity-50 "/>
                </button>
            </div>

            <div className="flex justify-between items-center gap-2">
                <span>Speed</span>
                <hr className="block grow opacity-50"/>
                <span className="bg-stone-500 px-3 py-1 rounded-md text-xs">{ship.engine.speed}</span>
            </div>

            <div className="flex justify-between items-center gap-2">
                <span>Cargo Capacity</span>
                <hr className="block grow opacity-50"/>
                <span className="bg-stone-500 px-3 py-1 rounded-md text-xs">{ship.modules.reduce((acc, val) => acc + (val.name === "Cargo Hold" ? val.capacity : 0), 0)}</span>                        
            </div>

            <div className="flex justify-between items-center gap-2">
                <span>Fuel Capacity</span>
                <hr className="block grow opacity-50"/>
                <span className="bg-stone-500 px-3 py-1 rounded-md text-xs">{ship.frame.fuelCapacity}</span>
            </div>

            <div className="flex justify-between items-center gap-2">
                <span className="bg-stone-500 text-xs/[1rem] p-2 rounded-md">{ship.purchasePrice} CREDITS</span>
                <hr className="block grow opacity-50"/>
                <button onClick={() => handlePurchase(account.token, ship.type, waypoint, ship.purchasePrice)} className="btn-color hover:btn-color-hover text-xs/[1rem]">PURCHASE</button>
            </div>
        </div>
    </li>
}