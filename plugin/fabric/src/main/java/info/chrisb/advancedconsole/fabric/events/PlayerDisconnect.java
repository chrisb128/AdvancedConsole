package info.chrisb.advancedconsole.fabric.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.common.events.EventType;
import info.chrisb.advancedconsole.fabric.PlayerInfoFactory;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerQuitEvent;

public class PlayerDisconnect extends info.chrisb.advancedconsole.common.events.PlayerDisconnect implements Listener {
    public PlayerDisconnect(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onPlayerQuit(PlayerQuitEvent event) {
        onPlayerDisconnect(PlayerInfoFactory.create(event.getPlayer()));
    }
}
