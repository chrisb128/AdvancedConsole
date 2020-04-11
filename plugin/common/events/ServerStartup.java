package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;

public class ServerStartup extends EventTrackerEvent {
    public ServerStartup(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.Startup);
    }

    protected void onServerStartup() {
        sendEvent(null, "Hello World!");
    }
}
