package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;
import info.chrisb.advancedconsoleforge.EventType;
import net.minecraftforge.event.entity.player.EntityItemPickupEvent;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class PlayerJoin extends EventTrackerEvent {
    public PlayerJoin(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent
    public void playerJoin(PlayerEvent.PlayerLoggedInEvent event) {
        getApi().addEvent(EventType.PlayerJoin, event.getPlayer(), "Player joined");
    }
}
