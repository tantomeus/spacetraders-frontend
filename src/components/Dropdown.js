export default function Dropdown({ options = [] }) {

    return (
    <div
    className="flex flex-col z-50 rounded-lg absolute right-0 top-[110%] w-full bg-stone-700 window-divide overflow-hidden">
        {options.filter(option => option.name).map(option => {
            return (
            <button
            key={option.name}
            onClick={option.handler}
            className="text-xs text-left p-3 hover:bg-stone-600">
                {option.name}
            </button>)
        })}
    </div>)
}