package com.forum.repositorys;

import com.forum.entitys.Resposta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespostaRepository extends JpaRepository<Resposta, String>{

    long contarPorIdDoUsuario(Long usuario_id);

    List<Resposta> procurarPeloIdDousuario(Long usuario_id);
}
