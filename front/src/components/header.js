import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import imagemUser from '../images/icone-usuario.svg';
import medalhaBronze from '../images/bronze-medal.png';
import medalhaPrata from '../images/silver-medal.png';
import medalhaOuro from '../images/gold-medal.png';
import medalhaDiamante from '../images/diammedal.png';
import { initializeDarkMode } from './darkLightMode.js';
import Modal from 'react-modal';

const usuario = [
    {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iaraC@gmail.com', senha: '1234'},
    {id: 3, nome: 'Vitoria Nobre', email: 'vitoria@gmail.com', senha: '1234'},
    {id: 4, nome: 'Gabriel Santiago', email: 'gabriel@gmail.com', senha: '1234'},
    {id: 5, nome: 'Raquel Duarte', email: 'raquel@gmail.com', senha: '1234'},
    {id: 6, nome: 'João Pedro', email: 'joao@gmail.com', senha: '1234'},
]

const topicos = [
    {id: 1, idUser: 1, title: 'Como posso melhorar o desempenho do meu PC para jogos sem gastar muito dinheiro?', description:"O meu PC já tem alguns anos e noto que os jogos mais recentes estão a ter dificuldades de correr bem. Quais são as atualizações mais económicas e eficazes que posso fazer para melhorar o desempenho em jogos? Será que uma atualização de RAM ou uma nova placa gráfica faria a diferença?", data: '06/08/2024'},
    {id: 2, idUser:2, title: 'Alguém mais teve problemas com a última atualização do Windows 11? Como resolvê-los?', description:"Depois de instalar a última atualização do Windows 11, o meu PC começou a ficar lento e algumas aplicações estão a falhar. Já tentei algumas soluções básicas, mas nada parece funcionar. Alguém enfrentou problemas semelhantes e conseguiu resolvê-los?", data: '05/08/2024'},
    {id: 3, idUser: 3, title: 'Existe uma maneira eficiente de migrar todos os meus dados de um iPhone para um Android?', description:"Vou trocar o meu iPhone por um novo dispositivo Android, mas estou preocupado com a migração dos meus dados. Qual é o método mais eficiente para transferir contatos, fotos, mensagens e outras informações importantes de um iPhone para um Android?", data: '06/08/2024'},
    {id: 4, idUser:4, title: 'Quais são os principais benefícios de usar containers como Docker no desenvolvimento de software?', description:"Tenho ouvido falar muito sobre o uso de containers como Docker, mas não estou certo dos benefícios práticos em comparação com outras soluções. Como os containers podem ajudar no desenvolvimento e na gestão de aplicações? Vale a pena aprender a usar Docker?", data: '06/08/2024'},
    {id: 5, idUser:5, title: 'Como posso otimizar o SEO do meu site para melhor performance nos motores de busca?', description:"Tenho um site há algum tempo, mas não estou a conseguir atingir o tráfego que desejo. Quais são as melhores práticas de SEO atualmente para melhorar o ranking do meu site nos motores de busca? Existem ferramentas recomendadas para ajudar nesse processo?", data: '06/08/2024'},
]

const likeTopicos = [
    {id: 1, idUser: 1, idTopico: 1},
    {id: 2, idUser: 2, idTopico: 1},
    {id: 3, idUser: 3, idTopico: 1},
    {id: 4, idUser: 4, idTopico: 1},
    {id: 5, idUser: 5, idTopico: 1},
    {id: 6, idUser: 6, idTopico: 1},
    {id: 7, idUser: 7, idTopico: 1},
    {id: 8, idUser: 8, idTopico: 1},
    {id: 9, idUser: 9, idTopico: 1},
    {id: 10, idUser: 10, idTopico: 1},
    {id: 11, idUser: 11, idTopico: 1},
    {id: 12, idUser: 12, idTopico: 1},
    {id: 13, idUser: 13, idTopico: 1},
    {id: 14, idUser: 14, idTopico: 1},
    {id: 15, idUser: 15, idTopico: 1},
    {id: 16, idUser: 16, idTopico: 1},
    {id: 17, idUser: 17, idTopico: 1},
    {id: 18, idUser: 18, idTopico: 1},
    {id: 19, idUser: 19, idTopico: 1},
    {id: 20, idUser: 20, idTopico: 1},
    {id: 21, idUser: 21, idTopico: 1},
    {id: 22, idUser: 22, idTopico: 1},
    {id: 23, idUser: 23, idTopico: 1},
    {id: 24, idUser: 24, idTopico: 1},
    {id: 25, idUser: 25, idTopico: 1},
    {id: 26, idUser: 26, idTopico: 1},
    {id: 27, idUser: 27, idTopico: 1},
    {id: 28, idUser: 28, idTopico: 1},
    {id: 29, idUser: 29, idTopico: 1},
    {id: 30, idUser: 30, idTopico: 1},
    {id: 31, idUser: 31, idTopico: 1},
]

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

// Código necessário para os recursos de acessibilidade
Modal.setAppElement('#root');

const Header = ({id}) => {

     const [User, setUser] = useState('');
     const [idUSer, setIdUser] = useState('');
     const [totalLikes, setTotalLikes] = useState(0);
     const [totalComentarios, setTotalComentarios] = useState(0);
     const [medalha, setMedalha] = useState(null);
     const navigate = useNavigate();

    /* 0 se o usuario não tiver autenticado ou o id caso esteja autenticado*/
    const idUserLogged = 1;

    useEffect(() => {
        /* Identificar o usuario logado */
        const foundUser = usuario.find(u => u.id === parseInt(id));
        if (foundUser) {
            setUser(foundUser.nome);
            setIdUser(foundUser.id);
        }

        const topicosUser = topicos.find(t => t.idUser === parseInt(id));

        // Obter o número de likes para o tópico atual
        const likes = likeTopicos.filter(like => like.idTopico === topicosUser.id).length;
        setTotalLikes(likes);

        // Obter o número de comentários para o tópico atual
        const comentarios = respostas.filter(resposta => resposta.idTopico === topicosUser.id).length;
        setTotalComentarios(comentarios);

        // Calcular a pontuação total
        const totalPontos = likes + comentarios;

        // Definir qual medalha exibir com base na pontuação total
        
        if (likes >= 126 && comentarios >= 54) {
            setMedalha(medalhaDiamante);
        } else if (likes >= 90 && comentarios >= 36) {
            setMedalha(medalhaOuro);
        } else if (likes >= 45 && comentarios >= 18){
            setMedalha(medalhaPrata);
        } else if (likes >= 27 && comentarios >= 9){
            setMedalha(medalhaBronze)
        } else{
            setMedalha(null);
        }
        // Chama a função de inicialização do modo escuro/claro
        initializeDarkMode();

    }, [id]);
    
    /* exibir meus tópicos */
    const handleClickExibirMeusTopicos = () => {
        navigate(`/myquestions/${id}`);
      };

    /* exibir meus comentários */
    const handleClickExibirMeusComments = () => {
        navigate(`/mycomments/${id}`);
      };

      
    // Hook que demonstra se a modal está aberta ou não
    const [modalIsOpen, setIsOpen] = React.useState(false);

     // Função que abre a modal
    function openModal() {
        setIsOpen(true);
    }

    // Função que fecha a modal
    function closeModal() {
        setIsOpen(false);
    }

       /* Direciona para uma pagina contendo só os comentários de cada pergunta */
    const directLogin = () => {
        alert('Necessário autenticação');
        navigate(`/login`);
    };


    return(
        <header> 
            <div className='header-content'>

                <div className="header-itens">
                    <div className='logo'>
                        <Link className="icone-logo" to="/">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="30" height="30" rx="6" fill="#F7F7F7"/>
                                <path d="M9.55866 18.0086C9.39479 18.0086 9.26071 17.9626 9.15642 17.8705C9.05214 17.7784 9 17.66 9 17.5154V4.49326C9 4.34857 9.05214 4.23019 9.15642 4.13811C9.26071 4.04604 9.39479 4 9.55866 4H12.419C12.5829 4 12.7169 4.04604 12.8212 4.13811C12.9255 4.23019 12.9777 4.34857 12.9777 4.49326V8.89315C13.3799 8.48539 13.8715 8.16312 14.4525 7.92636C15.0484 7.67644 15.7337 7.55148 16.5084 7.55148C17.3724 7.55148 18.1397 7.72248 18.8101 8.06447C19.4953 8.40647 20.0317 8.91288 20.419 9.58372C20.8063 10.2414 21 11.0503 21 12.0106V17.5154C21 17.66 20.9479 17.7784 20.8436 17.8705C20.7393 17.9626 20.6052 18.0086 20.4413 18.0086H17.5587C17.4097 18.0086 17.2756 17.9626 17.1564 17.8705C17.0521 17.7784 17 17.66 17 17.5154V12.1289C17 11.5107 16.8287 11.0372 16.486 10.7084C16.1583 10.3664 15.6667 10.1954 15.0112 10.1954C14.4004 10.1954 13.9088 10.3664 13.5363 10.7084C13.1639 11.0372 12.9777 11.5107 12.9777 12.1289V17.5154C12.9777 17.66 12.9255 17.7784 12.8212 17.8705C12.7169 17.9626 12.5829 18.0086 12.419 18.0086H9.55866Z" fill="#1E252B"/>
                                <path d="M23 20.5102C20.6988 22.7292 18.5 24 15 24C11.7138 24 9.08988 22.5253 7 20.5102" stroke="#1E252B" stroke-width="3" stroke-linecap="round"/>
                            </svg>

                        </Link>
                        <p id='titulo-logo'>AnswerHub</p>
                    </div>
                    
                </div>

                <form>
                    <fieldset>
                        <input type='text' placeholder='Digite o que você procura'></input>
                        <button type='input'>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="9" r="8" stroke="#858EAD" stroke-width="2"/>
                                <path d="M15.5 15.5L19.5 19.5" stroke="#858EAD" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </fieldset>
                </form>

                <div class="colormode" id="colormode">
                    <div class="indicador"></div>
                </div>

                <div className='header-itens'>
                    
                    <Link className='icone icone-home' to="/">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="40" rx="7" fill="#FF4401"/>
                                <g clip-path="url(#clip0_3897_50)">
                                <path d="M29.3441 17.5198L20.8801 10.3395C20.639 10.121 20.3253 10 19.9999 10C19.6746 10 19.3608 10.121 19.1198 10.3395L10.6567 17.5199C10.45 17.7071 10.2848 17.9355 10.1718 18.1905C10.0588 18.4454 10.0004 18.7211 10.0004 19V29.3357C10.0004 29.5119 10.0703 29.6808 10.1949 29.8054C10.3195 29.93 10.4884 30 10.6646 30L16.0004 30C16.5527 30 17.0004 29.5523 17.0004 29V25C17.0004 24.436 17.5525 23.9788 18.1167 23.9788H21.8832C22.4475 23.9788 23.0004 24.436 23.0004 25V29C23.0004 29.5523 23.4481 30 24.0004 30H29.3362C29.5123 30 29.6813 29.93 29.8058 29.8054C29.9304 29.6808 30.0004 29.5119 30.0004 29.3357V19C30.0003 18.7211 29.9419 18.4454 29.8289 18.1904C29.7158 17.9355 29.5507 17.7071 29.3441 17.5198Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_3897_50">
                                <rect width="20" height="20" fill="white" transform="translate(10 10)"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    
                    <div className='section-user'>
                        {
                            idUserLogged > 0
                            ?
                            <div>
                                <button className='dropdraw' onClick={openModal}>
                                    
                                    <img className='icone-usuario' src={imagemUser}></img>
                                    <span className="username">{User}</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 6H6C5.17595 6 4.70557 6.94076 5.2 7.6L9.2 12.9333C9.6 13.4667 10.4 13.4667 10.8 12.9333L14.8 7.6C15.2944 6.94076 14.824 6 14 6Z" fill="#F4F6F8"/>
                                    </svg>
                                </button>
                                <Modal className="modalMeuPerfil"
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel='modal de deletar topico'
                                style={{overlay: {
                                    backgroundColor: 'rgba(0, 0 ,0, 0.8)'},}}>
                                                <div>
                                                    <ul>
                                                        <span> {medalha ? (
                                                            <div className='align-center'>
                                                                <img src={medalha} alt="Medalha" style={{ width: '50px', height: '50px' }} />
                                                                <p className='likes'>{totalLikes}likes e {totalComentarios} comentários</p>
                                                            </div>
                                                            
                                                            ) : (
                                                                <p>Sem medalha</p>
                                                            )}
                                                            
                                                        </span> 
                                                        <Link to={`/perfil/${id}`}><li>Meu perfil</li></Link>
                                                        <li onClick={handleClickExibirMeusTopicos}>Visualizar meus tópicos</li>
                                                        <li onClick={handleClickExibirMeusComments}>Visualizar meus comentários</li>
                                                        <Link to={`/login`}><li>Sair</li></Link>                                                 
                                                    </ul>
                                                </div>
                            </Modal>
                        </div>
                        :
                        <div>
                            <button className='button-cadastro' onClick={directLogin}>        
                                        <span>Se cadastre</span>                                                   
                            </button>                           
                        </div>

                        }
                            
                            
                            
                    </div>

                   

                </div>

            </div>
        </header>
    );
}
    
    

export default Header;