package info.chrisb.advancedconsole;
import com.google.common.base.internal.Finalizer;
import org.bukkit.Bukkit;
import org.bukkit.Chunk;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.event.player.AsyncPlayerChatEvent;
import org.bukkit.event.player.PlayerChatEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.event.world.*;
import org.bukkit.plugin.PluginManager;
import org.bukkit.plugin.java.JavaPlugin;
import org.slf4j.Logger;

import java.util.*;

public final class AdvancedConsole extends JavaPlugin implements Listener {

    private EventTrackerApi _eventTracker;
    private Timer _keepAliveTimer;

    public AdvancedConsole() {
        super();

    }

    private Collection<Player> getCurrentPlayerList() {
        return (Collection<Player>) Bukkit.getOnlinePlayers();
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

        _keepAliveTimer = new Timer();

        manager.registerEvents(this, this);

        // Plugin startup logic
        _eventTracker.addEvent(EventType.Startup, null, "Hello World!");

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
        _eventTracker.addEvent(EventType.Shutdown, null, "Goodbye World!");
    }

    @EventHandler()
    public void onPlayerJoin(PlayerJoinEvent event) {

        Player player = event.getPlayer();
        String message = String.format("Player joined %s (%s)", player.getDisplayName(), player.getUniqueId().toString());

        _eventTracker.addEvent(EventType.PlayerJoin, player, message);
    }

    @EventHandler()
    public void onPlayerChat(AsyncPlayerChatEvent event) {

        Player player = event.getPlayer();
        String message = String.format("%s", event.getMessage());

        _eventTracker.addEvent(EventType.PlayerChat, player, message);
    }

    @EventHandler()
    public void onPlayerQuit(PlayerQuitEvent event) {
        Player player = event.getPlayer();
        String message = String.format("Player disconnected");

        _eventTracker.addEvent(EventType.PlayerDisconnect, player, message);
    }

    @EventHandler()
    public void onChunkLoad(ChunkLoadEvent event) {
        Chunk chunk = event.getChunk();
        String message = String.format("Chunk Load %d,%d", chunk.getX(), chunk.getZ());

        //_eventTracker.addEvent(EventType.ChunkLoad, message);
    }

    @EventHandler()
    public void onChunkUnload(ChunkUnloadEvent event) {
        Chunk chunk = event.getChunk();
        String message = String.format("Chunk Unload %d,%d", chunk.getX(), chunk.getZ());

        //_eventTracker.addEvent(EventType.ChunkUnload, message);
    }

    @EventHandler()
    public void onBlockBreak(BlockBreakEvent event) {
        Player player = event.getPlayer();
        Block block = event.getBlock();
        String message = String.format("Block broken %d,%d", block.getX(), block.getZ(), block.getBlockData().getAsString());

        _eventTracker.addEvent(EventType.BlockBreak, player, message);
    }

    @EventHandler()
    public void onBlockPlace(BlockPlaceEvent event) {
        Player player = event.getPlayer();
        Block block = event.getBlock();
        String message = String.format("Block placed %d,%d %s", block.getX(), block.getZ(), block.getBlockData().getAsString());

        _eventTracker.addEvent(EventType.BlockPlace, player, message);
    }

    @EventHandler()
    public void onWorldLoad(WorldLoadEvent event) {
        String message = String.format("World Loaded");

        _eventTracker.addEvent(EventType.WorldLoad, null, message);
    }

    @EventHandler()
    public void onWorldSave(WorldSaveEvent event) {
        String message = String.format("World Saved");

        _eventTracker.addEvent(EventType.WorldSave, null, message);
    }

    @EventHandler()
    public void onWorldUnload(WorldUnloadEvent event) {
        String message = String.format("World Unloaded");

        _eventTracker.addEvent(EventType.WorldUnload, null, message);
    }

    @Override
    protected void finalize() throws Throwable {
        _keepAliveTimer.cancel();
        super.finalize();
    }
}
