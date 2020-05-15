package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class EventTrackerEvent {
    private EventTrackerApi _eventTracker;
    private EventType _type;

    public EventTrackerEvent(EventTrackerApi eventTracker, EventType type) {
        _eventTracker = eventTracker;
        _type = type;
    }

    protected void sendEvent(PlayerInfo playerInfo, String message) {
        _eventTracker.addEvent(_type, playerInfo, message);
    }
}
