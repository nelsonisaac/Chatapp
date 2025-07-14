package com.nelson.chatapp.controller;

import com.nelson.chatapp.model.InviteLink;
import com.nelson.chatapp.service.InviteLinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class InviteLinkController {

    private final InviteLinkService links;

    @PostMapping("/generate-link")
    public ResponseEntity<String> generate(@RequestParam String roomId, @RequestParam(defaultValue = "60") long ttl){
        String token = links.create(roomId, ttl);
        String url = "https://app.com/chat/join" + token;
        return ResponseEntity.ok(url);
    }

    @GetMapping("/validate-link/{token}")
    public ResponseEntity<?> validate(@PathVariable String token){
        InviteLink link = links.validate(token);
        return (link == null)
                ? ResponseEntity.status(410).body("Invalid or expired link")
                : ResponseEntity.ok(link.getRoomId());
    }

    @DeleteMapping("/delete-link/{token}")
    public ResponseEntity<?> revoke(@PathVariable String token){
        return links.revoke(token)
                ? ResponseEntity.ok("link revoked")
                : ResponseEntity.status(404).body("Link not found");
    }
}
