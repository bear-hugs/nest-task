import "reflect-metadata";

import { Messages } from "@messages/index.js";

import { _Command } from "./command/index.js";
import { _Bear } from "./bear/index.js";
import { _Enums } from "./bin.enums.js";

export async function _Runner(): Promise<void> {
    const command = process.argv.at(2);

    if (!command) {
        Messages.Errors.Missing.Command();
    }

    switch (command) {
        case _Enums.Commands.Bear:
            await _Bear.Runner();
            break;
        default:
            await _Command.Runner();
            break;
    }
}
