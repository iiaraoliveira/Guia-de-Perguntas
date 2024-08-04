package com.forum.dtos;

import java.time.LocalDateTime;

public record ListaRespostasDTO(
        String conteudo,
        LocalDateTime dataPostagem
) {
}
