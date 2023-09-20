"use client";

import { useState } from "react";
import ShipImg from "./ShipImg";
import TransferCargoItem from "./TransferCargoItem";

export default function TransferCargo({ ship, secondShip }) {

    return <div className="window window-divide w-[40rem]">
        <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl">Transfer</h2>
        </div>

        <div className="grid grid-cols-[1fr_2rem_1fr] p-4">
            <TransferCargoItem ship={ship}/>
            <div></div>
            <TransferCargoItem ship={ship}/>
        </div>
    </div>
}