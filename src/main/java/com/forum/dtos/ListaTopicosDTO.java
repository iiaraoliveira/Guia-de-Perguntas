package com.forum.dtos;

import java.time.LocalDateTime;

public record ListaTopicosDTO(
        String titulo,
        String descricao,
        LocalDateTime dataPostagem
) {
}
