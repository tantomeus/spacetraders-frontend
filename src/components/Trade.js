import { useAccount } from "@/context/AccountContext";
import { trade } from "@/services/api";
import BackButton from "./BackButton";
import { useState } from "react";

export default function Trade({ heading, selectedGoods, selectedShip, setSelectedShip, setSelectedGoods, status }) {
    const [amount, setAmount] = useState(0);
    const { setAccount, account, notify, setShips } = useAccount();

    async function handleTrade() {
        try {
            const data = await trade(account.token, selectedShip.symbol, selectedGoods.symbol, amount, status);
            if (!data) throw new Error(errorMessage);
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