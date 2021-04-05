import { BaseSubscriberDep } from "../subTypes";
import config from "../../config";
import pageInstance from "../../page";

const OBSEVER_QUERY = ["[td-pageid]", "[td-itemid]", "[td-expose='1'][td-moduleid]"];

const MIN_TIME = 1000;
const THRESHOLD = 0.5;
export default class Expose extends BaseSubscriberDep {
    private timer = null;
    private intersectionObserver: IntersectionObserver;
    private mutationObserver: MutationObserver;
    private observerList: Element[] = [];

    constructor() {
        super();

        this.intersectionObserver = new IntersectionObserver(this.ioHandler.bind(this), {
            threshold: THRESHOLD,
        });

        if (config.offAutoMonitor === false) {
            this.mutationObserver = new MutationObserver(this.moHandler.bind(this));
            this.mutationObserver.observe(document.body, {
                childList: true,
                subtree: true,
            });
        }
    }

    private ioHandler(entries: IntersectionObserverEntry[]): void {
        entries.forEach((io) => {
            const rootHeight = io.rootBounds ? io.rootBounds.height : document.documentElement.offsetHeight;
            const visbleHeight = io.intersectionRect.height;

            // 元素的一半以上在视口内；或者元素的可视高度超过视口的一半以上
            if (io.isIntersecting || visbleHeight / rootHeight >= THRESHOLD) {
                this.dispatchExpose(io.target);
            } else {
                this.updatePageVisible(io.target, false);
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private moHandler(MutationRecord: MutationRecord[]): void {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.addObserver(OBSEVER_QUERY);
        }, MIN_TIME);
    }

    private updatePageVisible(target: Element, visible: boolean): void {
        if (target.getAttribute("td-pageid")) {
            pageInstance.updatePageVisible(target, visible);
        }
    }

    private dispatchExpose(target: Element): void {
        this.updatePageVisible(target, true);

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
