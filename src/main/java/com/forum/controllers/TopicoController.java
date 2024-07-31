package com.forum.controllers;

import com.forum.dtos.ListaTopicosDTO;
import com.forum.dtos.TopicoDTO;
import com.forum.services.TopicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("topico")
public class TopicoController {

    @Autowired
    private TopicoService service;

    @PostMapping("/usuario_id")
    public ResponseEntity<Void> criarTopico(@PathVariable Long usuario_id,
                                            @RequestBody List<TopicoDTO> dto){

        service.criarTopico(usuario_id, dto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/usuario_id/topico_id")
    public ResponseEntity<Void> atualizarTopico(@PathVariable Long usuario_id,
                                                @PathVariable Long topico_id,
                                                @RequestBody TopicoDTO dto){

        service.atualizarTopico(usuario_id, topico_id, dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/usuario_id/topico_id")
    public ResponseEntity<Void> apagarTopico(@PathVariable Long usuario_id,
                                             @PathVariable Long topico_id){

        service.apagarTopico(usuario_id, topico_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ListaTopicosDTO>> listarTodosTopicos(){
        return new ResponseEntity<>(service.listarTodosTopicos(),
                service.listarTodosTopicos() != null ?
                HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{titulo}")
    public ResponseEntity<List<ListaTopicosDTO>> buscarPorTitulo(@PathVariable String titulo){
        return new ResponseEntity<>(service.buscarPorTitulo(titulo),
                service.buscarPorTitulo(titulo) != null ?
                HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
