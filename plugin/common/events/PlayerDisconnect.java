package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class PlayerDisconnect extends EventTrackerEvent {
    public PlayerDisconnect(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.PlayerDisconnect);
    }

    protected void onPlayerDisconnect(PlayerInfo playerInfo) {
        sendEvent(playerInfo, "Player disconnected");
    }
}
