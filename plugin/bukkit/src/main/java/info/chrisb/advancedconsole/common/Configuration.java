package info.chrisb.advancedconsole.common;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import org.bukkit.Bukkit;

import java.io.*;

public class Configuration {
    private String _serverId;
    private String _apiUrl;
    private String _apiUsername;
    private String _apiPassword;

    private Configuration(String serverId, String apiUrl, String apiUsername, String apiPassword) {
        _serverId = serverId;
        _apiUrl = apiUrl;
        _apiUsername = apiUsername;
        _apiPassword = apiPassword;
    }

    public static Configuration FromFile(String path) {
        File configFile = new File(path);

        if (!configFile.exists()) {
            return null;
        }

        FileInputStream stream = null;
        try {
            stream = new FileInputStream(configFile);
        } catch (FileNotFoundException e) {
            return null;
        }
        Reader reader = new InputStreamReader(stream);
        JsonObject configObject = new JsonParser().parse(reader).getAsJsonObject();

        JsonElement serverIdElement = configObject.get("serverId");
        String serverId = "";
        if (serverIdElement != null) {
            serverId = serverIdElement.getAsString();
        }
        return new Configuration(serverId,
            configObject.get("apiUrl").getAsString(),
            configObject.get("apiUsername").getAsString(),
            configObject.get("apiPassword").getAsString());
    }

    public static Configuration FromEnvironment() {
        return new Configuration("",
                System.getenv("API_URL"),
                System.getenv("API_USERNAME"),
                System.getenv("API_PASSWORD"));
    }

    public String getServerId() {
        return _serverId;
    }

    public String getApiUrl() {
        return _apiUrl;
    }

    public String getApiUsername() {
        return _apiUsername;
    }

    public String getApiPassword() {
        return _apiPassword;
    }

    public void setServerId(String serverId) {
        _serverId = serverId;
    }

    public void save(String path) {
        JsonObject configObject = new JsonObject();
        configObject.add("serverId", new JsonPrimitive(_serverId));
        configObject.add("apiUrl", new JsonPrimitive(_apiUrl));
        configObject.add("apiUsername", new JsonPrimitive(_apiUsername));
        configObject.add("apiPassword", new JsonPrimitive(_apiPassword));

        File configFile = new File(path);

        FileOutputStream stream = null;
        try {
            stream = new FileOutputStream(configFile);
        } catch(FileNotFoundException e) {
            return;
        }

        Writer writer = new OutputStreamWriter(stream);
        try {
            writer.write(configObject.toString());
            writer.close();
        } catch (IOException e) {
            return;
        }
    }
}
