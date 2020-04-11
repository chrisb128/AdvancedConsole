package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class PlayerChat extends EventTrackerEvent {
    public PlayerChat(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.PlayerChat);
    }

    public void onPlayerChat(PlayerInfo playerInfo, String chatMessage) {
        sendEvent(playerInfo, chatMessage);
    }
}
