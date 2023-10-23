import { NestFactory } from "@nestjs/core";

export namespace _Nest {
    export namespace Create {
        export let spyOn: jest.SpyInstance;

        export function mock(): void {
            spyOn = jest.spyOn(NestFactory, "create").mockReturnValue(<any>{
                get: (Class: any) => new Class(),
            });
        }

        export function clean(): void {
            spyOn.mockRestore();
        }
    }
}
