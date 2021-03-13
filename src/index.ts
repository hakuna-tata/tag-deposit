import Track from "./track";

class TD {
    static isInit = true;

    static init(): void {
        const track: Track = new Track();
        if (TD.isInit !== false) {
            track.collect.call(track);
        }
        TD.isInit = false;
    }
}

export default TD.init();
