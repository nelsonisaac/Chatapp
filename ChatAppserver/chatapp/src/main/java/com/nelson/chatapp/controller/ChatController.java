package com.nelson.chatapp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.nelson.chatapp.model.ChatMessage;

@Controller
public class ChatController {
    
    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){
        String username = (String)headerAccessor.getSessionAttributes().get("username");

        if(username != null){
            chatMessage.setUser(username);
        }
        System.out.println("this is chat: "+chatMessage.getChat() + " with user: " + chatMessage.getUser());
        return chatMessage;
    }   

    @MessageMapping("/addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){

        System.out.println("this is user: "+ chatMessage.getUser() +" "+ chatMessage.getType());
        if(headerAccessor.getSessionAttributes() != null){
            headerAccessor.getSessionAttributes().remove("username");
        }else{
            headerAccessor.setSessionAttributes(new java.util.HashMap<>());
        }
        headerAccessor.getSessionAttributes().put("username", chatMessage.getUser());
        return chatMessage;
    }
}
