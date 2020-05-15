package info.chrisb.advancedconsole.common;

public class PlayerInfo {
    private final String _username;
    private final String _uuid;

    public PlayerInfo(String username, String uuid) {

        this._username = username;
        this._uuid = uuid;
    }

    public String getUsername() { return _username; }
    public String getUuid() { return _uuid; }
}
