package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class ItemPickup extends EventTrackerEvent {
    public ItemPickup(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.ItemPickup);
    }

    public void onItemPickup(PlayerInfo playerInfo, String item) {
        sendEvent(playerInfo, "Picked up " + item);
    }
}
