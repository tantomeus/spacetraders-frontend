"use client";

import { getContracts } from "@/services/contracts";
import { getShips } from "@/services/fleet";
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from 'react-toastify';

import Login from "@/components/Login";

const AccountContext = createContext();

export default function AccountProvider({ children }) {
    const [account, setAccount] = useState({});
    const [ships, setShips] = useState([]);
    const [contracts, setContracts] = useState([]); 

    async function fetchShipsData(token) {
        try {
            const data = await getShips(token);
            setShips(data);
        } catch(err) {
            notify(err.message);
        }
    }

    async function fetchContracts(token) {
        try {
            const data = await getContracts(token);
            setContracts(data);
        } catch(err) {
            notify(err.message);
        }
    }

    function notify(message) {
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
          bodyClassName: "font-speedy"
        });
    };

    useEffect(() => {
        if (account.token) {
            fetchShipsData(account.token);
            fetchContracts(account.token);
        }
      }, [account.token, setShips]);

    return <AccountContext.Provider 
    value={{account, setAccount, ships, setShips, fetchShipsData, fetchContracts, notify, contracts}}>
        {!account.token && <><Login/><div className="z-[500] absolute bg-stone-950 inset-0"></div></>}
        {account.token && children}
    </AccountContext.Provider>
}

export function useAccount() {
    return useContext(AccountContext);
}
