"use client";

import { useAccount } from "@/context/AccountContext";
import { getContracts, negotiateContract } from "@/services/api";
import { useEffect, useState } from "react";

import ContractItem from "@/components/ContractItem";
import SkeletonLoader from "@/components/SkeletonLoader";

const errorMessage = "I missed the part where that's my problem";

export default function Contracts() {
    const { account, ships, notify } = useAccount();
    const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const shipOnHeadquarter = ships.find(ship => ship.nav.waypointSymbol === account.headquarters && ship.nav.status === "DOCKED");

    async function handleGetContracts() {
      try {
        const data = negotiateContract(account.token, shipOnHeadquarter.symbol);
        if (!data) throw new Error(errorMessage);
        setContracts(contract => [data.contract, ...contract]);
      } catch(err) {
        notify(err.message);
      }
    }

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await getContracts(account.token);
            if (!data) throw new Error(errorMessage);
            setContracts(data);
          } catch(err) {
            notify(err.message);
          } finally {
            setIsLoading(false);
          }
        }
        fetchData();
      }, [account.token, notify]);

    return <section>

      {!isLoading && !contracts.length && 
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
        {isLoading && ["", ""].map((_, i) => <SkeletonLoader key={i}/>)}

        {!!contracts.length && !isLoading && contracts.map((contract) => <ContractItem key={contract.id}
        token={account.token} contract={contract}/>)}
      </ul>
    </section>
}