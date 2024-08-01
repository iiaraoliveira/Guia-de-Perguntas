import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import imagemUser from '../images/icone-usuario.svg'

/* Todos comentários*/
const respostas = [
    {id:1, idUser: 1, idTopico: 1, resposta: 'acho que não ein', data: 'today'},
    {id:2, idUser: 1, idTopico: 1, resposta: 'calma calabreso', data: 'today'},
    {id:3, idUser: 2, idTopico: 2, resposta: 'Incrivel', data: 'today'}
]

const usuario = [
    {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iara@gmail.com', senha: '1234'},
]
/* Todas as perguntas*/
const topicos = [
    {id: 1, idUser: 1, title: 'Blockchain developer best practices on innovationchain', data: '3 weeks'},
    {id: 2, idUser:2, title: 'Como estilizar um button?', data: '2 weeks'},
    
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
