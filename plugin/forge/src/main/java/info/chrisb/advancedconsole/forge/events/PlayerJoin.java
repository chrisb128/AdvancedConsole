package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class PlayerJoin extends info.chrisb.advancedconsole.common.events.PlayerJoin {
    public PlayerJoin(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent
    public void playerJoin(PlayerEvent.PlayerLoggedInEvent event) {
        onPlayerJoin(PlayerInfoFactory.createPlayerInfo(event.getPlayer()));
    }
}
