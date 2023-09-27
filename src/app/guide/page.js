"use client";

import { FaHelicopterSymbol } from "react-icons/fa6";

import ShipImg from "@/components/ShipImg";

export default function Guide() {

    return <section className="w-[70%] mx-auto">
        <div className="text-sm">
            <div className="flex gap-4 items-center my-4">
                <hr className="opacity-50 grow"/>
                <h2 className="text-center text-2xl">TRADE</h2>
                <hr className="opacity-50 grow"/>
            </div>

            <div className="p-2">
                <div className="flex gap-4 items-center mb-2">
                    <h3 className="text-xl">How to buy a ship</h3>
                    <hr className="opacity-50 grow"/>
                </div>

                <p><span className="text-amber-600">Shipyards</span> allow you to purchase ships.</p>
                <p>To buy a ship, you need to have your ship on a planet with a shipyar.</p>
                <p>The rest of the steps are obvious to you if you are not an anprim.</p>
            </div>

            <div className="p-2">
                <div className="flex gap-4 items-center mb-2">
                    <h3 className="text-xl">How to buy/sell goods</h3>
                    <hr className="opacity-50 grow"/>
                </div>

                <p>You need to send your ship with a cargo capacity greater than nothing to the planet with
                    <span className="text-amber-600">marketplace</span>.
                </p>

                <p>You need dock your ship before trading.</p>
            </div>
        </div>

        <div className="text-sm">
            <div className="flex gap-4 items-center my-4">
                <hr className="opacity-50 grow"/>
                <h2 className="text-center text-2xl">NAVIGATION</h2>
                <hr className="opacity-50 grow"/>
            </div>

            <div className="p-2">
                <div className="flex gap-4 items-center mb-2">
                    <h3 className="text-xl">Flight modes</h3>
                    <hr className="opacity-50 grow"/>
                </div>

                <ul className="text-left">
                    <li>1. CRUISE - Cruise flight mode is the default mode for all ships. 
                        It consumes fuel at a normal rate and travels at a normal speed.</li>

                    <li>2. BURN - Burn flight mode consumes fuel at a faster 
                        rate and travels at a faster speed.</li>

                    <li>3. DRIFT - Drift flight mode consumes the least fuel and travels 
                        at a much slower speed. Drift mode is useful when your ship has run out 
                        of fuel and you need to conserve what little fuel you have left.</li>

                    <li>4. STEALTH - Stealth flight mode runs with systems at a minimum, 
                        making it difficult to detect. 
                        It consumes fuel at a normal rate but travels at a reduced speed.</li>
                </ul>
            </div>

            <div className="p-2">
                <div className="flex gap-4 items-center mb-2">
                    <h3 className="text-xl">How to travel</h3>
                    <hr className="opacity-50 grow"/>
                </div>

                <ul className="text-left">
                    <li>1. Undock the ship.</li>
                    <li>2. Press buttons.</li>
                    <li>3. ???.</li>
                    <li>4. Profit.</li>
                </ul>
            </div>

            <div className="p-2">
                <div className="flex gap-4 items-center mb-2">
                    <h3 className="text-xl">How to dock or undock a ship</h3>
                    <hr className="opacity-50 grow"/>
                </div>

                <p>Just click on the ship icon to change the state.</p>
                <p>You will see an animation that corresponds to the current state of the ship.</p>

                <div className="flex items-center gap-8 mt-2">
                    <div className="flex flex-col items-center">
                        <span>UNDOCKED</span>
                        <div className="relative flex justify-center items-center h-20 w-20 mt-2">
                            <FaHelicopterSymbol
                            className="absolute h-full w-full bg-stone-400 fill-amber-600 rounded-full p-2"/>
                            <ShipImg status="IN_ORBIT"/>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <span>DOCKED</span>
                        <div className="relative flex justify-center items-center h-20 w-20 mt-2">
                            <FaHelicopterSymbol
                            className="absolute h-full w-full bg-stone-400 fill-amber-600 rounded-full p-2"/>
                            <ShipImg/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="text-sm">
            <div className="flex gap-4 items-center my-4">
                <hr className="opacity-50 grow"/>
                <h2 className="text-center text-2xl">FACTION CONTRACTS</h2>
                <hr className="opacity-50 grow"/>
            </div>
            
            <div className="p-2">
                <div className="flex gap-4 items-center mb-2">
                    <h3 className="text-xl">How to accept and fulfill</h3>
                    <hr className="opacity-50 grow"/>
                </div>

                <p>Go to the contracts page and accept the contracts you like. 
                    The “Accept” button will become a “Fulfill” button and will be 
                    inactive until you fulfill the conditions</p>
            </div>
        </div>

        <div className="text-sm">
            <div className="flex gap-4 items-center my-4">
                <hr className="opacity-50 grow"/>
                <h2 className="text-center text-2xl">MINIG <span className="line-through">COAL</span></h2>
                <hr className="opacity-50 grow"/>
            </div>
            
            <div className="p-2">
                <div className="flex gap-4 items-center mb-2">
                    <h3 className="text-xl">How to mine</h3>
                    <hr className="opacity-50 grow"/>
                </div>

                <p>Buy a mining drone and send it to an asteroid field. 
                    To mine, you need to undock your drone.</p>
            </div>
        </div>

        <div className="text-sm">
            <div className="flex gap-4 items-center my-4">
                <hr className="opacity-50 grow"/>
                <h2 className="text-center text-2xl">FACTIONS</h2>
                <hr className="opacity-50 grow"/>
            </div>
            
            <div className="p-2">
                <div className="flex gap-4 items-center mb-2">
                    <h3 className="text-xl">PURPOSE</h3>
                    <hr className="opacity-50 grow"/>
                </div>
                
                <p>The API is in alpha version, so factions, like many other features, 
                    are not yet fully featured. But you can choose your faction.</p>
            </div>
        </div>
  </section>
}
  