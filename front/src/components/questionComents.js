import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imagemUser from '../images/icone-usuario.svg';
import Modal from 'react-modal';

/* Todos os comentários */
const respostas = [
    { id: 1, idUser: 1, idTopico: 1, resposta: 'acho que não ein', data: 'today' },
    { id: 2, idUser: 2, idTopico: 1, resposta: 'calma calabreso', data: 'today' },
    { id: 3, idUser: 2, idTopico: 2, resposta: 'Incrivel', data: 'today' }
];

/* Todas as perguntas */
const topicos = [
    {id: 1, idUser: 1, title: 'Como posso melhorar o desempenho do meu PC para jogos sem gastar muito dinheiro?', description:"O meu PC já tem alguns anos e noto que os jogos mais recentes estão a ter dificuldades de correr bem. Quais são as atualizações mais económicas e eficazes que posso fazer para melhorar o desempenho em jogos? Será que uma atualização de RAM ou uma nova placa gráfica faria a diferença?", data: '06/08/2024'},
    {id: 2, idUser:2, title: 'Alguém mais teve problemas com a última atualização do Windows 11? Como resolvê-los?', description:"Depois de instalar a última atualização do Windows 11, o meu PC começou a ficar lento e algumas aplicações estão a falhar. Já tentei algumas soluções básicas, mas nada parece funcionar. Alguém enfrentou problemas semelhantes e conseguiu resolvê-los?", data: '05/08/2024'},
    {id: 3, idUser: 3, title: 'Existe uma maneira eficiente de migrar todos os meus dados de um iPhone para um Android?', description:"Vou trocar o meu iPhone por um novo dispositivo Android, mas estou preocupado com a migração dos meus dados. Qual é o método mais eficiente para transferir contatos, fotos, mensagens e outras informações importantes de um iPhone para um Android?", data: '06/08/2024'},
    {id: 4, idUser:4, title: 'Quais são os principais benefícios de usar containers como Docker no desenvolvimento de software?', description:"Tenho ouvido falar muito sobre o uso de containers como Docker, mas não estou certo dos benefícios práticos em comparação com outras soluções. Como os containers podem ajudar no desenvolvimento e na gestão de aplicações? Vale a pena aprender a usar Docker?", data: '06/08/2024'},
    {id: 5, idUser:5, title: 'Como posso otimizar o SEO do meu site para melhor performance nos motores de busca?', description:"Tenho um site há algum tempo, mas não estou a conseguir atingir o tráfego que desejo. Quais são as melhores práticas de SEO atualmente para melhorar o ranking do meu site nos motores de busca? Existem ferramentas recomendadas para ajudar nesse processo?", data: '06/08/2024'},
]

/* Usuarios */
const usuario = [
    {id: 1, nome: 'João Pedro', email: 'joaopedro@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iaraC@gmail.com', senha: '1234'},
    {id: 3, nome: 'Vitoria Nobre', email: 'vitoria@gmail.com', senha: '1234'},
    {id: 4, nome: 'Gabriel Santiago', email: 'gabriel@gmail.com', senha: '1234'},
    {id: 5, nome: 'Raquel Duarte', email: 'raquel@gmail.com', senha: '1234'},
    {id: 6, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
]

const likeRespostas = [
    {id: 1, idUser: 1, idResposta: 1},
    {id: 1, idUser: 2, idResposta: 2},
    {id: 1, idUser: 5, idResposta: 2},
    {id: 1, idUser: 4, idResposta: 5},
    {id: 1, idUser: 3, idResposta: 6},
    {id: 1, idUser: 1, idResposta: 9},
]

const QuestionComents = ({ answer }) => {
    const navigate = useNavigate();
    const [contLikesComment, setContLikesComment] = useState(likeRespostas);
    const [clickLike, setClickLike] = useState(false);

    /* 0 se o usuario não tiver autenticado ou o id caso esteja autenticado*/
    const idUserLogged = 1;

    useEffect(() => {
        const userLiked = contLikesComment.some(like => like.idUser === idUserLogged && like.idResposta === answer.id);
        setClickLike(userLiked);
    }, [contLikesComment, answer.id, idUserLogged]);

    const likes = contLikesComment.reduce((soma, like) => {
        return like.idResposta === answer.id ? soma + 1 : soma;
    }, 0);

    const updateLikes = () => {
        if (clickLike) {
            setContLikesComment(prevLikes => prevLikes.filter(like => !(like.idUser === idUserLogged && like.idResposta === answer.id)));
        } else {
            setContLikesComment(prevLikes => [...prevLikes, { id: prevLikes.length + 1, idUser: idUserLogged, idResposta: answer.id }]);
        }
        setClickLike(!clickLike);
    };

    const getUserNameById = (userId) => {
        const user = usuario.find(u => u.id === userId);
        return user ? user.nome : 'Usuário desconhecido';
    };

    /* Direciona para uma pagina contendo só os comentários de cada pergunta */
  const directLogin = () => {
    alert('Entre em sua conta ou se cadastre!');
    navigate(`/login`);
  };

    // Hook que demonstra se a modal está aberta ou não
  const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
  const [modalIsOpenDelete, setIsOpenDelete] = React.useState(false);

  // Função que abre a modal
  function openModal() {
    setIsOpenEdit(true);
  }

  // Função que fecha a modal
  function closeModal() {
    setIsOpenEdit(false);
  }

  // Função que abre a modal
  function openModalDelete() {
    setIsOpenDelete(true);
  }

  // Função que fecha a modal
  function closeModalDelete() {
    setIsOpenDelete(false)
  }

    return (
        <div className="question-detail">
            <div className="answers">
                <div className="comment column-between">

                      <div className='row space-between'>
                        <div className='row'>
                            <div>
                                <img className='icone-usuario' src={imagemUser} alt="User Icon" />
                            </div>
                            <div>
                                <p className='username'>{getUserNameById(answer.idUser)}</p>
                                <p className='data'>{answer.data}</p>
                            </div>
                        </div>
                        <div className='column align-left'>
                            {answer.idUser === idUserLogged? 
                              (<div className='row'>
                                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64458 1.16667H11.5261V2.33333H0V1.16667H2.88153L3.84633 0H7.67981L8.64458 1.16667ZM2.68944 14C1.8441 14 1.15261 13.3017 1.15261 12.4479V3.5H10.3735V12.4479C10.3735 13.3017 9.682 14 8.8367 14H2.68944Z" fill="white"/>
                                  </svg>
                                  <a onClick={openModalDelete} className='click'>Delete</a>
                                  <Modal
                                        className="modal-edit"
                                        isOpen={modalIsOpenDelete}
                                        onRequestClose={closeModalDelete}
                                        contentLabel='modal de deletar topico'
                                        style={{overlay: {
                                            backgroundColor: 'rgba(0, 0 ,0, 0.8)'},}}>
                                            <div className='align-center'>
                                                <h2>Certeza que deseja deletar esse comentário?</h2>
                                                <button type='submit'>Confirmar</button>
                                            </div>
                                </Modal>

                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0813 0.474468L13.4788 2.87199C14.1491 3.51055 14.1765 4.57097 13.5401 5.24327L5.66499 13.1184C5.37977 13.4012 5.00593 13.5773 4.60623 13.6171L0.957442 13.9496H0.878691C0.646111 13.951 0.422565 13.8596 0.257434 13.6959C0.0728398 13.5119 -0.0201832 13.2553 0.00368177 12.9959L0.379936 9.34706C0.419753 8.94736 0.595858 8.57352 0.878691 8.2883L8.75377 0.413217C9.43263 -0.160306 10.4336 -0.133966 11.0813 0.474468ZM8.15877 3.4495L10.5038 5.79452L12.2538 4.08826L9.86504 1.69948L8.15877 3.4495Z" fill="white"/>
                                  </svg>
                                  <a onClick={openModal} className='click'>Edit</a>
                                  <Modal
                                    className="modal-edit"
                                    isOpen={modalIsOpenEdit}
                                    onRequestClose={closeModal}
                                    contentLabel='modal de editar topico'
                                    style={{overlay: {
                                      backgroundColor: 'rgba(0, 0 ,0, 0.8)'
                                    },}}>
                                    <form className='form-edit'>
                                       <h1>Edite sua Pergunta</h1>
                                        <fieldset>
                                            <label>Pergunta</label>
                                            <input
                                              type='text' 
                                              placeholder={answer.resposta}>
                                            </input>
                                        </fieldset>
                                        <button onClick="EditTopic" type='submit'>Confirmar</button>
                                    </form>           
                                </Modal>
                              </div>)
                              : 
                              ''
                            }
                            <div className='align-left'>
                              <span className='likes'>{likes} likes </span>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className='row space-between'>
                        <p className='anwers-text'>{answer.resposta}</p>
                        {
                            idUserLogged == true
                            ?
                            <a onClick={updateLikes}>
                                {clickLike ? (
                                    <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="30" height="30" rx="15" fill="#2C353D" />
                                        <g filter="url(#filter0_d_3941_181)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.28472 6.28635C5.58205 7.41945 4.26185 11.2488 5.3915 14.5991C7.20862 19.9716 15.0014 24 15.0014 24C15.0014 24 22.8521 19.9096 24.6102 14.5991C25.7388 11.2488 24.4102 7.41945 20.7075 6.28635C18.762 5.69329 16.5332 6.07333 15.0014 7.19843C13.3822 6.04133 11.2324 5.68929 9.28472 6.28635ZM18.7574 9.27342C18.3561 9.17072 17.9476 9.41276 17.8448 9.81404C17.7421 10.2153 17.9842 10.6239 18.3855 10.7266C19.768 11.0804 20.5877 12.009 20.6825 12.9337C20.7247 13.3457 21.093 13.6455 21.5051 13.6032C21.9171 13.561 22.2169 13.1927 22.1747 12.7806C21.9982 11.0605 20.5644 9.73591 18.7574 9.27342Z" fill="#FF6934" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_3941_181" x="1" y="5" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                <feOffset dy="4" />
                                                <feGaussianBlur stdDeviation="2" />
                                                <feComposite in2="hardAlpha" operator="out" />
                                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.411765 0 0 0 0 0.203922 0" />
                                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3941_181" />
                                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3941_181" result="shape" />
                                            </filter>
                                        </defs>
                                    </svg>
                                    ) : (
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30" height="30" rx="15" fill="#2C353D" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M9.28472 6.28635C5.58205 7.41945 4.26185 11.2488 5.3915 14.5991C7.20862 19.9716 15.0014 24 15.0014 24C15.0014 24 22.8521 19.9096 24.6102 14.5991C25.7388 11.2488 24.4102 7.41945 20.7075 6.28635C18.762 5.69329 16.5332 6.07333 15.0014 7.19843C13.3822 6.04133 11.2324 5.68929 9.28472 6.28635ZM18.7574 9.27342C18.3561 9.17072 17.9476 9.41276 17.8448 9.81404C17.7421 10.2153 17.9842 10.6239 18.3855 10.7266C19.768 11.0804 20.5877 12.009 20.6825 12.9337C20.7247 13.3457 21.093 13.6455 21.5051 13.6032C21.9171 13.561 22.2169 13.1927 22.1747 12.7806C21.9982 11.0605 20.5644 9.73591 18.7574 9.27342Z" fill="#C5D0E6" />
                                        </svg>
                                    )}
                            </a>
                            :
                            <a onClick={directLogin}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="30" height="30" rx="15" fill="#2C353D" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.28472 6.28635C5.58205 7.41945 4.26185 11.2488 5.3915 14.5991C7.20862 19.9716 15.0014 24 15.0014 24C15.0014 24 22.8521 19.9096 24.6102 14.5991C25.7388 11.2488 24.4102 7.41945 20.7075 6.28635C18.762 5.69329 16.5332 6.07333 15.0014 7.19843C13.3822 6.04133 11.2324 5.68929 9.28472 6.28635ZM18.7574 9.27342C18.3561 9.17072 17.9476 9.41276 17.8448 9.81404C17.7421 10.2153 17.9842 10.6239 18.3855 10.7266C19.768 11.0804 20.5877 12.009 20.6825 12.9337C20.7247 13.3457 21.093 13.6455 21.5051 13.6032C21.9171 13.561 22.2169 13.1927 22.1747 12.7806C21.9982 11.0605 20.5644 9.73591 18.7574 9.27342Z" fill="#C5D0E6" />
                                </svg>
                            </a>
                            
                        }
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default QuestionComents;
