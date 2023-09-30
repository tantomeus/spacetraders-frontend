"use client";

import { useAccount } from "@/context/AccountContext";
import { negotiateContract } from "@/services/api";

import ContractItem from "@/components/ContractItem";

export default function Contracts() {
    const { account, ships, contracts, fetchContract } = useAccount();

    const shipOnHeadquarter = ships.find(ship => ship.nav.waypointSymbol === account.headquarters && ship.nav.status === "DOCKED");

    function handleGetContracts() {
        negotiateContract(account.token, shipOnHeadquarter.symbol);
        fetchContract(account.token);
    }

    return <section>

      {!contracts.length && 
      <div className="bg-stone-900 p-5 rounded-3xl w-[50%] mx-auto flex flex-col text-center gap-4">
        <p className="text-2xl">You have no available contracts</p>

        <p>To get a new contract, you need a docked ship at your faction headquarters</p>

        <div className="flex-between gap-2">
          <div className="grow bg-amber-600 h-[2px]"></div>
          <span className="text-amber-600"> {account.headquarters}</span>
          <div className="grow bg-amber-600 h-[2px]"></div>
        </div>

        <button
        onClick={handleGetContracts}
        disabled={!shipOnHeadquarter}
        className={`btn ${shipOnHeadquarter ? "btn-color hover:btn-color-reversed" : "disable-color"}`}>
          GET CONTRACT
        </button>
      </div>}

      <ul className="grid grid-cols-2	gap-6">
        {!!contracts.length && contracts.map((contract) => <ContractItem key={contract.id}
        token={account.token} contract={contract}/>)}
      </ul>
    </section>
}