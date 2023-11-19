import Nav from "./Nav"

export default function Footer() {

    return <footer className="p-4 mt-12 flex-between bg-stone-900">
        <Nav className="hidden lg:flex"/>
        <div className="lg:hidden"></div>
        <div className="flex flex-col gap-2 text-right">
            <div className="flex flex-col">
                <span className="text-xs text-stone-500">Created by</span>
                <a className="text-sm underline hover:text-amber-600" 
                href="https://docs.spacetraders.io/">SpaceTraders API</a>
            </div>

            <div className="flex flex-col">
                <span className="text-xs text-stone-500">GitHub</span>
                <a className="text-sm underline hover:text-amber-600"
                href="https://github.com/tantomeus">Tantomeus</a>
            </div>
        </div>
    </footer>
}