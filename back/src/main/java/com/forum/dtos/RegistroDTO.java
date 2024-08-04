package com.forum.dtos;

import com.forum.enums.Role;

public record RegistroDTO(
        String nome,
        String login,
        String senha,
        Role role
) {
}
