import { useAccount } from "@/context/AccountContext";
import { useState } from "react";
import { deliverCargo } from "@/services/fleet";
import { trade } from "@/services/trading";

import BackButton from "./BackButton";

export default function Trade({ heading, selectedGoods, selectedShip, setSelectedShip, setSelectedGoods, status }) {
    const [amount, setAmount] = useState(0);
    const { setAccount, account, notify, setShips, fetchContracts, contracts } = useAccount();

    async function handleTrade() {
        try {
            const data = await trade(account.token, selectedShip.symbol, selectedGoods.symbol, amount, status);
            setAccount((account) => ({...account, credits: data.agent.credits}));
            setSelectedShip((ship) => ({...ship, cargo: data.cargo}));
            setShips((ships) => ships.map((ship) => ship.symbol === selectedShip.symbol
            ? {...ship, cargo: data.cargo}
            : ship));
            setSelectedGoods({});
        } catch (err) {
            notify(err.message);
        }
    }

    function handleInputChange(e) {
        const space = status === "sell"
        ? selectedGoods.tradeVolume
        : selectedShip.cargo.capacity - selectedShip.cargo.units ;
        const min = Math.floor(Math.min((account.credits / selectedGoods.purchasePrice), space));
        
        if (!isNaN(+e.target.value)) setAmount(+(e.target.value));
        if (e.target.value * selectedGoods.purchasePrice > account.credits || e.target.value > space) {
            setAmount(min);
        }
    }

    async function handleDeliver() {
        try {
            const data = await deliverCargo(account.token, contracts[0].id, selectedShip.symbol,  selectedGoods.symbol, amount);
            fetchContracts(account.token);
            setShips((ships) => ships.map((ship) => ship.symbol === selectedShip.symbol
            ? {...ship, cargo: data.cargo}
            : ship));
            setSelectedGoods("");
        } catch(err) {
            notify(err.message);
        }
    }

    if (status === "deliver") {
        const unitsLeft = contracts[0].terms.deliver[0].unitsRequired - contracts[0].terms.deliver[0].unitsFulfilled;

        function handleInputChangeDeliver(e) {
            if (!isNaN(+e.target.value)) setAmount(+(e.target.value));
            if (e.target.value > unitsLeft) setAmount(unitsLeft);
            if (e.target.value > selectedGoods.tradeVolume) setAmount(selectedGoods.tradeVolume);
        }

        return (
        <div className="window window-divide w-[30rem]">
            <div className="flex-between px-6 py-4 text-2xl">
                <h2>{heading}</h2>
            </div>

            <div className="p-4">
                <div className="flex-between bg-stone-700 px-4 py-2 rounded-primary">
                    <div>
                        <span className="block">{selectedGoods.name}</span>
                        <span className="block">{selectedGoods.tradeVolume} Available to {status}</span>
                    </div>
                    <span>{unitsLeft} units left</span>
                </div>

                <div className="mt-4">
                    <input value={amount} onChange={handleInputChangeDeliver} placeholder="Amount"
                    className="grow input py-3 w-full"/>
                </div>
            </div>

            <div className="flex justify-between px-4 py-4">
                <button onClick={handleDeliver}
                className="btn btn-color hover:btn-color-reversed">
                    deliver {amount} units
                </button>
            </div>
        </div>
    )}

    return (
        <div className="window window-divide w-[30rem]">
        <div className="flex-between px-6 py-4 text-2xl">
            <h2>{heading}</h2>
        </div>

        <div className="p-4">
            <div className="flex-between bg-stone-700 px-4 py-2 rounded-primary">
                <div>
                    <span className="block">{selectedGoods.name}</span>
                    <span className="block">{selectedGoods.tradeVolume} Available to {status}</span>
                </div>
                <span>{selectedGoods.price} CREDITS</span>
            </div>

            <div className="mt-4">
                <input value={amount} onChange={handleInputChange} placeholder="Amount"
                className="grow input py-3 w-full"/>
            </div>
        </div>

        <div className="flex justify-between px-4 py-4">
            <BackButton onClick={() => setSelectedGoods({})}/>
            <button onClick={handleTrade}
            className="btn btn-color hover:btn-color-reversed">
                {status} FOR {amount * selectedGoods.price} CREDITS
            </button>
        </div>
    </div>
    )
}