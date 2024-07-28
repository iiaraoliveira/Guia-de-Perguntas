package com.forum.services;

import com.forum.dtos.ListaRespostasDTO;
import com.forum.dtos.RespostaDTO;
import com.forum.entitys.Resposta;
import com.forum.entitys.Topico;
import com.forum.entitys.Usuario;
import com.forum.repositorys.RespostaRepository;
import com.forum.repositorys.TopicoRepository;
import com.forum.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
public class RespostaService {

    private final RespostaRepository respostaRepository;
    private final TopicoRepository topicoRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public RespostaService(RespostaRepository respostaRepository, TopicoRepository topicoRepository, UsuarioRepository usuarioRepository) {
        this.respostaRepository = respostaRepository;
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

    public void criarResposta(Long usuario_id, Long topico_id, List<RespostaDTO> dto){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        Topico topico = topicoRepository.findById(String.valueOf(topico_id))
                .orElseThrow(() -> new RuntimeException("Tópico não encontrado"));

        List<Resposta> respostas = dto.stream()
                .map(respostaDTO -> {
                    Resposta resposta = new Resposta();
                    resposta.setConteudo(respostaDTO.conteudo());

                    ZoneId brazilZoneId = ZoneId.of("America/Sao_Paulo");
                    LocalDateTime nowInSaoPaulo = LocalDateTime.now(brazilZoneId);

                    resposta.setDataPostagem(nowInSaoPaulo);
                    resposta.setTopico(topico);
                    resposta.setUsuario(usuario);

                    if(!naoEhNulo(resposta.getConteudo(), resposta.getDataPostagem())){
                        throw  new IllegalArgumentException("Não pode criar resposta: Um ou mais espaços estão nulos");
                    }

                    return resposta;
                }).toList();

        respostaRepository.saveAll(respostas);
    }

    public void atualizarResposta(Long usuario_id, Long resposta_id, RespostaDTO dto){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        Resposta resposta = respostaRepository.findById(String.valueOf(resposta_id))
                .orElseThrow(() -> new RuntimeException("Resposta não encontrada!"));

        if(usuario.getRespostas().contains(resposta)){
            if(naoEhNulo(resposta.getConteudo())){
                ZoneId brazilZoneId = ZoneId.of("America/Sao_Paulo");
                LocalDateTime nowInSaoPaulo = LocalDateTime.now(brazilZoneId);

                resposta.setConteudo(dto.conteudo());
                resposta.setDataPostagem(nowInSaoPaulo);

                respostaRepository.save(resposta);
            }else{
                throw  new IllegalArgumentException("Não pode criar resposta: Um ou mais espaços estão nulos");
            }
        }else{
            throw new RuntimeException("Resposta não está associada ao cliente fornecido");
        }
    }

    public void apagarResposta(Long usuario_id, Long resposta_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        Resposta resposta = respostaRepository.findById(String.valueOf(resposta_id))
                .orElseThrow(() -> new RuntimeException("Resposta não encontrada!"));

        if(usuario.getRespostas().contains(resposta)){
            usuario.getRespostas().remove(resposta);
            respostaRepository.delete(resposta);
            usuarioRepository.save(usuario);
        }else{
            throw new RuntimeException("Nenhuma resposta associada ao usuário");
        }
    }

    public List<ListaRespostasDTO> listarRespostas(Long topico_id){
        Optional<Topico> topicoOptional = topicoRepository.findById(String.valueOf(topico_id));

        if(topicoOptional.isPresent()){
            Topico topico = topicoOptional.get();

            return topico.getRespostas().stream()
                    .map(resposta -> new ListaRespostasDTO(resposta.getConteudo(),
                            resposta.getDataPostagem()))
                    .toList();
        }else{
            throw new IllegalArgumentException("Nenhuma resposta encontrada com id do tópico: " + topico_id);
        }
    }
}
