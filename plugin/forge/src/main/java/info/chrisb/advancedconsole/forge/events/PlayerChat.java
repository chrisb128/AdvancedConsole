package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraftforge.event.ServerChatEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class PlayerChat extends info.chrisb.advancedconsole.common.events.PlayerChat {
    public PlayerChat(EventTrackerApi eventTracker) { super(eventTracker); }

    @SubscribeEvent()
    public void playerChat(ServerChatEvent chatEvent) {
        onPlayerChat(
            PlayerInfoFactory.createPlayerInfo(chatEvent.getPlayer()),
            chatEvent.getMessage()
        );
    }
}
