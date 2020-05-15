package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.common.events.EventType;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.WorldLoadEvent;

public class WorldLoad extends info.chrisb.advancedconsole.common.events.WorldLoad implements Listener {
    public WorldLoad(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onWorldLoad(WorldLoadEvent event) {
        onWorldLoad(event.getWorld().getName());
    }
}
