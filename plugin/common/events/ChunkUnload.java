package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;

public class ChunkUnload extends EventTrackerEvent {
    public ChunkUnload(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.ChunkUnload);
    }

    protected void onChunkUnload(int posX, int posY) {
        sendEvent(null, String.format("%d,%d", posX, posY));
    }
}
