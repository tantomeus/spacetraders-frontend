export default function Inventory({ ship }) {

    return <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-96 divide-y divide-stone-500">
        <div className="flex items-center p-4">
            <h2 className="text-2xl">Inventory</h2>
        </div>

        <div className="p-4 divide-y divide-stone-50">

            <div className="flex justify-between py-4">
                <span>CARGO: {ship.cargo.units}/{ship.cargo.capacity}</span>
                <span>FUEL: {ship.fuel.current}/{ship.fuel.capacity}</span>
            </div>

            <ul className="pt-4">
                {!ship.cargo.inventory.length ?
                <li className="flex items-center">
                    <hr className="grow"/>
                    <span className="px-2">No Cargo</span>
                    <hr className="grow"/>
                </li>
                :
                ship.cargo.inventory.map((item, i) => <li className="flex items-center" key={i}>
                    <span className="pr-2">{item.name}</span>
                    <hr className="grow"/>
                    <span className="pl-2">{item.units}</span>
                </li>
                )}
            </ul>

        </div>
    </div>
}