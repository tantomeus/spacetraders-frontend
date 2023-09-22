import ShipImg from "./ShipImg";

export default function SelectShip({ ship, onSelect }) {
    
    return (
    <li 
    className="flex items-center gap-6 p-4 grey-border rounded-md">
        <ShipImg ship={ship}/>
        <h3 className="text-md">{ship.symbol}</h3>
        <div className="relative ml-auto">
            <button onClick={() => onSelect(ship)}
            className="btn btn-color hover:btn-color-reversed text-xs/[1rem]">SELECT</button>
        </div>
    </li>)
}