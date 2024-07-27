package com.forum.repositorys;

import com.forum.entitys.CurtidasTopicos;
import com.forum.entitys.Topico;
import com.forum.entitys.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurtidasTopicosRepository extends JpaRepository<CurtidasTopicos, String>{

    boolean existeusuarioETopico(Usuario usuario, Topico topico);

    Optional<CurtidasTopicos> procurarUsuarioETopico(Usuario usuario, Topico topico);

    long contarTopicoPorId(long topico_id);
}
