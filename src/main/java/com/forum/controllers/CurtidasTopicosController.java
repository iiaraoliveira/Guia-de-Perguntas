package com.forum.controllers;

import com.forum.services.CurtidasTopicosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("curtidas-topicos")
public class CurtidasTopicosController {

    @Autowired
    private CurtidasTopicosService service;

    @PostMapping("/{usuario_id}/{topico_id}")
    public ResponseEntity<Void> darCurtida(@PathVariable Long usuario_id,
                                           @PathVariable Long topico_id){

        service.darCurtida(usuario_id, topico_id);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{usuario_id}/{topico_id}")
    public ResponseEntity<Void> removerCurtida(@PathVariable Long usuario_id,
                                           @PathVariable Long topico_id){

        service.removerCurtida(usuario_id, topico_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
