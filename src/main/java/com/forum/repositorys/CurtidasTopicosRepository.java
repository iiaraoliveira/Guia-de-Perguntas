package com.forum.repositorys;

import com.forum.entitys.CurtidasTopicos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurtidasTopicosRepository extends JpaRepository<CurtidasTopicos, String>{
}
