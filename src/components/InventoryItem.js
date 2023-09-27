import { GiRefinery } from "react-icons/gi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { TiCancel } from "react-icons/ti";
import { useState } from "react";
import { jettison, refine } from "@/services/api";
import { useAccount } from "@/context/AccountContext";

const errorMessage = "I missed the part where that's my problem";

export default function InventoryItem({ ship, item, isRefineAvailable }) {
    const [targetedItem, setTargetedItem] = useState("");
    const [amount, setAmount] = useState(0);
    const { account, setShips, notify } = useAccount();

    async function handleRefine(resource) {
        try {
            const data = await refine(account.token, ship.symbol, resource);

            if (!data) throw new Error(errorMessage);

            setShips((ships) => ships.map((item) => ship.symbol === item.symbol
            ? {...item, fuel: data.fuel}
            : item));
        } catch(err) {
            notify(err.message);
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
    <li
    className="grid grid-cols-[1fr_0.7fr_5.5rem] gap-2 rounded-primary text-sm white-border p-2 item-hover-color">
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
    </li>)
}