package com.forum.repositorys;

import com.forum.entitys.CurtidasRespostas;
import com.forum.entitys.Resposta;
import com.forum.entitys.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurtidasRespostasRepository extends JpaRepository<CurtidasRespostas, String>{

    boolean existsByUsuarioAndResposta(Usuario usuario, Resposta resposta);

    Optional<CurtidasRespostas> findByUsuarioAndResposta(Usuario usuario, Resposta resposta);

    long countByRespostaId(long resposta_id);
}
