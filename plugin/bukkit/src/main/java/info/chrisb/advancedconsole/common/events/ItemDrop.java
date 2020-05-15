package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class ItemDrop extends EventTrackerEvent {
    public ItemDrop(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.ItemDrop);
    }

    protected void onItemDrop(PlayerInfo playerInfo, String item) {
        sendEvent(playerInfo, String.format("Player dropped %s", item));
    }
}
