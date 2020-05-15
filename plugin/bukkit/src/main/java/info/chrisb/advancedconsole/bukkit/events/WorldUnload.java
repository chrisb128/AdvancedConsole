package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.common.events.EventType;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.WorldUnloadEvent;

public class WorldUnload extends info.chrisb.advancedconsole.common.events.WorldUnload implements Listener {
    public WorldUnload(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onWorldUnload(WorldUnloadEvent event) {
        onWorldUnload(event.getWorld().getName());
    }
}
