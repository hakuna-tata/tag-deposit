export interface IPipeline {
    pipe(next: IPipeline): IPipeline;
}

export abstract class Pipeline<T> implements IPipeline {
    private next: IPipeline;

    pipe(next: IPipeline): IPipeline {
        this.next = next;

        return next;
    }

    report(e: T): void {
        console.log(e);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abstract execute(e: T): Promise<any> | any;
}
