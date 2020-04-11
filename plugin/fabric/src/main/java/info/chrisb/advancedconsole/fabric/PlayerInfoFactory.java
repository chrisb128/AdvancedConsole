package info.chrisb.advancedconsole.fabric;

import info.chrisb.advancedconsole.common.PlayerInfo;
import org.bukkit.entity.Player;

public class PlayerInfoFactory {
    public static PlayerInfo create(Player player) {
        return new PlayerInfo(player.getName(), player.getUniqueId().toString());
    }
}
