import { shorten } from "@/helpers/helpers";

export default function MarketplaceItem({ item, ship, onSelect, account }) {

    const name = item.symbol.toLowerCase().split("_")
    .map(item => item[0].toUpperCase() + item.slice(1)).join(" ");
    const cargo = ship?.cargo?.inventory.find((cargo) => cargo.symbol === item.symbol);
    const ableToBuy = ship.cargo.capacity !== ship.cargo.units && account.credits >= item.purchasePrice;

    return (
    <li className="grey-border rounded-primary text-sm p-4 space-y-4">
        <div className="flex-between gap-2">
            <h3 className="text-lg">{name}</h3>
        </div>

        <hr className="grow opacity-50"/>

        <div className="flex-between gap-2">
            <span
            className="credits text-xs/[1rem] p-2 rounded-primary">
                {shorten(item.purchasePrice)} CREDITS
            </span>

            <hr className="block grow opacity-50"/>

            <span
            className="bg-stone-500 text-xs/[1rem] p-2 rounded-primary">
                {shorten(item.tradeVolume)}
            </span>

            <hr className="block grow opacity-50"/>

            <button
            onClick={() => onSelect({...item, name, price: item.purchasePrice}, "purchase")}
            disabled={!ableToBuy}
            className={`btn ${ableToBuy
            ? "btn-color hover:btn-color-reversed"
            : "disable-color"} text-xs/[1rem]`}>
                purchase
            </button>
        </div>

        <div className="flex-between gap-2">
            <span className="credits text-xs/[1rem] p-2 rounded-primary">
                {shorten(item.sellPrice)} CREDITS
            </span>

            <hr className="block grow opacity-50"/>
            
            <span className="bg-stone-500 text-xs/[1rem] p-2 rounded-primary">
                {shorten(cargo?.units) || 0}
            </span>
            <hr className="block grow opacity-50"/>
            <button
            onClick={() => onSelect({...item, name, tradeVolume: cargo.units, price: item.sellPrice}, "sell")}
            disabled={!cargo}
            className={`btn ${cargo
            ? "btn-color hover:btn-color-reversed"
            : "disable-color"} text-xs/[1rem]`}>
                SELL
            </button>
        </div>
    </li>)
}