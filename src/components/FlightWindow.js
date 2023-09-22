import { convertSeconds } from "@/helpers/helpers";

export default function FlightWindow({ ship, seconds }) {

    return (
    <div className="window window-divide w-96">
        <div className="p-4 flex-between">
            <h2 className="text-2xl">Arrives</h2>
            <span>{convertSeconds(seconds)}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 text-sm">
            <span>Fuel Consumed</span>
            <span className="justify-self-end text-stone-400">{ship.fuel.consumed.amount}</span>
            <span>Departure</span>
            <span className="justify-self-end text-stone-400">{ship.nav.route.departure.symbol}</span>
            <span>Destination</span>
            <span className="justify-self-end text-stone-400">{ship.nav.route.destination.symbol}</span>
            <span>Mode</span>
            <span className="justify-self-end text-stone-400">{ship.nav.flightMode}</span>
        </div>
    </div>)
}