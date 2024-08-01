package com.forum.repositorys;

import com.forum.entitys.Topico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicoRepository extends JpaRepository<Topico, String>{

    List<Topico> findByTitulo(String titulo);

    long countByUsuarioId(Long usuario_id);

    List<Topico>  findByUsuarioId(Long usuario_id);
}
