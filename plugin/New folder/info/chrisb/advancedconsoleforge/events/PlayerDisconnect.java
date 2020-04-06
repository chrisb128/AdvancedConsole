package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;
import info.chrisb.advancedconsoleforge.EventType;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class PlayerDisconnect extends EventTrackerEvent {

    @SubscribeEvent()
    public void playerJoin(PlayerEvent.PlayerLoggedOutEvent event) {
        getApi().addEvent(EventType.PlayerDisconnect, event.getPlayer(), "Player disconnected");
    }

}
