export default function SkeletonLoader() {

    return (
    <li className="bg-stone-900 rounded-primary p-4 space-y-4">
        <div className="flex-between">
            <div className="animate-skeleton btn h-6 w-[20%] rounded-full"></div>
            <div className="animate-skeleton btn h-6 w-20 rounded-full"></div>
        </div>
        <div className="animate-skeleton btn h-12 w-full rounded-full"></div>
    </li>)
}