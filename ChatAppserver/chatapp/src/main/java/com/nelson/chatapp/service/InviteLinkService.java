package com.nelson.chatapp.service;

import com.nelson.chatapp.model.InviteLink;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InviteLinkService {

    private final RedisTemplate<String, InviteLink> redis;
    private static final String PREFIX = "invite:";

    /** Create link, store for `minutes` TTL, return raw token */
    public String create(String roomId, long minutes){
        String token = UUID.randomUUID().toString().substring(0,8);
        InviteLink link = InviteLink.builder()
                .token(token)
                .roomId(roomId)
                .active(true).build();
        redis.opsForValue().set(PREFIX + token, link, Duration.ofMinutes(minutes));
        return token;
    }

    /** Validate token; returns link or null */
    public InviteLink validate(String token){
        InviteLink link = redis.opsForValue().get(PREFIX + token);
        return (link != null && link.isActive()) ? link : null;
    }

    public boolean revoke(String token){
        return redis.delete(PREFIX + token);
    }

}
