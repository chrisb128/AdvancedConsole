package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import net.minecraftforge.event.entity.item.ItemTossEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class ItemDrop extends info.chrisb.advancedconsole.common.events.ItemDrop {
    public ItemDrop(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent()
    public void itemDrop(ItemTossEvent event) {
        onItemDrop(
            PlayerInfoFactory.createPlayerInfo(event.getPlayer()),
            event.getEntityItem().getItem().toString()
        );
    }

}
