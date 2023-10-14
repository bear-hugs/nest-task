import path from "path";
import fs from "fs";

import { Patches } from "@patches";
import { Tools } from "@tools";

import { _Types } from "./assembler.types";

export namespace _Constants {
    export namespace Dummies {
        export const fileLines: Readonly<_Types.FileLines> = {
            imports: {
                types: [],
                constants: [],
                folders: [],
                files: [],
            },
            exports: {
                types: [],
                constants: [],
                folders: [],
                files: [],
            },
        };

        export const entities: Readonly<_Types.Main.Entities> = {
            types: [],
            constants: [],
            folders: [],
            files: [],
        };
    }

    export namespace Directories {
        export namespace Paths {
            export const root: Readonly<string> = Tools.PathManager.Main.projectRoot;

            export const lib: Readonly<string> = path.join(root, "lib");

            export const specs: Readonly<string> = path.join(root, "specs");
        }

        export namespace TopLevel {
            export const lib: Readonly<string[]> = fs
                .readdirSync(Paths.lib)
                .filter((item) => !item.includes("."))
                .map((item) => path.resolve(Paths.lib, item));

            export const specs: Readonly<string[]> = fs
                .readdirSync(Paths.specs)
                .filter((item) => !item.includes("."))
                .map((item) => path.resolve(Paths.specs, item));

            export const all: Readonly<string[]> = [...lib, ...specs];
        }

        export const ignore: Readonly<string[]> = [
            "lib",
            "lib/tmp",
            "specs",
            "specs/unit",
            "specs/integration",
            "specs/integration/cli",
            "specs/tmp",
            "specs/tmp/migrations",
            "lib/cli/create/migration/templates",
            "lib/cli/create/migration/templates/surreal",
        ];
    }

    export namespace Files {
        export const ignore: Readonly<string[]> = ["index.ts"];

        export const eslintConfig: Readonly<string> = path.join(Directories.Paths.root, ".eslintrc.js");

        export const prettierConfig: Readonly<string> = path.join(Directories.Paths.root, ".prettierrc");
    }

    export namespace Extensions {
        export const ignore: Readonly<string[]> = [".spec.ts", ".d.ts", ".json", ".template", "exec.ts"];
    }

    export namespace Template {
        export const location: Readonly<string> = path.resolve(__dirname, "assembler.template");

        export namespace Import {
            export const statement: Readonly<Patches.String> = new Patches.String(
                'import * as $variableName from "$exportFrom"',
            );
        }

        export namespace Export {
            export const statement: Readonly<Patches.String> = new Patches.String(
                "export import $moduleName = $subModuleName",
            );
        }
    }
}
