package info.chrisb.advancedconsoleforge.events;

import info.chrisb.advancedconsoleforge.EventTrackerApi;

public class EventTrackerEvent {
    private EventTrackerApi _eventTracker;

    public EventTrackerEvent() {
        _eventTracker = new EventTrackerApi("5e7f8ce0fbb5b23c700e5363");
    }
    protected EventTrackerApi getApi() {
        return _eventTracker;
    }
}
