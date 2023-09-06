"use client";

import ContractItem from "@/components/ContractItem";
import { useAccount } from "@/context/AccountContext";
import { getContracts } from "@/services/api";
import { useEffect, useState } from "react";

export default function Contracts() {
    const { account } = useAccount();
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        async function fetching() {
          const data = await getContracts(account.token);
          setContracts(data);
        }
        fetching();
      }, [account.token]);

    return <section>
        <ul className="grid grid-cols-2	gap-6">
            {contracts.map((contract) => <ContractItem key={contract.id} token={account.token} contract={contract}/>)}
        </ul>
    </section>
  }