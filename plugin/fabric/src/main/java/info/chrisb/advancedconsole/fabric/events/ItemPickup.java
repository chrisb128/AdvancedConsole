package info.chrisb.advancedconsole.fabric.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.fabric.PlayerInfoFactory;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerAttemptPickupItemEvent;

public class ItemPickup extends info.chrisb.advancedconsole.common.events.ItemPickup implements Listener {
    public ItemPickup(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler
    public void onItemPickup(PlayerAttemptPickupItemEvent event) {
        onItemPickup(PlayerInfoFactory.create(event.getPlayer()), event.getItem().getName());
    }
}
