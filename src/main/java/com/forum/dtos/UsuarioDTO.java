package com.forum.dtos;

import jakarta.persistence.Column;

public record UsuarioDTO(
        String nome,
        String login,
        String senha
) {
}
