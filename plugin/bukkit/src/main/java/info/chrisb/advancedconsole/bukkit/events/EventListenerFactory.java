package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.events.EventType;
import org.bukkit.event.Listener;

public class EventListenerFactory {
    private final EventTrackerApi _eventTracker;

    public EventListenerFactory(EventTrackerApi eventTracker) {
        _eventTracker = eventTracker;
    }

    public Listener create(EventType type) {
        switch(type) {
            default: return null;
            case BlockBreak: return new BlockBreak(_eventTracker);
            case BlockPlace: return new BlockPlace(_eventTracker);
            case ChunkLoad: return new ChunkLoad(_eventTracker);
            case ChunkUnload: return new ChunkUnload(_eventTracker);
            case ItemPickup: return new ItemPickup(_eventTracker);
            case ItemDrop: return new ItemDrop(_eventTracker);
            case PlayerChat: return new PlayerChat(_eventTracker);
            case PlayerDisconnect: return new PlayerDisconnect(_eventTracker);
            case PlayerJoin: return new PlayerJoin(_eventTracker);
            case Shutdown: return new ServerShutdown(_eventTracker);
            case Startup: return new ServerStartup(_eventTracker);
            case WorldLoad: return new WorldLoad(_eventTracker);
            case WorldSave: return new WorldSave(_eventTracker);
            case WorldUnload: return new WorldUnload(_eventTracker);
        }
    }
}