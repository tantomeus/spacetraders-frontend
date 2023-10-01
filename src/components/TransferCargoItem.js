"use client";

import { useEffect, useState } from "react";
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useAccount } from "@/context/AccountContext";
import { transferCargo } from "@/services/fleet";

export default function TransferCargoItem({ ship, direction = "left", secondShip, setSelectedShip }) {
    const [amount, setAmount] = useState(0);
    const [selected, setSelected] = useState({});
    const { account, ships, setShips, notify } = useAccount();

    const isLimitExceeded = secondShip.cargo.units + amount <= secondShip.cargo.capacity;
    const isTransitAllowed = amount && Object.keys(selected) && isLimitExceeded;
    const isRight = direction === "right";

    const style = {
        position: "absolute",
        [isRight ? "left" : "right"]: "-62%",
        top: "50%",
        transform: "translateY(-50%)"
    };

    function setCargoSelected(item) {
        const foundCargo = item.cargo.inventory.find(thing => thing.symbol === selected.symbol);

        if (foundCargo) {
            return {
                ...item, cargo: {
                ...item.cargo,
                units: +item.cargo.units + amount,
                inventory: item.cargo.inventory.map((cargo) => foundCargo.symbol === cargo.symbol ? 
                {...cargo, units: +cargo.units + amount} : cargo)
            }}
        }
        
        return {...item, cargo: {
            ...item.cargo,
            units: +item.cargo.units + amount,
            inventory: [...item.cargo.inventory, {...selected, units: amount}]
        }}
    }

    async function handleTransfer() {
        try {
            const data = await transferCargo(account.token, ship.symbol, secondShip.symbol, selected.symbol, amount);
            setShips((ships) => ships.map((item) => {
                if (ship.symbol === item.symbol) return {...item, cargo: data.cargo};
                if (secondShip.symbol === item.symbol) return setCargoSelected(item);
                return item;
            }));
            setAmount(0);
        } catch(err) {
            notify(err.message);
        }
    }

    function handleSelect(item) {
        if (selected.symbol !== item.symbol) {
            setSelected(item);
            setAmount(0);
        } else {
            setSelected({});
            setAmount(0);
        }
    }

    function handleChangeAmount(e) {
        setAmount(+e.target.value);
    }

    useEffect(() => {
        setSelectedShip((ship) => ships.find((item) => item.symbol === ship.symbol));
    }, [ships, setSelectedShip]);


    return (
    <div style={{direction: isRight ? "rtl" : "ltr"}}
    className="window-divide">

        <div className={`relative flex-between ${isRight ? "pr-4" : "pl-4"} py-2`}>
            <h3 className="text-lg">{ship.symbol}</h3>

            <span
            className={`${isLimitExceeded ? "" : "text-red-700"}`}
            style={style}>
                {secondShip.cargo.units + amount}/{secondShip.cargo.capacity}
            </span>

            <button
            className={`btn ${isTransitAllowed ? "btn-color hover:btn-color-reversed" : "disable-color" }`}
            disabled={!isTransitAllowed}
            onClick={handleTransfer}>
                {!isRight && <BiArrowToRight className="icon-size-primary"/>}
                {isRight && <BiArrowToLeft className="icon-size-primary"/>}
            </button>
        </div>

        <ul className="h-overflow">
            {ship.cargo.inventory.map((item) => {
                const isSelected = selected.symbol === item.symbol;

                return (
                <li
                className="flex flex-col justify-center gap-2 py-2 px-6 h-16 item-hover-color"
                key={item.symbol}>

                    <button onClick={() => handleSelect(item)}
                    className="flex-between w-full">
                        <span>{item.name}</span>
                        {!isSelected && <AiOutlineDown/>}
                        {isSelected && <AiOutlineUp/>}
                    </button>

                    {isSelected && <div className="flex-between gap-4">
                        <span>{item.units - amount}</span>
                        <input className="cursor-pointer w-full" value={amount}
                        onChange={handleChangeAmount} name="amount" min={0} max={item.units} type="range"/>
                        <span>{amount}</span>
                    </div>}

                </li>)
            })}
        </ul>
    </div>)
}