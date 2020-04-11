package info.chrisb.advancedconsole.forge.events;

import com.mojang.authlib.GameProfile;
import info.chrisb.advancedconsole.common.PlayerInfo;
import net.minecraft.entity.player.PlayerEntity;

public final class PlayerInfoFactory {
    private PlayerInfoFactory() {}

    public static PlayerInfo createPlayerInfo(PlayerEntity playerEntity) {
        GameProfile profile = playerEntity.getGameProfile();
        return new PlayerInfo(profile.getName(), profile.getId().toString());
    }
}
