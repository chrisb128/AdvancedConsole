package info.chrisb.advancedconsoleforge;

import info.chrisb.advancedconsoleforge.events.*;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.fml.common.Mod;

@Mod("AdvancedConsole")
public class Plugin {
    public Plugin() {
        MinecraftForge.EVENT_BUS.register(new PlayerJoin());
        MinecraftForge.EVENT_BUS.register(new PlayerDisconnect());
        MinecraftForge.EVENT_BUS.register(new PlayerChat());
        MinecraftForge.EVENT_BUS.register(new BlockBreak());
        MinecraftForge.EVENT_BUS.register(new BlockPlace());
        MinecraftForge.EVENT_BUS.register(new WorldLoad());
        MinecraftForge.EVENT_BUS.register(new WorldSave());
        MinecraftForge.EVENT_BUS.register(new WorldUnload());
    }
}
