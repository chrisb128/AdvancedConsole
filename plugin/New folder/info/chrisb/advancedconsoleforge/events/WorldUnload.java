package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventType;
import net.minecraftforge.event.world.WorldEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class WorldUnload extends EventTrackerEvent {
    @SubscribeEvent()
    public void worldLoad(WorldEvent.Unload unloadEvent) {
        getApi().addEvent(EventType.WorldUnload, null, unloadEvent.getWorld().getWorldInfo().getWorldName());
    }
}
