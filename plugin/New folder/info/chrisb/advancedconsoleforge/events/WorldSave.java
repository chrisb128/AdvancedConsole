package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventType;
import net.minecraftforge.event.world.WorldEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class WorldSave extends EventTrackerEvent {
    @SubscribeEvent()
    public void worldLoad(WorldEvent.Save saveEvent) {
        getApi().addEvent(EventType.WorldSave, null, saveEvent.getWorld().getWorldInfo().getWorldName());
    }
}