package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraftforge.event.world.WorldEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class WorldLoad extends info.chrisb.advancedconsole.common.events.WorldLoad {
    public WorldLoad(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent()
    public void worldLoad(WorldEvent.Load loadEvent) {
        onWorldLoad(loadEvent.getWorld().getWorldInfo().getWorldName());
    }
}
