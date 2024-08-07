package com.forum.services;

import com.forum.dtos.ListaTopicosDTO;
import com.forum.dtos.TopicoDTO;
import com.forum.entitys.Topico;
import com.forum.entitys.Usuario;
import com.forum.repositorys.TopicoRepository;
import com.forum.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class TopicoService {

    private final TopicoRepository topicoRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public TopicoService(TopicoRepository topicoRepository, UsuarioRepository usuarioRepository) {
        this.topicoRepository = topicoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    private static boolean naoEhNulo(Object... parameters){
        for(Object parameter : parameters){
            if(parameter == null){
                return false;
            }
        }
        return true;
    }

    public void criarTopico(Long usuario_id, List<TopicoDTO> dto){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        List<Topico> topicos = dto.stream()
                .map(topicoDTO -> {
                    Topico topico = new Topico();
                    topico.setTitulo(topicoDTO.titulo());
                    topico.setDescricao(topicoDTO.descricao());

                    ZoneId brazilZoneId = ZoneId.of("America/Sao_Paulo");
                    LocalDateTime nowInSaoPaulo = LocalDateTime.now(brazilZoneId);

                    topico.setDataPostagem(nowInSaoPaulo);
                    topico.setUsuario(usuario);

                    if(!naoEhNulo(topico.getTitulo(), topico.getDescricao(), topico.getDataPostagem())){
                        throw new IllegalArgumentException("Não pode ser criado um tópico: Um ou mais espaços nulos");
                    }

                    return topico;
                }).toList();

        topicoRepository.saveAll(topicos);
    }

    public void atualizarTopico(Long usuario_id, Long topico_id, TopicoDTO dto){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        Topico topico = topicoRepository.findById(String.valueOf(topico_id))
                .orElseThrow(() -> new RuntimeException("Tópico não encontrado"));

        if(usuario.getTopicos().contains(topico)){
            if(naoEhNulo(topico.getTitulo(), topico.getDescricao())){
                ZoneId brazilZoneId = ZoneId.of("America/Sao_Paulo");
                LocalDateTime nowInSaoPaulo = LocalDateTime.now(brazilZoneId);

                topico.setTitulo(dto.titulo());
                topico.setDescricao(dto.descricao());
                topico.setDataPostagem(nowInSaoPaulo);

                topicoRepository.save(topico);
            }else{
                throw  new IllegalArgumentException("Não pode criar tópico: Um ou mais espaços estão nulos");
            }
        }else{
            throw new RuntimeException("Tópico não está associado ao cliente fornecido");
        }
    }

    public void apagarTopico(Long usuario_id, Long topico_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        Topico topico = topicoRepository.findById(String.valueOf(topico_id))
                .orElseThrow(() -> new RuntimeException("Tópico não encontrado"));

        if(usuario.getTopicos().contains(topico)){
            usuario.getTopicos().remove(topico);
            topicoRepository.delete(topico);
            usuarioRepository.save(usuario);
        }else{
            throw new RuntimeException("Nenhum tópico associada ao usuário");
        }
    }

    public List<ListaTopicosDTO> buscarPorTitulo(String titulo){
        List<Topico> topicos = topicoRepository.findByTitulo(titulo);

        if(topicos.isEmpty()){
            throw new RuntimeException("Título não encontrado com o nome: " + titulo);
        }

        return topicos.stream()
                .map(topico -> new ListaTopicosDTO(topico.getTitulo(),
                        topico.getDescricao(), topico.getDataPostagem()))
                .toList();
    }

    public List<ListaTopicosDTO> listarTodosTopicos(){
        List<Topico> topicos = topicoRepository.findAll();

        return topicos.stream()
                .map(topico -> new ListaTopicosDTO(topico.getTitulo(),
                        topico.getDescricao(), topico.getDataPostagem()))
                .toList();
    }

}
