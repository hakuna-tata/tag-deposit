import Track from "./Track";

class TD {
    static isInit = true;

    static init(): Track {
        debugger;
        const track: Track = new Track();
        if (TD.isInit !== false) {
            track.collect.bind(track);
        }
        TD.isInit = false;

        return track;
    }
}

export default TD.init();
