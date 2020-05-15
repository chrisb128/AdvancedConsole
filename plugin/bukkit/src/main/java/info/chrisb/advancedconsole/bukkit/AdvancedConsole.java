package info.chrisb.advancedconsole.bukkit;
import info.chrisb.advancedconsole.common.Configuration;
import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import info.chrisb.advancedconsole.common.events.EventType;
import info.chrisb.advancedconsole.bukkit.events.EventListenerFactory;
import info.chrisb.advancedconsole.bukkit.events.ServerShutdown;
import info.chrisb.advancedconsole.bukkit.events.ServerStartup;
import org.bukkit.Bukkit;
import org.bukkit.event.Listener;
import org.bukkit.plugin.PluginManager;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.*;

public final class AdvancedConsole extends JavaPlugin implements Listener {

    private EventTrackerApi _eventTracker;
    private Timer _keepAliveTimer;

    public AdvancedConsole() {
        super();

    }

    private Collection<PlayerInfo> getCurrentPlayerList() {
        ArrayList<PlayerInfo> playerInfo = new ArrayList<PlayerInfo>();
        Bukkit.getOnlinePlayers().forEach(player -> {
            playerInfo.add(PlayerInfoFactory.create(player));
        });

        return playerInfo;
    }

    @Override
    public void onEnable() {

        PluginManager manager = getServer().getPluginManager();

        String configFilePath = getDataFolder().getPath() + "/config.json";

        Configuration configuration = Configuration.FromFile(configFilePath);
        _eventTracker = new EventTrackerApi(configuration);
        if (configuration.getServerId() == null || "".equals(configuration.getServerId())) {
            String serverId = _eventTracker.addServer(getServer().getName(), getServer().getIp());
            configuration.setServerId(serverId);
            configuration.save(configFilePath);
            _eventTracker = new EventTrackerApi(configuration);
        }

        manager.registerEvents(this, this);

        EventListenerFactory listenerFactory = new EventListenerFactory(_eventTracker);

        EventType[] eventTypes = EventType.values();
        for(int eventTypeIndex = 0; eventTypeIndex < eventTypes.length; ++eventTypeIndex) {
            Listener listener = listenerFactory.create(eventTypes[eventTypeIndex]);

            if (listener != null) {
                manager.registerEvents(listener, this);
            }
        }

        new ServerStartup(_eventTracker).serverStartup();

        _keepAliveTimer = new Timer();
        TimerTask keepAliveTask = new TimerTask() {

            @Override
            public void run() {

                _eventTracker.setServerStatus("live", getCurrentPlayerList());
            }
        };

        _keepAliveTimer.scheduleAtFixedRate(keepAliveTask, 10000, 10000);
    }

    @Override
    public void onDisable() {
        _eventTracker.setServerStatus("down", new ArrayList());
        new ServerShutdown(_eventTracker).serverShutdown();
    }

    @Override
    protected void finalize() throws Throwable {
        _keepAliveTimer.cancel();
        super.finalize();
    }
}
