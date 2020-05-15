package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import info.chrisb.advancedconsole.common.events.EventTrackerEvent;
import info.chrisb.advancedconsole.common.events.EventType;
import info.chrisb.advancedconsole.bukkit.PlayerInfoFactory;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.AsyncPlayerChatEvent;

public class PlayerChat extends info.chrisb.advancedconsole.common.events.PlayerChat implements Listener {
    public PlayerChat(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onPlayerChat(AsyncPlayerChatEvent event) {
        onPlayerChat(PlayerInfoFactory.create(event.getPlayer()), event.getMessage());
    }
}
