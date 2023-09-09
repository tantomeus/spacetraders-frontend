"use client";

const { createContext, useState, useContext } = require("react");

const AccountContext = createContext();

export default function AccountProvider({ children }) {
    const [account, setAccount] = useState({});

    return <AccountContext.Provider value={{account, setAccount}}>{children}</AccountContext.Provider>
}

export function useAccount() {
    return useContext(AccountContext);
}