package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class PlayerCommand extends EventTrackerEvent {
    public PlayerCommand(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.PlayerCommand);
    }

    public void onPlayerCommand(PlayerInfo playerInfo, String command) {
        sendEvent(playerInfo, command);
    }
}