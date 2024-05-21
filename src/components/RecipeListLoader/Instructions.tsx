import { HTMLAttributes } from "react";
import { CopyBlock } from "../UI";
import { LUA_COMMAND } from "./luaCommand";

const Heading = ({ children }: HTMLAttributes<HTMLDivElement>) => 
    <div className="font-bold text-amber-500 text-lg mt-5">{children}</div>

export default function Instructions() {
    return (
        <div className="mt-4">
            <Heading>Step 1</Heading>
            <p>Open a Factorio game with your mods and recipe settings.</p>
            <Heading>Step 2</Heading>
            <p>Open the command terminal by hitting
                the <span className="bg-stone-700 rounded px-2 py-1 text-lg font-bold shadow-sm">~</span> key
                above the tab key.
            </p>
            <p>Type <code className="bg-stone-600 p-1 me-2 ms-1">/c </code> in
                the Factorio command terminal, then copy and paste this command:
            </p>
            <CopyBlock className="h-16 ms-0 font-mono my-4" value={LUA_COMMAND} />
            <p>There should be a space between the "c" and the beginning of "listrecipes ..."</p>
            <div className="border-stone-500 border-s-2 ps-4 my-4">
                <h6 className="font-bold mb-2 text-lg">Important Note</h6>
                <p>When you run the command it may say:</p>
                <p className="text-orange-400 py-2">
                    Using Lua console commands will disable achievements.
                    Please repeat the command to proceed.
                </p>
                <p>You'll need to repeat that command for the command to actually work.</p>
                <p>If you save the game, it will be a save with achievements disabled.</p>
            </div>
            <Heading>Step 3</Heading>
            <p>Find the generated <span className="font-bold">factorio-data.json</span> file
                in the script-output folder in your Factorio User Data Directory.</p>
            <p className="my-2">Info on how to find that folder
                on <a
                    className="text-amber-500 hover:underline"
                    target="_blank"
                    href="https://wiki.factorio.com/Application_directory">
                    this page of the Factorio wiki
                </a>.
            </p>
            <p>Drag and drop the <span className="font-bold">factorio-data.json</span> file
                in the box above.
            </p>
        </div>

    )
}