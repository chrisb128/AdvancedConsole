package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.common.events.EventType;
import info.chrisb.advancedconsole.bukkit.PlayerInfoFactory;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;

public class BlockBreak extends info.chrisb.advancedconsole.common.events.BlockBreak implements Listener {
    public BlockBreak(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onBlockBreak(BlockBreakEvent event) {
        Player player = event.getPlayer();
        Block block = event.getBlock();
        onBlockBreak(PlayerInfoFactory.create(player), block.getBlockData().getAsString(), block.getX(), block.getY(), block.getZ());
    }
}
