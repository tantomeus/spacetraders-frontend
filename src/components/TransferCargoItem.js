"use client";

import { useState } from "react";
import ShipImg from "./ShipImg";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

export default function TransferCargoItem({ ship }) {
    const [amount, setAmount] = useState(0);
    const [selected, setSelected] = useState("");

    function handleChangeAmount(e) {
        setAmount(e.target.value);
    }

    function handleSelect(item) {
        if (selected !== item.symbol) return setSelected(item.symbol);
        setSelected("");
        setAmount(0);
    }

    return <div className="window-divide border border-stone-50 grow">
        <div className="flex justify-between p-4">
            <h3 className="text-lg">{ship.symbol}</h3>
            <ShipImg ship={ship}/>
        </div>
        <ul className="max-h-[60vh]">
            {ship.cargo.inventory.map((item) => {
                const isSelected = selected === item.symbol;

                return <li className="py-2 px-6 hover:bg-stone-800" key={item.symbol}>
                    <button onClick={() => handleSelect(item)}
                    className="flex justify-between items-center w-full">
                        <span>{item.name}</span>
                        {!isSelected && <AiOutlineDown/>}
                        {isSelected && <AiOutlineUp/>}
                    </button>
                    {selected === item.symbol && <div className="flex justify-between items-center gap-4">
                        <span>{item.units - amount}</span>
                        <input className="w-full" value={amount} onChange={handleChangeAmount} name="amount" min={0} max={item.units} type="range"/>
                        <span>{amount}</span>
                    </div>}
                </li>
            })}
        </ul>
    </div>
}