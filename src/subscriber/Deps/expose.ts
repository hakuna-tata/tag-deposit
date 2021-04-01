import { BaseSubscriberDep } from "../subTypes";
import { Logger } from "../../logger";

const OBSEVER_QUERY = ["[td-pageid]", "[td-itemid]", "[td-expose='1'][td-moduleid]"];

const MIN_TIME = 1000;
const THRESHOLD = 0.5;
export default class Expose extends BaseSubscriberDep {
    private updateTime = 0;

    private intersectionObserver: IntersectionObserver;
    private mutationObserver: MutationObserver;
    private observerList: Element[] = [];

    constructor() {
        super();

        this.intersectionObserver = new IntersectionObserver(this.ioHandler.bind(this), {
            threshold: THRESHOLD,
        });

        window.requestAnimationFrame(() => {
            this.mutationObserver = new MutationObserver(this.moHandler.bind(this));

            this.mutationObserver.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }

    private ioHandler(entries: IntersectionObserverEntry[]): void {
        entries.forEach((io) => {
            const rootHeight = io.rootBounds ? io.rootBounds.height : document.documentElement.offsetHeight;
            const visbleHeight = io.intersectionRect.height;

            // 元素的一半以上在视口内；或者元素的可视高度超过视口的一半以上
            if (io.isIntersecting || visbleHeight / rootHeight >= THRESHOLD) {
                this.dispatchExpose(io.target);
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private moHandler(MutationRecord: MutationRecord[]): void {
        this.addObserver(OBSEVER_QUERY);
    }

    private dispatchExpose(target: Element): void {
        const evt = new Event("tdExpose", {
            bubbles: true,
        });

        target.dispatchEvent(evt);
    }

    private addObserver(query: string[]): void {
        const now = Date.now();
        if (now - this.updateTime < MIN_TIME) {
            Logger.tips("tips：限制曝光元素收集频率");
            return;
        }

        this.updateTime = now;

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
