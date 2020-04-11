package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraft.item.Item;
import net.minecraftforge.event.world.BlockEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class BlockBreak extends info.chrisb.advancedconsole.common.events.BlockBreak {
    public BlockBreak(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent()
    public void blockBreak(BlockEvent.BreakEvent blockBreak) {
        Item item = blockBreak.getState().getBlock().asItem();
        String blockType = item.toString();

        onBlockBreak(
                PlayerInfoFactory.createPlayerInfo(blockBreak.getPlayer()),
                blockType,
                blockBreak.getPos().getX(),
                blockBreak.getPos().getY(),
                blockBreak.getPos().getZ());
    }
}
