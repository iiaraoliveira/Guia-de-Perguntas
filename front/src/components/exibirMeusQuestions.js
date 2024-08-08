import React from 'react';
import { useParams, Link } from 'react-router-dom';
import imagemUser from '../images/icone-usuario.svg'

/* Todos comentários*/
const respostas = [
    {id:1, idUser: 1, idTopico: 1, resposta: 'acho que não ein', data: 'today'},
    {id:2, idUser: 1, idTopico: 1, resposta: 'calma calabreso', data: 'today'},
    {id:3, idUser: 2, idTopico: 2, resposta: 'Incrivel', data: 'today'}
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

const ExibirMeusQuestions = () => {
    const { id } = useParams();
    const meusQuestions = topicos.filter(q => q.idUser === parseInt(id));

    const getUserNameById = (idUser) => {
        const user = usuario.find(u => u.id === parseInt(idUser));
        return user? user.nome: 'Usuário desconhecido';
      }

   return(
    <div className="question-detail">
        <div className="answers">
            {meusQuestions.map(question => (                
                    <div className="question-item column-between">
                        <div className='row'>
                            <div>
                                <img className='icone-usuario' src={imagemUser}></img>
                            </div>
                            <div>
                                <p className='username'>{getUserNameById(id)}</p>
                                <p className='data'>{question.data}</p>
                            </div>
                        </div>
                        <h3>{question.title}</h3>
                    </div>
               
            ))}
        </div>
        <Link to='/'><button className='button-voltar'>Voltar</button></Link>
    </div>
   )
  
  
};

export default ExibirMeusQuestions;
