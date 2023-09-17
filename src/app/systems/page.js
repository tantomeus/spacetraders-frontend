"use client";

import SystemItem from "@/components/SystemItem";
import { useAccount } from "@/context/AccountContext";
import { getSystems } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TOTAL = 12000;
const PER_PAGE = 60;
const MAX_PAGES = TOTAL / PER_PAGE;

export default function Systems() {
  const [systems, setSystems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [controlledSystem, setControlledSystem] = useState("");
  const [controlledPage, setControlledPage] = useState(1);
  const router = useRouter();
  const { account } = useAccount();

  useEffect(() => {
    async function fetching(page) {
      const arr = [];
      for (let i = (page - 1) * (PER_PAGE / 20) + 1; i <= page * (PER_PAGE / 20); i++) {
        const {data} = await getSystems(account.token, i);
        arr.push(data);
      }
      setSystems(arr.flat());
    }
    fetching(currentPage);
  }, [account.token, currentPage]);

  return <section>
    <div className="uppercase flex gap-4 mb-2">
        <span>page: {currentPage}</span>
        <span>pages: {MAX_PAGES}</span>
        <span>on page: {PER_PAGE}</span>
        <span>total systems: {TOTAL}</span>
        <form onSubmit={(e) => {
          e.preventDefault();
          setCurrentPage(controlledPage);
        }}>
          <label>
            <span>Go to: </span>
            <input value={controlledPage} onChange={(e) => {
              if (e.target.value <= 1) return setControlledPage(1);
              if (e.target.value >= MAX_PAGES) return setControlledPage(MAX_PAGES);
              if (!isNaN(+e.target.value)) setControlledPage(+e.target.value);
            }} className="bg-transparent border-stone-700 border rounded-md px-3 w-16 text-center"/>
          </label>
        </form>
        <form className="ml-auto" onSubmit={(e) => {
          e.preventDefault();
          router.push(`systems/${controlledSystem}`);
        }}>
          <label>
            <span>Find a system: </span>
            <input onChange={(e) => setControlledSystem(e.target.value)} value={controlledSystem} className="bg-transparent border-stone-700 border rounded-md px-3 w-28 text-center"/>
          </label>
        </form>
    </div>

    <ul className="space-y-5">
      {systems?.map((data) => <SystemItem key={data.symbol} system={data}/>)}
    </ul>
  </section>
}