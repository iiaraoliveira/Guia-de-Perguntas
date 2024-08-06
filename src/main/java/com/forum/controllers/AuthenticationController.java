package com.forum.controllers;

import com.forum.dtos.AutenticacaoDTO;
import com.forum.dtos.RegistroDTO;
import com.forum.dtos.TokenDTO;
import com.forum.entitys.Usuario;
import com.forum.repositorys.UsuarioRepository;
import com.forum.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private TokenService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AutenticacaoDTO dto){
        try{
            var usernamePassword = new UsernamePasswordAuthenticationToken(dto.login(), dto.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            var token = service.gerarToken((Usuario) auth.getPrincipal());

            return new ResponseEntity<>(new TokenDTO(token), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> cadastrar(@RequestBody RegistroDTO dto){
        if(this.repository.findByLogin(dto.login()) != null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.senha());
        Usuario novousuario = new Usuario(dto.nome(), dto.login(), encryptedPassword, dto.role());

        this.repository.save(novousuario);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
