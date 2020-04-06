package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventType;
import net.minecraftforge.event.ServerChatEvent;
import net.minecraftforge.event.world.BlockEvent;
import net.minecraftforge.eventbus.api.Event;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class BlockBreak extends EventTrackerEvent {
    @SubscribeEvent()
    public void blockBreak(BlockEvent.BreakEvent blockBreak) {
        getApi().addEvent(EventType.BlockBreak, blockBreak.getPlayer(),
                String.format("%d,%d", blockBreak.getPos().getX(), blockBreak.getPos().getY()));
    }
}
