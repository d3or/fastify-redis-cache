import { ChainableCommander } from "./utils/RedisCommander";
export interface Transaction {
    pipeline(commands?: [name: string, ...args: unknown[]][]): ChainableCommander;
    multi(options: {
        pipeline: false;
    }): Promise<"OK">;
    multi(): ChainableCommander;
    multi(options: {
        pipeline: true;
    }): ChainableCommander;
    multi(commands?: [name: string, ...args: unknown[]][]): ChainableCommander;
}
export declare function addTransactionSupport(redis: any): void;
