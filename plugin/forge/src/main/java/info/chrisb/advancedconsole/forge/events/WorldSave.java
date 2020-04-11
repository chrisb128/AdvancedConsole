package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraftforge.event.world.WorldEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class WorldSave extends info.chrisb.advancedconsole.common.events.WorldSave {
    public WorldSave(EventTrackerApi eventTracker) {
        super(eventTracker);
    }
    @SubscribeEvent()
    public void worldLoad(WorldEvent.Save saveEvent) {
        saveEvent.getWorld().getWorldInfo().getWorldName();
    }
}
