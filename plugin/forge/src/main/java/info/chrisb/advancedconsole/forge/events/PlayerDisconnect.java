package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class PlayerDisconnect extends info.chrisb.advancedconsole.common.events.PlayerDisconnect {
    public PlayerDisconnect(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent()
    public void playerDisconnect(PlayerEvent.PlayerLoggedOutEvent event) {
        onPlayerDisconnect(PlayerInfoFactory.createPlayerInfo(event.getPlayer()));
    }
}
