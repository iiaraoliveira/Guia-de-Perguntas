import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import imagemUser from '../images/icone-usuario.svg'
import { initializeDarkMode } from './darkLightMode.js';
import Modal from 'react-modal';

const usuario = [
    {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iara@gmail.com', senha: '1234'},
]

// Código necessário para os recursos de acessibilidade
Modal.setAppElement('#root');

const Header = ({id}) => {

     const [User, setUser] = useState('');
     const [idUSer, setIdUser] = useState('');
     const navigate = useNavigate();

    useEffect(() => {
        /* Identificar o usuario logado */
        const foundUser = usuario.find(u => u.id === parseInt(id));
        if (foundUser) {
            setUser(foundUser.nome);
            setIdUser(foundUser.id);
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
                        <p id='titulo-logo'>HiperForúm</p>
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
                                                    <Link to="/perfil/${idUser}"><li>Meu perfil</li></Link>
                                                    <li onClick={handleClickExibirMeusTopicos}>Visualizar meus tópicos</li>
                                                    <li onClick={handleClickExibirMeusComments}>Visualizar meus comentários</li>
                                                    <Link to="/login"><li>Sair</li></Link>                                                  
                                                </ul>
                                             </div>
                          </Modal>
                            
                    </div>

                   

                </div>

            </div>
        </header>
    );
}
    
    

export default Header;