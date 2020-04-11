package info.chrisb.advancedconsole.forge;

import com.mojang.authlib.GameProfile;
import info.chrisb.advancedconsole.common.Configuration;
import info.chrisb.advancedconsole.common.EventTrackerApi;
import info.chrisb.advancedconsole.common.PlayerInfo;
import info.chrisb.advancedconsole.common.events.EventType;
import info.chrisb.advancedconsole.forge.events.*;
import net.minecraft.block.Block;
import net.minecraft.client.Minecraft;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.entity.player.ServerPlayerEntity;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.dedicated.DedicatedServer;
import net.minecraft.server.management.PlayerList;
import net.minecraft.world.server.ServerWorld;
import net.minecraftforge.common.ForgeConfig;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.RegistryEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.event.server.FMLServerStartingEvent;
import net.minecraftforge.fml.event.server.FMLServerStoppingEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.fml.javafmlmod.FMLModContainer;
import net.minecraftforge.fml.loading.FMLCommonLaunchHandler;
import net.minecraftforge.fml.server.ServerLifecycleHooks;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Timer;
import java.util.TimerTask;
import java.util.function.Consumer;

// The value here should match an entry in the META-INF/mods.toml file
@Mod("advanced-console")
public class AdvancedConsoleForge {
    public static final String MODID = "advanced-console";

    private Timer _keepAliveTimer;
    private Configuration _configuration;
    private EventTrackerApi _eventTracker;
    // Directly reference a log4j logger.
    private static final Logger LOGGER = LogManager.getLogger();

    public AdvancedConsoleForge() {
        // Register the setup method for modloading
        FMLJavaModLoadingContext.get().getModEventBus().addListener(this::setup);

        // Register ourselves for server and other game events we are interested in
        MinecraftForge.EVENT_BUS.register(this);
    }

    private void setup(final FMLCommonSetupEvent event) {

        String configPath = null;
        try {
            configPath = new File("./mods/AdvancedConsole/config.json").getCanonicalPath();
        } catch (IOException e) {
            System.out.println("Could not find config file");
            return;
        }

        _keepAliveTimer = new Timer();
        TimerTask keepAliveTask = new TimerTask() {
            @Override
            public void run() {
                _eventTracker.setServerStatus("live", getCurrentPlayerList());
            }
        };

        _keepAliveTimer.scheduleAtFixedRate(keepAliveTask, 10000, 10000);

        _configuration = Configuration.FromFile(configPath);
        _eventTracker = new EventTrackerApi(_configuration);
        EventListenerFactory listenerFactory = new EventListenerFactory(_eventTracker);

        EventType[] eventTypes = EventType.values();
        for(int eventTypeIndex = 0; eventTypeIndex < eventTypes.length; ++eventTypeIndex) {
            Object listener = listenerFactory.create(eventTypes[eventTypeIndex]);

            if (listener != null) {
                MinecraftForge.EVENT_BUS.register(listener);
            }
        }
    }

    private Collection<PlayerInfo> getCurrentPlayerList() {
        ArrayList<PlayerInfo> playerList = new ArrayList<PlayerInfo>();
        ServerLifecycleHooks.getCurrentServer().getWorlds().forEach(serverWorld -> {
            serverWorld.getPlayers().forEach(serverPlayerEntity -> {
                playerList.add(PlayerInfoFactory.createPlayerInfo(serverPlayerEntity));
            });
        });
        return playerList;
    }

    // You can use EventBusSubscriber to automatically subscribe events on the contained class (this is subscribing to the MOD
    // Event bus for receiving Registry Events)
    @Mod.EventBusSubscriber(bus = Mod.EventBusSubscriber.Bus.MOD)
    public static class RegistryEvents {
        @SubscribeEvent
        public static void onBlocksRegistry(final RegistryEvent.Register<Block> blockRegistryEvent) {
            // register a new block here
        }
    }
}
