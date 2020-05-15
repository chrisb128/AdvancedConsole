package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;

public class ServerShutdown extends EventTrackerEvent {
    public ServerShutdown(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.Shutdown);
    }

    protected void onServerShutdown() {
        sendEvent(null, "Goodbye World!");
    }
}
