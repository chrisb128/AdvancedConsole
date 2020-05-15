package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;

public class WorldSave extends EventTrackerEvent {
    public WorldSave(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.WorldSave);
    }

    protected void onWorldSave(String worldName) {
        sendEvent(null, String.format("Saved world: %s", worldName));
    }
}
