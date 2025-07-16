package com.nelson.chatapp.model;

import lombok.*;

import java.io.Serializable;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InviteLink implements Serializable {
    private String token;
    private String roomId;
    private boolean active;
}
