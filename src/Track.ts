import Page from "./page";
import Subscriber from "./subscriber";

class Track {
    private subscriber: Subscriber;

    init(): void {
        new Page().init();

        this.subscriber = new Subscriber();

        this.subscriber.subscribe();
    }
}

export default Track;
