package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;

public class ChunkLoad extends EventTrackerEvent {
    public ChunkLoad(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.ChunkLoad);
    }

    protected void onChunkLoad(int posX, int posY) {
        sendEvent(null, String.format("%d,%d", posX, posY));
    }
}
