package com.forum.controllers;

import com.forum.dtos.CriarUsuarioDTO;
import com.forum.dtos.UsuarioDTO;
import com.forum.dtos.UsuarioQtdCurtidasDTO;
import com.forum.dtos.UsuarioQtdRespostaDTO;
import com.forum.enums.Selo;
import com.forum.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping("/usuario/respostas")
    public ResponseEntity<List<UsuarioQtdRespostaDTO>> listarUsuariosOrdenadosPorQtdResposta(){
        return new ResponseEntity<>(service.listarUsuariosOrdenadosPorQtdResposta(),
                service.listarUsuariosOrdenadosPorQtdResposta() != null ?
                        HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/usuario/curtidas")
    public ResponseEntity<List<UsuarioQtdCurtidasDTO>> listarUsuariosOrdenadosPorQtdCurtidas(){
        return new ResponseEntity<>(service.listarUsuariosOrdenadosPorQtdCurtidas(),
                service.listarUsuariosOrdenadosPorQtdCurtidas() != null ?
                HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/usuario/selo-resposta/{usuario_id}")
    public ResponseEntity<Selo> determinarSeloResposta(@PathVariable Long usuario_id){
        return new ResponseEntity<>(service.determinarSeloResposta(usuario_id),
                service.determinarSeloResposta(usuario_id) != null ?
                HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/usuario/selo-curtida/{usuario_id}")
    public ResponseEntity<Selo> determinarSeloCurtida(@PathVariable Long usuario_id){
        return new ResponseEntity<>(service.determinarSeloCurtida(usuario_id),
                service.determinarSeloCurtida(usuario_id) != null ?
                        HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/usuario/topicos/{usuario_id}")
    public ResponseEntity<Long> contabilizarTopicoPorUsuario(@PathVariable Long usuario_id){
        return new ResponseEntity<>(service.contabilizarTopicoPorUsuario(usuario_id),
                HttpStatus.OK);
    }

    @GetMapping("/usuario/respostas/{usuario_id}")
    public ResponseEntity<Long> contabilizarRespostaPorUsuario(@PathVariable Long usuario_id){
        return new ResponseEntity<>(service.contabilizarRespostaPorUsuario(usuario_id),
                HttpStatus.OK);
    }

    @PostMapping("publico/criar")
    public ResponseEntity<Void> criarUsuario(@RequestBody CriarUsuarioDTO dto){
        service.criarUsuario(dto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/usuario/{id}")
    public ResponseEntity<Void> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDTO dto){
        service.atualizarUsuario(id, dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<Void> apagarUsuario(@PathVariable Long id){
        service.apagarUsuario(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
