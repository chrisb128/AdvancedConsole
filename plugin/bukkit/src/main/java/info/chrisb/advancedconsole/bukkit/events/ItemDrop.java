package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.bukkit.PlayerInfoFactory;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerDropItemEvent;

public class ItemDrop extends info.chrisb.advancedconsole.common.events.ItemDrop implements Listener {
    public ItemDrop(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler
    public void onItemDrop(PlayerDropItemEvent event) {
        onItemDrop(PlayerInfoFactory.create(event.getPlayer()), event.getItemDrop().getName());
    }
}
