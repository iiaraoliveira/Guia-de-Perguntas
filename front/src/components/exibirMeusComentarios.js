import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import imagemUser from '../images/icone-usuario.svg'

/* Todos comentários*/
const respostas = [
    {id:1, idUser: 2, idTopico: 1, resposta: 'Uma das primeiras coisas que você pode fazer é adicionar mais RAM, se o seu sistema tiver menos de 8 GB. Isso pode ajudar a melhorar o desempenho em jogos e multitarefa.', data: '07/08/2024'},
    {id:2, idUser: 5, idTopico: 1, resposta: 'Outra solução eficaz e barata é investir num SSD, se você ainda não tiver um. Isso pode acelerar o carregamento dos jogos e reduzir os tempos de espera. ', data: '07/08/2024'},
    {id:3, idUser: 3, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:4, idUser: 3, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:5, idUser: 1, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:6, idUser: 4, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:7, idUser: 2, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:8, idUser: 5, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:9, idUser: 4, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:10, idUser: 3, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:11, idUser: 2, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:12, idUser: 5, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:13, idUser: 2, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:14, idUser: 4, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
    {id:15, idUser: 3, idTopico: 1, resposta: 'Ajustar as configurações gráficas dos jogos também pode fazer uma grande diferença.', data: '07/08/2024'},
]

const usuario = [
    {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iaraC@gmail.com', senha: '1234'},
    {id: 3, nome: 'Vitoria Nobre', email: 'vitoria@gmail.com', senha: '1234'},
    {id: 4, nome: 'Gabriel Santiago', email: 'gabriel@gmail.com', senha: '1234'},
    {id: 5, nome: 'Raquel Duarte', email: 'raquel@gmail.com', senha: '1234'},
    {id: 6, nome: 'João Pedro', email: 'joaop@gmail.com', senha: '1234'},
]
/* Todas as perguntas*/
const topicos = [
    {id: 1, idUser: 1, title: 'Como posso melhorar o desempenho do meu PC para jogos sem gastar muito dinheiro?', description:"O meu PC já tem alguns anos e noto que os jogos mais recentes estão a ter dificuldades de correr bem. Quais são as atualizações mais económicas e eficazes que posso fazer para melhorar o desempenho em jogos? Será que uma atualização de RAM ou uma nova placa gráfica faria a diferença?", data: '06/08/2024'},
    {id: 2, idUser:2, title: 'Alguém mais teve problemas com a última atualização do Windows 11? Como resolvê-los?', description:"Depois de instalar a última atualização do Windows 11, o meu PC começou a ficar lento e algumas aplicações estão a falhar. Já tentei algumas soluções básicas, mas nada parece funcionar. Alguém enfrentou problemas semelhantes e conseguiu resolvê-los?", data: '05/08/2024'},
    {id: 3, idUser: 3, title: 'Existe uma maneira eficiente de migrar todos os meus dados de um iPhone para um Android?', description:"Vou trocar o meu iPhone por um novo dispositivo Android, mas estou preocupado com a migração dos meus dados. Qual é o método mais eficiente para transferir contatos, fotos, mensagens e outras informações importantes de um iPhone para um Android?", data: '06/08/2024'},
    {id: 4, idUser:4, title: 'Quais são os principais benefícios de usar containers como Docker no desenvolvimento de software?', description:"Tenho ouvido falar muito sobre o uso de containers como Docker, mas não estou certo dos benefícios práticos em comparação com outras soluções. Como os containers podem ajudar no desenvolvimento e na gestão de aplicações? Vale a pena aprender a usar Docker?", data: '06/08/2024'},
    {id: 5, idUser:5, title: 'Como posso otimizar o SEO do meu site para melhor performance nos motores de busca?', description:"Tenho um site há algum tempo, mas não estou a conseguir atingir o tráfego que desejo. Quais são as melhores práticas de SEO atualmente para melhorar o ranking do meu site nos motores de busca? Existem ferramentas recomendadas para ajudar nesse processo?", data: '06/08/2024'},
]

const ExibirMeusComments = () => {
    const { id } = useParams();
    const meusComents = respostas.filter(q => q.idUser === parseInt(id));

    const getUserNameById = (idUser) => {
        const user = usuario.find(u => u.id === parseInt(idUser));
        return user? user.nome: 'Usuário desconhecido';
      }
    
    const foundTopicTitle = (idTopico) => 
    { 
        const foundTopic = topicos.find(t => t.id === parseInt(idTopico));   
        return foundTopic? foundTopic.title: 'Usuário desconhecido';
    }

   return(
    <div className="question-detail">
        <div className="answers">
            {meusComents.map(comment => (  
                <div className='question-item column-between'> 
                    <p>{foundTopicTitle(comment.idTopico)}</p>             
                    <div className="row space-between">
                        <div className='row'>
                            <div>
                                <img className='icone-usuario' src={imagemUser}></img>
                            </div>
                            <div>
                                <p className='username'>{getUserNameById(id)}</p>
                                <p className='data'>{comment.data}</p>
                            </div>
                        </div>
                        <h3 className='anwers-text'>{comment.resposta}</h3>
                    </div>
               </div>
            ))}
        </div>
        <Link to='/'><button className='button-voltar'>Voltar</button></Link>
    </div>
   )
  
  
};

export default ExibirMeusComments;
