"use client";

import { getContracts, getShips } from "@/services/api";
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from 'react-toastify';

const AccountContext = createContext();

export default function AccountProvider({ children }) {
    const [account, setAccount] = useState({});
    const [ships, setShips] = useState([]);
    const [contracts, setContracts] = useState([]); 

    async function fetchShipsData(token) {
        try {
            const data = await getShips(token);
            if (!data) throw new Error("that's error maan");
            setShips(data);
        } catch(err) {
            console.error(err);
        }
    }

    async function fetchContracts(token) {
        try {
            const data = await getContracts(token);
            if (!data) throw new Error("that's error maan");
            setContracts(data);
        } catch(err) {
            console.error(err);
        }
    }

    function notify(message) {
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
          bodyClassName: "font-speedy"
        });
    };

    useEffect(() => { 
        fetchShipsData(account.token);
        fetchContracts(account.token);
      }, [account.token, setShips]);

    return <AccountContext.Provider 
        value={{account, setAccount, ships, setShips, fetchShipsData, fetchContracts, notify, contracts}}>
        {children}
    </AccountContext.Provider>
}

export function useAccount() {
    return useContext(AccountContext);
}
