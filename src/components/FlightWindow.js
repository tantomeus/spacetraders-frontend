import { convertSeconds } from "@/helpers/helpers";

export default function FlightWindow({ ship, timer }) {

    return <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-96 divide-y divide-stone-500">
        <div className="flex p-4 justify-between items-center">
            <h2 className="text-2xl">Arrives</h2>
            <span>{convertSeconds(timer)}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 text-sm">
            <span>Fuel Consumed</span> <span className="justify-self-end text-stone-400">{ship.fuel.consumed.amount}</span>
            <span>Destination</span> <span className="justify-self-end text-stone-400">{ship.nav.route.destination.symbol}</span>
            <span>Mode</span> <span className="justify-self-end text-stone-400">{ship.nav.flightMode}</span>
        </div>
    </div>
}