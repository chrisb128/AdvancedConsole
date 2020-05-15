package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.bukkit.PlayerInfoFactory;
import org.bukkit.entity.LivingEntity;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.entity.EntityPickupItemEvent;

public class ItemPickup extends info.chrisb.advancedconsole.common.events.ItemPickup implements Listener {
    public ItemPickup(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler
    public void onItemPickup(EntityPickupItemEvent event) {
        LivingEntity entity = event.getEntity();
        if (entity instanceof Player) {
            onItemPickup(PlayerInfoFactory.create((Player)entity), event.getItem().getName());
        }
    }
}
