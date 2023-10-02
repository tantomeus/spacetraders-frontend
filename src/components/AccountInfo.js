export default function AccountInfo({ token }) {

    return <div className="window w-96">
        <h2 className="p-4 text-2xl">Account</h2>
        <div className="p-4 flex">
            <div className="relative flex grow">
                <input className="cursor-text input grow py-3 hover:border-amber-600 peer" value={token}/>
                <label className="text-sm absolute top-[50%] left-3 transition duration-200 ease-out peer-hover:text-amber-600 scale-[80%] origin-top-left bg-stone-900 px-1 z-10 translate-y-[-170%] peer-focus:text-amber-600">Username</label>
            </div>
        </div>
    </div>
}