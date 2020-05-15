package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.common.events.EventType;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.WorldSaveEvent;

public class WorldSave extends info.chrisb.advancedconsole.common.events.WorldSave implements Listener {
    public WorldSave(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onWorldSave(WorldSaveEvent event) {
        onWorldSave(event.getWorld().getName());
    }
}
