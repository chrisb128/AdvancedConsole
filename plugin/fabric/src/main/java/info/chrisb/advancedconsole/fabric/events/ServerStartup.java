package info.chrisb.advancedconsole.fabric.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import org.bukkit.event.Listener;

public class ServerStartup extends info.chrisb.advancedconsole.common.events.ServerStartup implements Listener {
    public ServerStartup(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    public void serverStartup() {
        onServerStartup();
    }
}
