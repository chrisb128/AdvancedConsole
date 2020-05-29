package info.chrisb.advancedconsole.bukkit.events;
import info.chrisb.advancedconsole.bukkit.PlayerInfoFactory;
import info.chrisb.advancedconsole.common.EventTrackerApi;

import info.chrisb.advancedconsole.common.PlayerInfo;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerCommandPreprocessEvent;

public class PlayerCommand extends info.chrisb.advancedconsole.common.events.PlayerCommand implements Listener {
    public PlayerCommand(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onPlayerCommand(PlayerCommandPreprocessEvent event) {
        PlayerInfo playerInfo = PlayerInfoFactory.create(event.getPlayer());
        onPlayerCommand(playerInfo, event.getMessage());
    }
}
