export default function AccountInfo({ token }) {

    return <div className="window w-96">
        <h2 className="p-4 text-2xl">Account</h2>
        <div className="flex p-4">
            <input disabled placeholder="Token" className="cursor-text input grow py-3" value={token}/>
        </div>
    </div>
}