export interface IPipeline {
    pipe(next: IPipeline): IPipeline;
    trigger(input: unknown): void;
}

export abstract class Pipeline<T> implements IPipeline {
    private next: IPipeline;

    pipe(next: IPipeline): IPipeline {
        this.next = next;

        return next;
    }

    trigger(input: T): void {
        debugger;
        const output = this.step(input);

        // 中断流水线
        if (output === null) return;

        if (this.next) {
            this.next.trigger(output);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract step(e: T): Promise<any> | any;
}
