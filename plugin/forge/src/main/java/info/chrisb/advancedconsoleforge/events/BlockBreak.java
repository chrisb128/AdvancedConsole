package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;
import info.chrisb.advancedconsoleforge.EventType;
import net.minecraft.item.Item;
import net.minecraftforge.event.ServerChatEvent;
import net.minecraftforge.event.world.BlockEvent;
import net.minecraftforge.eventbus.api.Event;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class BlockBreak extends EventTrackerEvent {
    public BlockBreak(EventTrackerApi eventTracker) {
        super(eventTracker);
    }
    @SubscribeEvent()
    public void blockBreak(BlockEvent.BreakEvent blockBreak) {
        Item item = blockBreak.getState().getBlock().asItem();
        String blockType = item.toString();
        getApi().addEvent(EventType.BlockBreak, blockBreak.getPlayer(),
                String.format("%s %d,%d", blockType, blockBreak.getPos().getX(), blockBreak.getPos().getY()));
    }
}
