package com.forum.controllers;

import com.forum.services.CurtidasRespostasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class CurtidasRespostasController {

    @Autowired
    private CurtidasRespostasService service;

    @PostMapping("/usuario/curtidas-respostas/{usuario_id}/{resposta_id}")
    public ResponseEntity<Void> darCurtida(@PathVariable Long usuario_id,
                                           @PathVariable Long resposta_id){

        service.darCurtida(usuario_id, resposta_id);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/usuario/curtidas-respostas/{usuario_id}/{resposta_id}")
    public ResponseEntity<Void> removerCurtida(@PathVariable Long usuario_id,
                                           @PathVariable Long resposta_id){

        service.removerCurtida(usuario_id, resposta_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
