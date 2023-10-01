"use client";

import { useAccount } from "@/context/AccountContext";
import { formatDate } from "@/helpers/helpers";
import { acceptContract } from "@/services/contracts";

export default function ContractItem({ contract, token }) {
    const { setAccount, notify, fetchContracts } = useAccount();

    async function handleAccept(type) {
        try {
            const data = await acceptContract(token, contract.id, type);
            setAccount((account) => ({...account, credits: data.agent.credits}));
            fetchContracts(token);
        } catch(err) {
            notify(err.message);
        }
    }

    return (
    <li className="bg-stone-900 p-5 rounded-3xl">
        <div className="flex items-center">
            <hr className="opacity-50 grow"/>
            <h2 className="px-3 text-xl font-semibold">{contract.type}</h2>
            <hr className="opacity-50 grow"/>
        </div>

        <div className="grid grid-cols-2 gap-y-3 mt-3 uppercase">
            <div>
                <h3 className="text-xs opacity-50">trade</h3>
                <span>{contract.terms.deliver[0].tradeSymbol.replaceAll("_", " ")}</span>
            </div>

            <div>
                <h3 className="text-xs opacity-50">destination</h3>
                <span>{contract.terms.deliver[0].destinationSymbol}</span>
            </div>
            
            {contract.accepted && <>
            <div>
                <h3 className="text-xs opacity-50">units require</h3>
                <span>{contract.terms.deliver[0].unitsRequired}</span>
            </div>

            <div>
                <h3 className="text-xs opacity-50">units fulfilled</h3>
                <span>{contract.terms.deliver[0].unitsFulfilled}</span>
            </div>
            </>}

            <div>
                <h3 className="text-xs opacity-50">accept</h3>
                <span>{contract.terms.payment.onAccepted} credits</span>
            </div>

            <div>
                <h3 className="text-xs opacity-50">fulfill</h3>
                <span>{contract.terms.payment.onFulfilled} credits</span>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <div>{contract.accepted
            ? formatDate(contract.terms.deadline)
            : formatDate(contract.expiration)}</div>

            <hr className="opacity-50 grow"/>

            {contract.accepted
            ? <button disabled={!contract.fulfilled} onClick={() => handleAccept("fulfill")}
            className={`btn ${contract.fulfilled ? "btn-color hover:btn-color-reversed" : "disable-color"} text-xl`}>
                fulfill
            </button>
            : <button onClick={() => handleAccept("accept")}
            className="btn btn-color hover:btn-color-reversed text-xl">
                Accept
            </button>}
        </div>
    </li>)
}