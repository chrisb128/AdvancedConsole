package info.chrisb.advancedconsole.common.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;

public class BlockBreak extends EventTrackerEvent {
    public BlockBreak(EventTrackerApi eventTracker) {
        super(eventTracker, EventType.BlockBreak);
    }

    protected void onBlockBreak(PlayerInfo player, String blockType, int posX, int posY, int posZ) {
        sendEvent(player, String.format("%s %d,%d,%d", blockType, posX, posY, posZ));
    }
}
