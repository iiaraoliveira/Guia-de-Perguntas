package com.forum.enums;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN("admin"),
    USUARIO("usuario");

    private final String role;

    Role (String role){
        this.role = role;
    }

}
