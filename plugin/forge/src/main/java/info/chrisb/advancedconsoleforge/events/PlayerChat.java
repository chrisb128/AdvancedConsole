package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;
import info.chrisb.advancedconsoleforge.EventType;
import net.minecraftforge.event.ServerChatEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class PlayerChat extends EventTrackerEvent {
    public PlayerChat(EventTrackerApi eventTracker) {
        super(eventTracker);
    }
    @SubscribeEvent()
    public void playerChat(ServerChatEvent chatEvent) {
        getApi().addEvent(EventType.PlayerChat, chatEvent.getPlayer(), chatEvent.getMessage());
    }
}
