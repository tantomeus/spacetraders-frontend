"use client";

const { createContext, useState, useContext } = require("react");

const ShipsContext = createContext();

export default function ShipsProvider({ children }) {
    const [ships, setShips] = useState([]);
    const [rerender, setRerender] = useState(false);

    return <ShipsContext.Provider value={{ships, setShips, rerender, setRerender}}>{children}</ShipsContext.Provider>
}

export function useShips() {
    return useContext(ShipsContext);
}
