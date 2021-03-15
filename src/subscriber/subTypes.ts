import EventEmitter from "wolfy87-eventemitter";
export abstract class BaseSubscriberDep extends EventEmitter {
    abstract publish(): void;
}
