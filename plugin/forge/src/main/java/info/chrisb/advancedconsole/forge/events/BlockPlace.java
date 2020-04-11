package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraft.entity.Entity;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.item.Item;
import net.minecraftforge.event.world.BlockEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class BlockPlace extends info.chrisb.advancedconsole.common.events.BlockPlace {
    public BlockPlace(EventTrackerApi eventTracker) {
        super(eventTracker);
    }
    @SubscribeEvent()
    public void blockPlace(BlockEvent.EntityPlaceEvent blockEvent) {
        Entity entity = blockEvent.getEntity();
        if (entity instanceof PlayerEntity) {
            Item item = blockEvent.getState().getBlock().asItem();
            String blockType = item.toString();

            onBlockPlace(
                    PlayerInfoFactory.createPlayerInfo((PlayerEntity) entity),
                    blockType,
                    blockEvent.getPos().getX(),
                    blockEvent.getPos().getY(),
                    blockEvent.getPos().getZ());
        }
    }
}
