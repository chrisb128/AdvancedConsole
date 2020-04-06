package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventType;
import info.chrisb.advancedconsoleforge.events.EventTrackerEvent;
import net.minecraftforge.event.world.WorldEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class WorldLoad extends EventTrackerEvent {
    @SubscribeEvent()
    public void worldLoad(WorldEvent.Load loadEvent) {
        getApi().addEvent(EventType.WorldLoad, null, loadEvent.getWorld().getWorldInfo().getWorldName());
    }
}
