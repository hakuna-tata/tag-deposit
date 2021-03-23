import { BaseSubscriberDep } from "../subTypes";

const OBSEVER_QUERY = ["[td-pageid]", "[td-itemid]", "[td-expose='1'][td-moduleid]"];

const THRESHOLD = 0.5;
export default class Expose extends BaseSubscriberDep {
    private intersectionObserver: IntersectionObserver;
    private mutationObserver: MutationObserver;
    private observerList: Element[] = [];

    constructor() {
        super();

        this.intersectionObserver = new IntersectionObserver(this.ioHandler.bind(this), {
            threshold: THRESHOLD,
        });
    }

    private ioHandler(entries: IntersectionObserverEntry[]): void {
        entries.forEach((io) => {
            const rootHeight = io.rootBounds ? io.rootBounds.height : document.documentElement.offsetHeight;
            const visbleHeight = io.intersectionRect.height;

            if (io.isIntersecting || visbleHeight / rootHeight >= THRESHOLD) {
                this.dispatchExpose(io.target);
            }
        });
    }

    private dispatchExpose(target: Element): void {
        const evt = new Event("tdExpose", {
            bubbles: true,
        });

        target.dispatchEvent(evt);
    }

    private addObserver(query: string[]): void {
        query.forEach((attr) => {
            document.querySelectorAll(attr).forEach((el) => {
                if (!this.observerList.includes(el)) {
                    this.observerList.push(el);
                    this.intersectionObserver.observe(el);
                }
            });
        });
    }

    publish(): void {
        document.body.addEventListener("tdExpose", (e: Event) => {
            this.emit("report", e);
        });

        this.addObserver(OBSEVER_QUERY);
    }
}
