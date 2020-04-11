package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.event.server.FMLServerStoppingEvent;

public class ServerShutdown extends info.chrisb.advancedconsole.common.events.ServerShutdown {
    public ServerShutdown(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent
    public void onServerStopping(FMLServerStoppingEvent event) {
        // do something when the server starts
        onServerShutdown();
    }
}
