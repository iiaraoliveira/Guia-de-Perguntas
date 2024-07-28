package com.forum.services;

import com.forum.entitys.CurtidasTopicos;
import com.forum.entitys.Topico;
import com.forum.entitys.Usuario;
import com.forum.repositorys.CurtidasTopicosRepository;
import com.forum.repositorys.TopicoRepository;
import com.forum.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CurtidasTopicosService {

    private final UsuarioRepository usuarioRepository;
    private final TopicoRepository topicoRepository;
    private final CurtidasTopicosRepository curtidasTopicosRepository;

    @Autowired
    public CurtidasTopicosService(UsuarioRepository usuarioRepository, TopicoRepository topicoRepository, CurtidasTopicosRepository curtidasTopicosRepository) {
        this.usuarioRepository = usuarioRepository;
        this.topicoRepository = topicoRepository;
        this.curtidasTopicosRepository = curtidasTopicosRepository;
    }

    public void darCurtida(Long usuario_id, Long topico_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Topico topico = topicoRepository.findById(String.valueOf(topico_id))
                .orElseThrow(() -> new RuntimeException("Tópico não encontrado"));

        boolean jaCurtiu = curtidasTopicosRepository.existsByUsuarioIdAndTopicoId(usuario, topico);

        if(jaCurtiu){
            throw new RuntimeException("Usuário já deu like no tópico!");
        }

        CurtidasTopicos curtidasTopicos = new CurtidasTopicos();
        curtidasTopicos.setUsuario(usuario);
        curtidasTopicos.setTopico(topico);

        curtidasTopicosRepository.save(curtidasTopicos);
    }

    public void removerCurtida(Long usuario_id, Long topico_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Topico topico = topicoRepository.findById(String.valueOf(topico_id))
                .orElseThrow(() -> new RuntimeException("Tópico não encontrado"));

        CurtidasTopicos curtidasTopicos = curtidasTopicosRepository.findByUsuarioAndTopico(usuario, topico)
                .orElseThrow(() -> new RuntimeException("Curtida não encontrada"));

        curtidasTopicosRepository.delete(curtidasTopicos);
    }
}
