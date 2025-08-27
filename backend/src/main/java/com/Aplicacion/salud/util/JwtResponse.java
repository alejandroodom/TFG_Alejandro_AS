package com.Aplicacion.salud.util;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;
    private boolean hasHealthData;

    public JwtResponse(String accessToken, String id, String username, String email) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.hasHealthData = false;
    }

    public JwtResponse(String accessToken, String id, String username, String email, boolean hasHealthData) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.hasHealthData = hasHealthData;
    }

    public String getAccessToken() { return token; }
    public void setAccessToken(String accessToken) { this.token = accessToken; }

    public String getTokenType() { return type; }
    public void setTokenType(String tokenType) { this.type = tokenType; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public boolean isHasHealthData() { return hasHealthData; }
    public void setHasHealthData(boolean hasHealthData) { this.hasHealthData = hasHealthData; }
}
