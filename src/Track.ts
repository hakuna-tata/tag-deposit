import { Logger } from "./logger";
import Page from "./page";
import Subscriber from "./subscriber";
import FormatData from "./pipeline/formatData";
import BrowserDebug from "./pipeline/browserDebug";

class Track {
    private subscriber: Subscriber;
    private formatData: FormatData;
    private browserDebug: BrowserDebug;

    init(): void {
        Page.init();

        this.subscriber = new Subscriber();
        this.formatData = new FormatData();
        this.browserDebug = new BrowserDebug();

        this.subscriber.pipe(this.formatData).pipe(this.browserDebug);

        this.subscriber.subscribe();

        this.autoExpose();
    }

    autoExpose(): void {
        Logger.color(`自动曝光的 page 数：${Page.pageNum}`);
    }
}

export default Track;
