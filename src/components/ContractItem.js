"use client";

import { acceptContract } from "@/services/api";
import { useState } from "react";

export default function ContractItem({ contract, token }) {
    const [isAccepted, setIsAccepted] = useState(false);

    function formatDate(date) {
        const formated =  date.split("T")[0].split("-");
        return `${formated[2]}.${formated[1]}.${formated[0]}`;
    }

    async function handleAccept(token, contract) {
        const data = await acceptContract(token, contract);
        setIsAccepted(true);
    }

    return <li className="bg-stone-900 p-5 rounded-3xl">
        <div className="flex items-center">
            <div className="grow">
                <hr className="opacity-50"/>
            </div>
            <h2 className="px-3 text-xl font-semibold">{contract.type}</h2>
            <div className="grow">
                <hr className="opacity-50"/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-y-3 mt-3 uppercase">
            <div><h3 className="text-xs opacity-50">trade</h3>{contract.terms.deliver[0].tradeSymbol.replaceAll("_", " ")}</div>
            <div><h3 className="text-xs opacity-50">destination</h3>{contract.terms.deliver[0].destinationSymbol}</div>
            
            {
            contract.accepted || isAccepted && <>
            <div><h3 className="text-xs opacity-50">units require</h3>{contract.terms.deliver[0].unitsRequired}</div>
            <div><h3 className="text-xs opacity-50">units fulfilled</h3>{contract.terms.deliver[0].unitsFulfilled}</div>
            </>
            }

            <div><h3 className="text-xs opacity-50">accept</h3>{contract.terms.payment.onAccepted} credits</div>
            <div><h3 className="text-xs opacity-50">fulfill</h3>{contract.terms.payment.onFulfilled} credits</div>
        </div>
        <div className="flex items-center">
            <div>{contract.accepted || isAccepted ? formatDate(contract.terms.deadline) : formatDate(contract.expiration)}</div>
            <div className="grow px-3"><hr className="opacity-50"/></div>
            {contract.accepted || isAccepted ? <span className="text-amber-600 text-xl p-2">&#10003; accepted</span> : <button onClick={() => handleAccept(token, contract.id)} className="bg-amber-600 text-xl p-2">Accept</button>}
        </div>
    </li>
}
