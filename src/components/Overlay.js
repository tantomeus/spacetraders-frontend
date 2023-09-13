export default function Overlay({ onClose }) {
    return <div onClick={() => onClose(false)} className="z-[500] absolute inset-0 opacity-50 bg-stone-950"></div>
}