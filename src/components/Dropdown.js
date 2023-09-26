export default function Dropdown({ options = [] }) {

    function borderRadius(i, arr) {
        if (i === 0 && i === arr.length - 1) return "rounded-lg";
        if (i === 0) return "rounded-t-lg";
        if (i === arr.length - 1) return "rounded-b-lg";
        return "";
    }

    return (
    <div
    className="flex flex-col z-50 rounded-lg absolute right-0 min-w-full top-[110%] bg-stone-700 window-divide">
        {options.filter(option => option.name).map((option, i, arr) => {
            return (
            <button
            key={option.name}
            onClick={option.handler}
            className={`text-xs text-left p-3 hover:bg-stone-600 ${borderRadius(i, arr)}`}>
                {option.name}
            </button>)
        })}
    </div>)
}