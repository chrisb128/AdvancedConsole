package info.chrisb.advancedconsole.fabric.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.common.events.EventType;
import info.chrisb.advancedconsole.fabric.PlayerInfoFactory;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockPlaceEvent;

public class BlockPlace extends info.chrisb.advancedconsole.common.events.BlockPlace implements Listener {
    public BlockPlace(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onBlockPlace(BlockPlaceEvent event) {
        Player player = event.getPlayer();
        Block block = event.getBlock();

        onBlockPlace(PlayerInfoFactory.create(player), block.getBlockData().getAsString(), block.getX(), block.getY(), block.getZ());
    }
}
