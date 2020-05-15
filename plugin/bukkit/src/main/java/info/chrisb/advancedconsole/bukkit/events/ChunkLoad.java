package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.bukkit.PlayerInfoFactory;
import org.bukkit.Chunk;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.ChunkLoadEvent;

public class ChunkLoad extends info.chrisb.advancedconsole.common.events.ChunkLoad implements Listener {
    public ChunkLoad(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onChunkLoad(ChunkLoadEvent event) {
        Chunk chunk = event.getChunk();
        onChunkLoad(chunk.getX(), chunk.getZ());
    }
}
