export default function AccountInfo({ token }) {

    return <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-96 divide-y divide-stone-500">
        <h2 className="p-4 text-2xl">Account</h2>
        <div className="flex p-4">
            <input disabled placeholder="Token" className="grow bg-transparent border-stone-700 border rounded-md px-3 py-3" value={token}/>
        </div>
    </div>
}