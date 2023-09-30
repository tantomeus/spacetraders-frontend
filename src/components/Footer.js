import Nav from "./Nav"

export default function Footer() {

    return <footer className="mt-12 flex-between bg-stone-900 p-4">
        <Nav/>
        <div className="flex flex-col text-right gap-2">
            <div className="flex flex-col">
                <span className="text-xs text-stone-500">Created by</span>
                <a className="underline hover:text-amber-600 text-sm" 
                href="https://docs.spacetraders.io/">SpaceTraders API</a>
            </div>

            <div className="flex flex-col">
                <span className="text-xs text-stone-500">GitHub</span>
                <a className="underline hover:text-amber-600 text-sm"
                href="https://github.com/tantomeus">Tantomeus</a>
            </div>
        </div>
    </footer>
}