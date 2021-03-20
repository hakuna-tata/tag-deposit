import EventCompose from "./eventCompose";
import Click from "./click";
import Expose from "./expose";
import { ActionItem } from "../monitorTypes";

type EventType = Click | Expose;
type EventsMap = { [K: string]: typeof EventCompose };

const EVENTS_MAP: EventsMap = {
    click: Click,
};

const getEventValue = (e: Event): EventCompose => {
    if (EVENTS_MAP[e.type]) {
        return new EVENTS_MAP[e.type](e);
    }

    return null;
};

export default function formatData(e: Event): void {
    const eCompose: EventCompose = getEventValue(e);

    if (eCompose === null) return null;

    const actions: ActionItem = (eCompose as EventType).compose();

    if (actions === null) return null;
}
