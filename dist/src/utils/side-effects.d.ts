export type AsyncEffect = () => Promise<void>;
export declare class SideEffectQueue {
    private effects;
    add(label: string, fn: AsyncEffect): void;
    runAll(): Promise<void>;
}
