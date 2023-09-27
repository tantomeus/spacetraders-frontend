import ShipImg from "./ShipImg";

export default function SelectShip({ ship, onSelect, children }) {
    
    return (
    <li className="flex-between p-4 grey-border rounded-primary item-hover-color">
        <div className="flex-between gap-4">
            <ShipImg ship={ship}/>
            <h3 className="text-md">{ship.symbol}</h3>
        </div>

        <span>{children}</span>
        
        <button 
        onClick={() => onSelect(ship)}
        className="btn btn-color hover:btn-color-reversed text-xs/[1rem]">SELECT</button>
    </li>)
}