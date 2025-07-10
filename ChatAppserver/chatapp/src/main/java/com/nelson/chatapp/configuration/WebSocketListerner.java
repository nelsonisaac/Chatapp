package com.nelson.chatapp.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.nelson.chatapp.model.ChatMessage;
import com.nelson.chatapp.model.MessageType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketListerner {

    @Autowired
    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event){
        log.info("session is connect{}", event);
    }

    @EventListener
    public void handleWebSocketDisConnectListener(SessionDisconnectEvent event) throws NullPointerException{
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        @SuppressWarnings("null")
        String username = headerAccessor.getSessionAttributes().get("username").toString();

        if(username != null){
            log.info("User disconnected: {}", username);

            String chatMessage = ChatMessage.builder()
                                    .type(MessageType.LEAVE)
                                    .user(username)
                                    .build().toString();
            messagingTemplate.convertAndSend("/topic/public",chatMessage);
        }
    }

}   
