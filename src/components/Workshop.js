

export default function Workshop({ ship }) {
    
    const mounts = selectedShip.cargo.inventory.map(item => item.symbol.includes("MOUNT"));

    return (
    <ul className="">
        {mounts.map(mount =>
        <li key={mount.symbol}>
            <div className="flex-between gap-2">
                <span>{mount.name}</span>
                <hr className="grow opacity-50"/>
                <button className="btn btn-color hover:btn-color-reversed">install</button>
            </div>
            <p>{mount.description}</p>
        </li>)}
    </ul>)
} 