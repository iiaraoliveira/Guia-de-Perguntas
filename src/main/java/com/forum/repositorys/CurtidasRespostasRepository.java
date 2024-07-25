package com.forum.repositorys;

import com.forum.entitys.CurtidasRespostas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurtidasRespostasRepository extends JpaRepository<CurtidasRespostas, String>{
}
