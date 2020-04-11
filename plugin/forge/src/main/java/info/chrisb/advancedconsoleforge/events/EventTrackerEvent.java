package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;

public class EventTrackerEvent {
    private EventTrackerApi _eventTracker;

    public EventTrackerEvent(EventTrackerApi eventTracker) {
        _eventTracker = eventTracker;
    }
    protected EventTrackerApi getApi() {
        return _eventTracker;
    }
}
