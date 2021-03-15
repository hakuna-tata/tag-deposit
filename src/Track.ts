import { Logger } from "./logger";
import Page from "./page";
import Subscriber from "./subscriber";

class Track {
    private subscriber: Subscriber;

    init(): void {
        Page.init();

        this.subscriber = new Subscriber();

        this.subscriber.subscribe();

        this.autoExpose();
    }

    autoExpose(): void {
        Logger(`自动曝光的 page 数：${Page.pageNum}`);
    }
}

export default Track;
