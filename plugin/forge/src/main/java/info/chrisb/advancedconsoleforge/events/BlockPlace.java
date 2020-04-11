package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;
import info.chrisb.advancedconsoleforge.EventType;
import net.minecraft.entity.Entity;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.item.Item;
import net.minecraftforge.event.world.BlockEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class BlockPlace extends EventTrackerEvent {
    public BlockPlace(EventTrackerApi eventTracker) {
        super(eventTracker);
    }
    @SubscribeEvent()
    public void blockBreak(BlockEvent.EntityPlaceEvent blockBreak) {
        Entity entity = blockBreak.getEntity();
        if (entity instanceof PlayerEntity) {
            Item item = blockBreak.getState().getBlock().asItem();
            String blockType = item.toString();

            getApi().addEvent(EventType.BlockPlace, (PlayerEntity) entity,
                    String.format("%s %d,%d", blockType, blockBreak.getPos().getX(), blockBreak.getPos().getY()));
        }
    }
}
