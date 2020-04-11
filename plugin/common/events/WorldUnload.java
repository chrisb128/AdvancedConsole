package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;

public class WorldUnload extends EventTrackerEvent {
    public WorldUnload(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.WorldUnload);
    }

    protected void onWorldUnload(String worldName) {
        sendEvent(null, String.format("Unloaded world: %s", worldName));
    }
}
