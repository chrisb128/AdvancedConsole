package info.chrisb.advancedconsoleforge;

import info.chrisb.advancedconsoleforge.events.*;
import net.minecraft.block.Block;
import net.minecraft.block.Blocks;
import net.minecraftforge.common.ForgeConfigSpec;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.RegistryEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.InterModComms;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.event.lifecycle.InterModEnqueueEvent;
import net.minecraftforge.fml.event.lifecycle.InterModProcessEvent;
import net.minecraftforge.fml.event.server.FMLServerStartingEvent;
import net.minecraftforge.fml.event.server.FMLServerStoppingEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.util.stream.Collectors;

// The value here should match an entry in the META-INF/mods.toml file
@Mod("advanced-console")
public class AdvancedConsoleForge {
    public static final String MODID = "advanced-console";

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

        _configuration = Configuration.FromFile(configPath);
        _eventTracker = new EventTrackerApi(_configuration);

        MinecraftForge.EVENT_BUS.register(new PlayerJoin(_eventTracker));
        MinecraftForge.EVENT_BUS.register(new PlayerDisconnect(_eventTracker));
        MinecraftForge.EVENT_BUS.register(new PlayerChat(_eventTracker));
        MinecraftForge.EVENT_BUS.register(new BlockBreak(_eventTracker));
        MinecraftForge.EVENT_BUS.register(new BlockPlace(_eventTracker));
        MinecraftForge.EVENT_BUS.register(new WorldLoad(_eventTracker));
        MinecraftForge.EVENT_BUS.register(new WorldUnload(_eventTracker));
        MinecraftForge.EVENT_BUS.register(new WorldSave(_eventTracker));
        MinecraftForge.EVENT_BUS.register(new ItemPickup(_eventTracker));
    }

    // You can use SubscribeEvent and let the Event Bus discover methods to call
    @SubscribeEvent
    public void onServerStarting(FMLServerStartingEvent event) {
        // do something when the server starts
        _eventTracker.addEvent(EventType.Startup, null, "Hello World!");
    }

    // You can use SubscribeEvent and let the Event Bus discover methods to call
    @SubscribeEvent
    public void onServerStarting(FMLServerStoppingEvent event) {
        // do something when the server starts
        _eventTracker.addEvent(EventType.Shutdown, null, "Goodbye World!");
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
