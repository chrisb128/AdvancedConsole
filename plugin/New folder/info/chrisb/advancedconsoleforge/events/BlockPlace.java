package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventType;
import net.minecraft.entity.Entity;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraftforge.event.world.BlockEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class BlockPlace extends EventTrackerEvent {
    @SubscribeEvent()
    public void blockBreak(BlockEvent.EntityPlaceEvent blockBreak) {
        Entity entity = blockBreak.getEntity();
        if (entity instanceof PlayerEntity) {
            getApi().addEvent(EventType.BlockPlace, (PlayerEntity) entity,
                    String.format("%d,%d", blockBreak.getPos().getX(), blockBreak.getPos().getY()));
        }
    }
}
