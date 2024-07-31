package com.forum.controllers;

import com.forum.dtos.ListaRespostasDTO;
import com.forum.dtos.RespostaDTO;
import com.forum.services.RespostaService;
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
@RequestMapping("resposta")
public class RespostaController {

    @Autowired
    private RespostaService service;

    @PostMapping("/{usuario_id}/{topico_id}")
    public ResponseEntity<Void> criarResposta(@PathVariable Long usuario_id,
                                              @PathVariable Long topico_id,
                                              @RequestBody List<RespostaDTO> dto){

        service.criarResposta(usuario_id, topico_id, dto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{usuario_id}/{topico_id}")
    public ResponseEntity<Void> atualizarResposta(@PathVariable Long usuario_id,
                                              @PathVariable Long topico_id,
                                              @RequestBody RespostaDTO dto){

        service.atualizarResposta(usuario_id, topico_id, dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{usuario_id}/{topico_id}")
    public ResponseEntity<Void> apagarResposta(@PathVariable Long usuario_id,
                                              @PathVariable Long topico_id){

        service.apagarResposta(usuario_id, topico_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{topico_id}")
    public ResponseEntity<List<ListaRespostasDTO>> listarRespostas(@PathVariable Long topico_id){
        return new ResponseEntity<>(service.listarRespostas(topico_id),
                service.listarRespostas(topico_id) != null ?
                HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
