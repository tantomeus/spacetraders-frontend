"use client";

import SystemItem from "@/components/SystemItem";
import { useAccount } from "@/context/AccountContext";
import { getSystems } from "@/services/api";
import { useEffect, useState } from "react";

export default function Systems() {
  const [systems, setSystems] = useState([]);
  const { account } = useAccount();

  useEffect(() => {
    async function fetching() {
      const data = await getSystems(account.token);
      setSystems(data);
    }
    fetching();
  }, [account.token]);

  return <section>
    <ul className="space-y-5">
      {systems?.map((data) => <SystemItem key={data.symbol} system={data}/>)}
    </ul>
  </section>
}