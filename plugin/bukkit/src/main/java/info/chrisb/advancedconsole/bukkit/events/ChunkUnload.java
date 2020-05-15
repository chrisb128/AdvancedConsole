package info.chrisb.advancedconsole.bukkit.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import org.bukkit.Chunk;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.ChunkUnloadEvent;

public class ChunkUnload extends info.chrisb.advancedconsole.common.events.ChunkUnload implements Listener {
    public ChunkUnload(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @EventHandler()
    public void onChunkUnload(ChunkUnloadEvent event) {
        Chunk chunk = event.getChunk();
        onChunkUnload(chunk.getX(), chunk.getZ());
    }
}
