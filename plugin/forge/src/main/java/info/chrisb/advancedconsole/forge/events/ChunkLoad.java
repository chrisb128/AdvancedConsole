package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraft.util.math.ChunkPos;
import net.minecraftforge.event.world.ChunkDataEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;

public class ChunkLoad extends info.chrisb.advancedconsole.common.events.ChunkLoad {

    public ChunkLoad(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent
    public void onChunkLoad(ChunkDataEvent.Load event) {
        ChunkPos pos = event.getChunk().getPos();
        onChunkLoad(pos.getRegionCoordX(), pos.getRegionCoordZ());
    }
}
