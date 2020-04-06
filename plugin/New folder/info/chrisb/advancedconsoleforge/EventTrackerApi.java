package info.chrisb.advancedconsoleforge;

import net.minecraft.entity.player.PlayerEntity;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;
import java.util.Iterator;

public class EventTrackerApi {
    private String _serverId;
    public EventTrackerApi(String serverId) {
        _serverId = serverId;
    }

    private static String apiUrl = "http://localhost:3030/api?";

    private String getPlayerInfo(PlayerEntity player) {
        return String.format("{ username: \"%s\" uuid:\"%s\" }", player.getDisplayName(), player.getUniqueID());
    }

    public boolean setServerStatus(String status, Collection<PlayerEntity> loggedInUsers) {
        String userList = "[";
        Iterator<PlayerEntity> iterator = loggedInUsers.iterator();
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
        String result = executePost(apiUrl, query);

        return result != null;
    }

    public boolean addEvent(EventType type, PlayerEntity player, String message) {
        String escapedMessage = escape(message);

        String playerInfo = "";
        if (player != null)
        {
            playerInfo += "player:" + getPlayerInfo(player);
        }

        String query = graphQueryParams(String.format("mutation { addEvent(serverId:\"%s\" type:%d message:\"%s\" %s) { _id } }", _serverId, type.ordinal(), escapedMessage, playerInfo));
        String result = executePost(apiUrl, query);

        return result != null;
    }

    private static String escape(String s)    {
        return s.replace("\"", "\\\"");
    }

    private static String graphQueryParams(String query)
    {
        return String.format("{ \"query\": \"%s\" }", escape(query));
    }

    private static String executePost(String targetURL, String urlParameters) {

        HttpURLConnection connection = null;
        try {
            //Create connection
            URL url = new URL(targetURL);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Accept", "application/json");
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
