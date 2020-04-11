package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraft.util.math.ChunkPos;
import net.minecraftforge.event.world.ChunkDataEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class ChunkUnload extends info.chrisb.advancedconsole.common.events.ChunkUnload {
    public ChunkUnload(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent
    public void onChunkUnload(ChunkDataEvent.Unload event) {
        ChunkPos pos = event.getChunk().getPos();
        onChunkUnload(pos.getRegionCoordX(), pos.getRegionCoordZ());
    }
}
