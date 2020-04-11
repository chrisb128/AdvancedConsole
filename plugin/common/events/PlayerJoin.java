package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class PlayerJoin extends EventTrackerEvent {
    public PlayerJoin(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.PlayerJoin);
    }

    protected void onPlayerJoin(PlayerInfo playerInfo) {
        sendEvent(playerInfo, "Player joined");
    }
}
