package com.forum.repositorys;

import com.forum.entitys.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String>{

    Optional<Usuario> findByLogin(String login);
}
