"use client";

import { useState } from "react";
import { useAccount } from "@/context/AccountContext";

import TransferCargoItem from "./TransferCargoItem";
import SelectShip from "./SelectShip";
import BackButton from "./BackButton";

export default function TransferCargo({ ship }) {
    const { ships } = useAccount();
    const [selectedShip, setSelectedShip] = useState({});
    const availableShips = ships.filter(item => ship.symbol !== item.symbol
        && ship.nav.waypointSymbol === item.nav.waypointSymbol
        && ship.nav.status === item.nav.status);

    return (
    <div className="window window-divide w-[50rem]">
        <div className="flex-between p-4">
            <h2 className="text-2xl">Transfer</h2>
        </div>

        {!availableShips.length && <div className="p-4 text-center text-lg">
            <p>No ships available. </p>
            <p>Ships must be in the same status for transfer.</p>
        </div>}

        {!selectedShip.symbol && !!availableShips.length && 
            <ul className="h-overflow p-4 text-xs grid grid-cols-2 gap-4">
                {availableShips.map(item => 
                <SelectShip key={item.symbol} ship={item} onSelect={setSelectedShip}/>)}
            </ul>
        }

        {selectedShip.symbol && <div className="grid grid-cols-[1fr_2rem_1fr]">
            <TransferCargoItem setSelectedShip={setSelectedShip} ship={ship} secondShip={selectedShip}/>
            <span></span>
            <TransferCargoItem setSelectedShip={setSelectedShip} ship={selectedShip} secondShip={ship}
            direction="right"/>
        </div>}

        {selectedShip.symbol && <BackButton onClick={() => setSelectedShip({})}/>}
    </div>)
}