export default function MarketplaceItem({ item, ship }) {

    const name = item.symbol.toLowerCase().split("_").map(item => item[0].toUpperCase() + item.slice(1)).join(" ");
    const cargo = ship.cargo.inventory.find((cargo) => cargo.symbol === item.symbol);

    return <li className="border-solid border border-stone-500 rounded-md text-sm p-4 space-y-4">
        <div className="flex justify-between items-center gap-2">
            <h3 className="text-lg">{name}</h3>
        </div>

        <hr className="grow opacity-50"/>

        <div className="flex justify-between items-center gap-2">
            <span className="text-stone-700 bg-amber-400 text-xs/[1rem] p-2 rounded-md">{item.purchasePrice} CREDITS</span>
            <hr className="block grow opacity-50"/>
            <span className="bg-stone-500 text-xs/[1rem] p-2 rounded-md">{item.tradeVolume}</span>
            <hr className="block grow opacity-50"/>
            <button className="btn-color hover:btn-color-hover text-xs/[1rem]">BUY</button>
        </div>

        <div className="flex justify-between items-center gap-2">
            <span className="text-stone-700 bg-amber-400 text-xs/[1rem] p-2 rounded-md">{item.sellPrice} CREDITS</span>
            <hr className="block grow opacity-50"/>
            <span className="bg-stone-500 text-xs/[1rem] p-2 rounded-md">{cargo?.units || 0}</span>
            <hr className="block grow opacity-50"/>
            <button disabled={!cargo} className={`${cargo ? "hover:btn-color-hover" : "bg-stone-700"} btn-color text-xs/[1rem]`}>SELL</button>
        </div>
    </li>
}