import { useAccount } from "@/context/AccountContext";
import { installMount } from "@/services/api";

export default function Workshop({ ship, setShip }) {
    const { account, fetchShipsData } = useAccount();

    const mounts = ship.cargo.inventory.filter(item => item.symbol.includes("MOUNT")
    && ship.mounts.find(mount => mount.symbol !== item.symbol));

    const haveEnoughCredits = account.credits >= 1000;

    async function handleInstallMount(mount) {
        const data = await installMount(account.token, ship.symbol, mount);
        fetchShipsData(account.token);
        setShip({});
    }

    if (!mounts.length) return (
    <div className="text-xl p-4 text-center col-span-full">
        There are no suitable mounts in inventory
    </div>)

    return (
    <ul className="text-lg">
        {mounts.map(mount =>
        <li className="grey-border p-4" key={mount.symbol}>
            <div className="flex-between gap-2">
                <span>{mount.name}</span>
                <hr className="grow opacity-50"/>
                <button
                disabled={!haveEnoughCredits}
                onClick={() => handleInstallMount(mount.symbol)}
                className={`btn ${haveEnoughCredits
                ? "btn-color hover:btn-color-reversed"
                : "disable-color"} text-sm`}>
                    install
                </button>
            </div>
            <p className="mt-4">{mount.description}</p>
        </li>)}
    </ul>)
}