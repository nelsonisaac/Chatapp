package com.nelson.chatapp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    private MessageType type;
    private String user;
    private String chat;

    public void setUser(String username) {
        throw new UnsupportedOperationException("Not supported yet.");
    }


}
