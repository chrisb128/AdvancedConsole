package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;
import info.chrisb.advancedconsoleforge.EventType;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class PlayerDisconnect extends EventTrackerEvent {
    public PlayerDisconnect(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent()
    public void playerJoin(PlayerEvent.PlayerLoggedOutEvent event) {
        getApi().addEvent(EventType.PlayerDisconnect, event.getPlayer(), "Player disconnected");
    }

}
