package com.forum.services;

import com.forum.dtos.UsuarioQtdCurtidasDTO;
import com.forum.dtos.UsuarioQtdRespostaDTO;
import com.forum.entitys.Resposta;
import com.forum.entitys.Topico;
import com.forum.entitys.Usuario;
import com.forum.enums.Selo;
import com.forum.repositorys.CurtidasRespostasRepository;
import com.forum.repositorys.CurtidasTopicosRepository;
import com.forum.repositorys.RespostaRepository;
import com.forum.repositorys.TopicoRepository;
import com.forum.repositorys.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private static final int LIMITE_CURTIDA_BRONZE = 27;
    private static final int LIMITE_CURTIDA_PRATA = 45;
    private static final int LIMITE_CURTIDA_OURO = 90;
    private static final int LIMITE_CURTIDA_DIAMANTE = 126;

    private static final int LIMITE_RESPOSTA_BRONZE = 9;
    private static final int LIMITE_RESPOSTA_PRATA = 18;
    private static final int LIMITE_RESPOSTA_OURO = 36;
    private static final int LIMITE_RESPOSTA_DIAMANTE = 54;

    private final CurtidasRespostasRepository curtidasRespostasRepository;
    private final CurtidasTopicosRepository curtidasTopicosRepository;
    private final RespostaRepository respostaRepository;
    private final TopicoRepository topicoRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(CurtidasRespostasRepository curtidasRespostasRepository,
                          CurtidasTopicosRepository curtidasTopicosRepository, RespostaRepository respostaRepository,
                          TopicoRepository topicoRepository, UsuarioRepository usuarioRepository) {
        this.curtidasRespostasRepository = curtidasRespostasRepository;
        this.curtidasTopicosRepository = curtidasTopicosRepository;
        this.respostaRepository = respostaRepository;
        this.topicoRepository = topicoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public long contarCurtidasRespostas(Long usuario_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        List<Resposta> respostas = respostaRepository.procurarPeloIdDousuario(usuario_id);

        return respostas.stream()
                .mapToLong(resposta -> curtidasRespostasRepository.contarRespostaPorId(resposta.getId()))
                .sum();
    }

    public long contarCurtidasTopicos(Long usuario_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        List<Topico> topicos = topicoRepository.procurarPeloIdDousuario(usuario_id);

        return topicos.stream()
                .mapToLong(topico -> curtidasTopicosRepository.contarTopicoPorId(topico.getId()))
                .sum();
    }

    private long contarTotalCurtidas(Long usuario_id){
        return contarCurtidasRespostas(usuario_id) + contarCurtidasTopicos(usuario_id);
    }

    public long contabilizarRespostarPorUsuario(Long usuario_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return respostaRepository.contarPorIdDoUsuario(usuario.getId());
    }

    public long contabilizarTopicoPorUsuario(Long usuario_id){
        Usuario usuario = usuarioRepository.findById(String.valueOf(usuario_id))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return topicoRepository.contarPorIdDoUsuario(usuario.getId());
    }

    public Selo determinarSeloCurtida(Long usuario_id){
        long totalDeSelos = contarTotalCurtidas(usuario_id);

        if(totalDeSelos >= LIMITE_CURTIDA_BRONZE && totalDeSelos <= LIMITE_CURTIDA_PRATA){
            return Selo.BRONZE;
        }else if(totalDeSelos >= LIMITE_CURTIDA_PRATA && totalDeSelos <= LIMITE_CURTIDA_OURO){
            return Selo.PRATA;
        }else if(totalDeSelos >= LIMITE_CURTIDA_OURO && totalDeSelos <= LIMITE_CURTIDA_DIAMANTE){
            return Selo.OURO;
        }else{
            return Selo.DIAMANTE;
        }
    }

    public Selo determinarSeloResposta(Long usuario_id){
        long totalDeSelos = contabilizarRespostarPorUsuario(usuario_id);

        if(totalDeSelos >= LIMITE_RESPOSTA_BRONZE && totalDeSelos <= LIMITE_RESPOSTA_PRATA){
            return Selo.BRONZE;
        }else if(totalDeSelos >= LIMITE_RESPOSTA_PRATA && totalDeSelos <= LIMITE_RESPOSTA_OURO){
            return Selo.PRATA;
        }else if(totalDeSelos >= LIMITE_RESPOSTA_OURO && totalDeSelos <= LIMITE_RESPOSTA_DIAMANTE){
            return Selo.OURO;
        }else{
            return Selo.DIAMANTE;
        }
    }

    public List<UsuarioQtdRespostaDTO> listarUsuariosOrdenadosPorQtdResposta(){
        List<Usuario> usuarios = usuarioRepository.findAll();

        return  usuarios.stream()
                .map(usuario -> new UsuarioQtdRespostaDTO(
                        usuario.getNome(),
                        usuario.getQtdResposta()
                ))
                .sorted((u1, u2) -> Long.compare(
                        contabilizarRespostarPorUsuario(u2.qtdResposta()),
                        contabilizarRespostarPorUsuario(u1.qtdResposta())))
                .toList();
    }

    public List<UsuarioQtdCurtidasDTO> listarUsuariosOrdenadosPorQtdCurtidas(){
        List<Usuario> usuarios = usuarioRepository.findAll();

        return usuarios.stream()
                .map(usuario -> new UsuarioQtdCurtidasDTO(
                        usuario.getNome(),
                        usuario.getQtdCurtidas()
                ))
                .sorted((u1, u2) -> Long.compare(
                        contarTotalCurtidas(u2.qtdCurtidas()),
                        contarTotalCurtidas(u1.qtdCurtidas())
                ))
                .toList();
    }
}