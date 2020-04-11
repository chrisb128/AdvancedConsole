package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;

public class WorldLoad extends EventTrackerEvent {
    public WorldLoad(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.WorldLoad);
    }

    protected void onWorldLoad(String worldName) {
        sendEvent(null, String.format("Loaded world: %s", worldName));
    }
}
