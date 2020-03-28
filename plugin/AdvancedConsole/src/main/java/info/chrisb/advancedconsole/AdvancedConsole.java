package info.chrisb.advancedconsole;
import com.google.common.base.internal.Finalizer;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.AsyncPlayerChatEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.plugin.PluginManager;
import org.bukkit.plugin.java.JavaPlugin;
import org.slf4j.Logger;

import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

public final class AdvancedConsole extends JavaPlugin implements Listener {

    private final EventTrackerApi _eventTracker;
    private final Timer _keepAliveTimer;

    public AdvancedConsole() {
        super();
        _eventTracker = new EventTrackerApi("5e7f8ce0fbb5b23c700e5363");
        _keepAliveTimer = new Timer();
    }

    @Override
    public void onEnable() {
        PluginManager manager = getServer().getPluginManager();
        manager.registerEvents(this, this);

        // Plugin startup logic
        _eventTracker.addEvent(EventType.Startup, "Hello World!");

        TimerTask keepAliveTask = new TimerTask() {
            @Override
            public void run() {
                _eventTracker.addEvent(EventType.KeepAlive, "I am still alive!");
            }
        };

        _keepAliveTimer.scheduleAtFixedRate(keepAliveTask, 10000, 10000);
    }

    @EventHandler()
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        String message = String.format("Player joined %s (%s)", player.getDisplayName(), player.getUniqueId().toString());

        _eventTracker.addEvent(EventType.PlayerJoin, message);
    }

    @EventHandler()
    public void onPlayerChat(AsyncPlayerChatEvent event) {

        Player player = event.getPlayer();
        String message = String.format("[%s](%s): ", player.getDisplayName(), player.getUniqueId().toString(), event.getMessage());

        _eventTracker.addEvent(EventType.PlayerChat, message);
    }

    @EventHandler()
    public void onPlayerQuit(PlayerQuitEvent event) {
        Player player = event.getPlayer();
        String message = String.format("Player disconnected %s (%s)", player.getDisplayName(), player.getUniqueId().toString());

        _eventTracker.addEvent(EventType.PlayerDisconnect, message);
    }

    @Override
    protected void finalize() throws Throwable {
        _keepAliveTimer.cancel();
        super.finalize();
    }
}
