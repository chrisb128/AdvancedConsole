package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.events.EventType;
import net.minecraftforge.event.world.WorldEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class WorldUnload extends EventTrackerEvent {
    public WorldUnload(EventTrackerApi eventTracker) {
        super(eventTracker);
    }
    @SubscribeEvent()
    public void worldLoad(WorldEvent.Unload unloadEvent) {
        getApi().addEvent(EventType.WorldUnload, null, unloadEvent.getWorld().getWorldInfo().getWorldName());
    }
}
