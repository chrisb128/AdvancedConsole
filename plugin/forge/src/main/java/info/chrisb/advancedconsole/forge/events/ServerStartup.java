package info.chrisb.advancedconsole.forge.events;

import info.chrisb.advancedconsole.common.EventTrackerApi;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.event.server.FMLServerStartingEvent;

public class ServerStartup extends info.chrisb.advancedconsole.common.events.ServerStartup {
    public ServerStartup(EventTrackerApi eventTracker) {
        super(eventTracker);
    }

    @SubscribeEvent()
    public void onServerStarting(FMLServerStartingEvent event) {
        onServerStartup();
    }
}
