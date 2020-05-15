package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class BlockPlace extends EventTrackerEvent {
    public BlockPlace(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.BlockPlace);
    }

    protected void onBlockPlace(PlayerInfo playerInfo, String blockType, int posX, int posY, int posZ) {
        sendEvent(playerInfo, String.format("%s %d,%d,%d", blockType, posX, posY, posZ));
    }
}
