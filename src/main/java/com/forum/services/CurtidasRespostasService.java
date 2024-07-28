package com.forum.services;

import com.forum.entitys.CurtidasRespostas;
import com.forum.entitys.Resposta;
import com.forum.entitys.Usuario;
import com.forum.repositorys.CurtidasRespostasRepository;
import com.forum.repositorys.RespostaRepository;
import com.forum.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CurtidasRespostasService {

    private final UsuarioRepository usuarioRepository;
    private final RespostaRepository respostaRepository;
    private final CurtidasRespostasRepository curtidasRespostasRepository;

    @Autowired

    public CurtidasRespostasService(UsuarioRepository usuarioRepository, RespostaRepository respostaRepository, CurtidasRespostasRepository curtidasRespostasRepository) {
        this.usuarioRepository = usuarioRepository;
        this.respostaRepository = respostaRepository;
        this.curtidasRespostasRepository = curtidasRespostasRepository;
    }

    public void darCurtida(Long usuario_id, Long resposta_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Resposta resposta = respostaRepository.findById(String.valueOf(resposta_id))
                .orElseThrow(() -> new RuntimeException("Resposta não encontrada"));

        boolean jaCurtiu = curtidasRespostasRepository.existsByUsuarioAndResposta(usuario, resposta);

        if(jaCurtiu){
            throw new RuntimeException("Usuário já deu like na resposta!");
        }

        CurtidasRespostas curtidasRespostas = new CurtidasRespostas();
        curtidasRespostas.setUsuario(usuario);
        curtidasRespostas.setResposta(resposta);

        curtidasRespostasRepository.save(curtidasRespostas);
    }

    public void removerCurtida(Long usuario_id, Long resposta_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Resposta resposta = respostaRepository.findById(String.valueOf(resposta_id))
                .orElseThrow(() -> new RuntimeException("Resposta não encontrada"));

        CurtidasRespostas curtidasRespostas = curtidasRespostasRepository.findByUsuarioAndResposta(usuario, resposta)
                .orElseThrow(() -> new RuntimeException("Curtida não encontrada"));

        curtidasRespostasRepository.delete(curtidasRespostas);
    }
}
