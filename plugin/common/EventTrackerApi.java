package info.chrisb.advancedconsole.common;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;
import java.util.Iterator;

import info.chrisb.advancedconsole.common.events.EventType;

public class EventTrackerApi {
    private String _serverId;
    private String _token = null;
    private String _apiUrl = "";
    private String _username = "";
    private String _password = "";

    public EventTrackerApi(Configuration configuration) {
        _serverId = configuration.getServerId();
        _apiUrl = configuration.getApiUrl();
        _username = configuration.getApiUsername();
        _password = configuration.getApiPassword();
    }

    private String getPlayerInfo(PlayerInfo player) {
        return String.format("{ username: \"%s\" uuid:\"%s\" }", player.getUsername(), player.getUuid());
    }

    private boolean loginIfRequired() {
        if (_token == null) {
            String authResponse = executePost(_apiUrl + "/api/auth/login", String.format("{ \"userName\":\"%s\", \"password\":\"%s\" }", _username, _password));
            if (authResponse == null) {
                return false;
            }

            JsonObject responseObject = new JsonParser().parse(authResponse).getAsJsonObject();
            if (!responseObject.get("success").getAsBoolean()) {
                return false;
            };

            _token = responseObject.get("token").getAsString();
        }

        return true;
    }

    public String addServer(String name, String host) {
        if (!loginIfRequired()) return null;

        String query = graphQueryParams(String.format("mutation { addServer(name:\"%s\" host:\"%s\") { _id } }", name, host));
        String response = executePost(_apiUrl + "/api/query?", query);

        if (response == null) {
            return null;
        }

        JsonObject serverInfo = new JsonParser().parse(response).getAsJsonObject();
        _serverId = serverInfo
                .get("data").getAsJsonObject()
                .get("addServer").getAsJsonObject()
                .get("_id").getAsString();

        return _serverId;
    }

    public boolean setServerStatus(String status, Collection<PlayerInfo> loggedInUsers) {
        if (!loginIfRequired()) return false;

        String userList = "[";
        Iterator<PlayerInfo> iterator = loggedInUsers.iterator();
        boolean first = true;
        while(iterator.hasNext()) {
            if (!first) {
                userList += ",";
            }
            userList += getPlayerInfo(iterator.next());
            first = false;
        }
        userList += "]";

        String query = graphQueryParams(String.format("mutation { updateServerStatus(serverId:\"%s\" status:\"%s\" users:%s) { _id } }", _serverId, status, userList));
        String result = executePost(_apiUrl + "/api/query?", query);

        return result != null;
    }

    public boolean addEvent(EventType type, PlayerInfo player, String message) {
        if (!loginIfRequired()) return false;

        String escapedMessage = escape(message);

        String playerInfo = "";
        if (player != null)
        {
            playerInfo += "player:" + getPlayerInfo(player);
        }

        String query = graphQueryParams(String.format("mutation { addEvent(serverId:\"%s\" eventType:%d message:\"%s\" %s) { _id } }", _serverId, type.ordinal(), escapedMessage, playerInfo));
        String result = executePost(_apiUrl + "/api/query?", query);

        return result != null;
    }

    private static String escape(String s)    {
        return s.replace("\"", "\\\"");
    }

    private static String graphQueryParams(String query) {
        return String.format("{ \"query\": \"%s\" }", escape(query));
    }

    private String executePost(String targetURL, String urlParameters) {

        HttpURLConnection connection = null;
        try {
            //Create connection
            URL url = new URL(targetURL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Accept", "application/json");
            if (_token != null) {
                connection.setRequestProperty("Authorization", "Bearer " + _token);
            }
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Content-Length", Integer.toString(urlParameters.getBytes().length));

            connection.setUseCaches(false);
            connection.setDoOutput(true);

            //Send request
            DataOutputStream wr = new DataOutputStream (connection.getOutputStream());
            wr.writeBytes(urlParameters);
            wr.close();

            //Get Response
            Reader responseReader = new InputStreamReader(connection.getInputStream());
            BufferedReader rd = new BufferedReader(responseReader);
            StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
            String line;
            while ((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            return response.toString();
        } catch (java.net.ConnectException ce) {
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }
}
