import EventEmitter from "wolfy87-eventemitter";

export interface Subscriber {
    publish(): void;
}

export class ISubscriberDep extends EventEmitter implements Subscriber {
    publish(): void {}
}
