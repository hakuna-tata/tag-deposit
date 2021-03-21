import { Logger } from "./logger";
import pageInstance from "./page";
import Subscriber from "./subscriber";
import FormatData from "./pipeline/formatData";
import BrowserDebug from "./pipeline/browserDebug";

class Track {
    private subscriber: Subscriber;
    private formatData: FormatData;
    private browserDebug: BrowserDebug;

    init(): void {
        pageInstance.init();

        this.subscriber = new Subscriber();
        this.formatData = new FormatData();
        this.browserDebug = new BrowserDebug();

        this.subscriber.pipe(this.formatData).pipe(this.browserDebug);

        this.subscriber.subscribe();
    }
}

export default Track;
