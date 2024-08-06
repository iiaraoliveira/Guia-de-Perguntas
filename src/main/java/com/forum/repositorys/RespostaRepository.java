package com.forum.repositorys;

import com.forum.entitys.Resposta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespostaRepository extends JpaRepository<Resposta, String>{

    long countByUsuarioId(Long usuario_id);

    List<Resposta> findByUsuarioId(Long usuario_id);
}
