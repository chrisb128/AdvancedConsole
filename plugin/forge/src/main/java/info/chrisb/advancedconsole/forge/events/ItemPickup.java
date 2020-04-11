package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraftforge.event.entity.player.EntityItemPickupEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class ItemPickup extends info.chrisb.advancedconsole.common.events.ItemPickup {
    public ItemPickup(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent
    public void pickupItem(EntityItemPickupEvent event) {
        onItemPickup(
            PlayerInfoFactory.createPlayerInfo(event.getPlayer()),
            event.getItem().toString()
        );
    }
}
