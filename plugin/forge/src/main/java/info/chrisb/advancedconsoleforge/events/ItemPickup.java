package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;
import net.minecraftforge.event.entity.player.EntityItemPickupEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class ItemPickup extends EventTrackerEvent {
    public ItemPickup(EventTrackerApi eventTracker) {
        super(eventTracker);
    }
    @SubscribeEvent
    public void pickupItem(EntityItemPickupEvent event) {

    }
}
