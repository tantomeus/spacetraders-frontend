import FactionImg from "./FactionImg";
import { AiOutlineClose } from "react-icons/ai";

export default function FactionInfo({ selectedFactionInfo, onClose }) {

    return <div className="z-[1001] window w-[40rem] border-solid border border-amber-600 p-4 space-y-4">
        <button onClick={() => onClose(false)} className="absolute z-[1002] top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-[50%] border-solid border border-amber-600 p-2 text-sm] bg-stone-900 hover:bg-amber-600"><AiOutlineClose/></button>
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="block text-xs text-stone-500 uppercase">NAME</span>
                <hr className="opacity-50 grow"/>
                <FactionImg className="absolute z-[2000] right-4 top-6 bg-stone-900" faction={selectedFactionInfo.symbol}/>
            </div>
            <p>{selectedFactionInfo.name}</p>
        </div>
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="block text-xs text-stone-500 uppercase">DESCRIPTION</span>
                <hr className="opacity-50 grow"/>
            </div>
            <p>{selectedFactionInfo.description}</p>
        </div>
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="block text-xs text-stone-500 uppercase">HEADQUARTERS</span>
                <hr className="opacity-50 grow"/>
            </div>
            <p>{selectedFactionInfo.headquarters}</p>
        </div>
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="block text-xs text-stone-500 uppercase">TRAITS</span>
                <hr className="opacity-50 grow"/>
            </div>
            <ul className="flex gap-4">
                {selectedFactionInfo.traits.map((trait) => <li className="rounded-full bg-stone-700 text-sm p-2 " key={trait.symbol}>{trait.name}</li>)}
            </ul>
        </div>
    </div>
}