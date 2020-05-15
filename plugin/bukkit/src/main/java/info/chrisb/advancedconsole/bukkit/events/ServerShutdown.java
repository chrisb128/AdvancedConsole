package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import org.bukkit.event.Listener;

public class ServerShutdown extends info.chrisb.advancedconsole.common.events.ServerShutdown implements Listener {
    public ServerShutdown(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    public void serverShutdown() {
        onServerShutdown();
    }
}
