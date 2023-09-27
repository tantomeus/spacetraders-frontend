"use client";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useAccount } from "@/context/AccountContext";
import { getSystems } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SystemItem from "@/components/SystemItem";
import SkeletonLoader from "@/components/SkeletonLoader";

const TOTAL = 12000;
const PER_PAGE = 20;
const MAX_PAGES = TOTAL / PER_PAGE;

const errorMessage = "I missed the part where that's my problem";

export default function Systems() {
  const [systems, setSystems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [controlledSystem, setControlledSystem] = useState("");
  const [controlledPage, setControlledPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { account, notify } = useAccount();
  const router = useRouter();

  function handleChangeInputPage(e) {
    if (e.target.value <= 0) return setControlledPage(0);
    if (e.target.value >= MAX_PAGES) return setControlledPage(MAX_PAGES);
    if (!isNaN(+e.target.value)) setControlledPage(+e.target.value);
  }

  function handleSubmitPage(e) {
    e.preventDefault();
    if (controlledPage <= 0) return;
    setCurrentPage(controlledPage);
  }

  function handleSubmitSystem(e) {
    e.preventDefault();
    router.push(`systems/${controlledSystem}`);
  }

  useEffect(() => {
    async function fetchData(page) {
      setIsLoading(true);
      const arr = [];

      for (let i = (page - 1) * (PER_PAGE / 20) + 1; i <= page * (PER_PAGE / 20); i++) {
        arr.push(i);
      }

      try {
        const data = await Promise.all(arr.map((item) => getSystems(account.token, item)));
        if (!data) throw new Error(errorMessage);
        setSystems(data.flat(Infinity));
      } catch (err) {
        notify(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData(currentPage);
  }, [account.token, currentPage]);

  return <section>
    <div className="uppercase flex gap-4 mb-2">
        <span>page: {currentPage}</span>
        <span>pages: {MAX_PAGES}</span>
        <span>on page: {PER_PAGE}</span>
        <span>total systems: {TOTAL}</span>

        <form onSubmit={handleSubmitPage}>
          <label>
            <span>Go to: </span>
            <input value={controlledPage} onChange={handleChangeInputPage}
            className="input w-16 text-center"/>
          </label>
        </form>

        <form className="ml-auto" onSubmit={handleSubmitSystem}>
          <label>
            <span>Find a system: </span>
            <input onChange={(e) => setControlledSystem(e.target.value)}
            value={controlledSystem}
            className="input w-28 text-center"/>
          </label>
        </form>

    </div>

    <ul className="space-y-5">
      {isLoading && ["", "", "", ""].map((_, i) => <SkeletonLoader key={i}/>)}

      {!isLoading && systems?.map((data) => <SystemItem key={data.symbol} system={data}/>)}
    </ul>

    {!!systems.length && <div className="flex-between mt-12">
      {currentPage > 1
      ? <button onClick={() => setCurrentPage(page => page > 1 ? page - 1 : page)}>
          <AiOutlineLeft className="h-12 w-12 hover:fill-amber-600"/>
        </button>
      : <span></span>}

      {currentPage < MAX_PAGES
      ? <button onClick={() => setCurrentPage(page => page < MAX_PAGES ? page + 1 : page)}>
          <AiOutlineRight className="h-12 w-12 hover:fill-amber-600"/>
        </button>
      : <span></span>}
    </div>}
  </section>
}