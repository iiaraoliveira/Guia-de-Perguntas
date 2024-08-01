import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import imagemUser from '../images/icone-usuario.svg'


const likeTopicos = [
    {id: 1, idUser: 1, idTopico: 1},
    {id: 2, idUser: 2, idTopico: 1},
    {id: 3, idUser: 1, idTopico: 2},
]

const respostas = [
    {id:1, idUser: 1, idTopico: 1, resposta: 'acho que não ein', data: 'today'},
    {id:2, idUser: 1, idTopico: 1, resposta: 'calma calabreso', data: 'today'},
    {id:3, idUser: 2, idTopico: 2, resposta: 'Incrivel', data: 'today'}
]

const likeRespostas = [
   {id: 1, idUser: 1, idResposta: 1},
]

const usuario = [
    {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iara@gmail.com', senha: '1234'},
]


const QuestionItem = ({ topico }) => {
  const navigate = useNavigate();

  const idUser = 1;

  /* Contador da quantidade de likes */
  const [contLikesTopic, setContLikesTopic] = useState(likeTopicos);

  /* Encontrar nome do usuario pelo id */
  const [user, setUser] = useState('');

  /* Dar like pelo icone de like na pergunta */
  const [clickLike, setClickLike] = useState(false)

    useEffect(() => {
        /* atualizar numero de likes */
        setContLikesTopic(contLikesTopic);

        /* Encontrar o usuario de cada pergunta */
        const foundUser = usuario.find(u => u.id === topico.idUser);
        if(foundUser){
            setUser(foundUser.nome)
        }

        // verifica se o usuario ja deu like assim retorna true ou false
        const usuarioLiked = contLikesTopic.some(like => like.idUser === idUser && like.idTopico === topico.id); // Supondo idUser 1 como o usuário logado
        setClickLike(usuarioLiked);
        

    }, [ topico.idUser, topico.id, contLikesTopic]);

    /* Direciona para uma pagina contendo só os comentários de cada pergunta */
  const handleQuestionClick = () => {
    navigate(`/comments/${topico.id}`);
  };

    /* Somatório dos likes de uma pergunta */
  const likes = contLikesTopic.reduce((soma, like) => {
    return like.idTopico === topico.id ? soma + 1 : soma;
  }, 0);

  /* Somatório dos comentários de uma pergunta */
  const comentarios = respostas.reduce((soma, coment)=>{
    return coment.idTopico === topico.id? soma + 1: soma;
  }, 0)

  const atualizaLikes = () =>
  {   
    const userId = 1; // Supondo idUser 1 como o usuário logado
    if (clickLike)
      // Se o usuário já deu like, removemos o like 
      {
        // retorna uma nova lista de likes sem o like do usuario logado
        let newLikeTopicos = contLikesTopic.filter(like => !(like.idUser === userId && like.idTopico === topico.id));
        setContLikesTopic(newLikeTopicos);
      } 
      else {
        // se o usuário não deu like, contabilizae cria o novo like
          setContLikesTopic(likeTopicos => [...likeTopicos, { id: likeTopicos.length + 1, idUser: userId, idTopico: topico.id }]);
      }
      setClickLike(!clickLike);
  }
    

  return (
    <div className="question-item column-between" >

      <div className='row space-between' >
        <h3 className='titulo-question click' onClick={handleQuestionClick} >{topico.title}</h3>
        <a onClick={atualizaLikes}>
            { clickLike ? (<svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="15" fill="#2C353D"/>
                    <g filter="url(#filter0_d_3941_181)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.28472 6.28635C5.58205 7.41945 4.26185 11.2488 5.3915 14.5991C7.20862 19.9716 15.0014 24 15.0014 24C15.0014 24 22.8521 19.9096 24.6102 14.5991C25.7388 11.2488 24.4102 7.41945 20.7075 6.28635C18.762 5.69329 16.5332 6.07333 15.0014 7.19843C13.3822 6.04133 11.2324 5.68929 9.28472 6.28635ZM18.7574 9.27342C18.3561 9.17072 17.9476 9.41276 17.8448 9.81404C17.7421 10.2153 17.9842 10.6239 18.3855 10.7266C19.768 11.0804 20.5877 12.009 20.6825 12.9337C20.7247 13.3457 21.093 13.6455 21.5051 13.6032C21.9171 13.561 22.2169 13.1927 22.1747 12.7806C21.9982 11.0605 20.5644 9.73591 18.7574 9.27342Z" fill="#FF6934"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_3941_181" x="1" y="5" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.411765 0 0 0 0 0.203922 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3941_181"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3941_181" result="shape"/>
                    </filter>
                    </defs>
                </svg>) : (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="30" height="30" rx="15" fill="#2C353D"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.28472 6.28635C5.58205 7.41945 4.26185 11.2488 5.3915 14.5991C7.20862 19.9716 15.0014 24 15.0014 24C15.0014 24 22.8521 19.9096 24.6102 14.5991C25.7388 11.2488 24.4102 7.41945 20.7075 6.28635C18.762 5.69329 16.5332 6.07333 15.0014 7.19843C13.3822 6.04133 11.2324 5.68929 9.28472 6.28635ZM18.7574 9.27342C18.3561 9.17072 17.9476 9.41276 17.8448 9.81404C17.7421 10.2153 17.9842 10.6239 18.3855 10.7266C19.768 11.0804 20.5877 12.009 20.6825 12.9337C20.7247 13.3457 21.093 13.6455 21.5051 13.6032C21.9171 13.561 22.2169 13.1927 22.1747 12.7806C21.9982 11.0605 20.5644 9.73591 18.7574 9.27342Z" fill="#C5D0E6"/>
                </svg>
            )
          }
        </a>
      </div>
      
      <div className='row space-between'>
            <div className='row'>
                <div>
                    <img className='icone-usuario' src={imagemUser}></img>
                </div>
                <div>
                    <p className='username'>{user}</p>
                    <p className='data'>{topico.data}</p>
                </div>
            </div>
           
            <div>
                <span className='likes'>{likes} likes </span>
                <span className='comentarios'>{comentarios} comments </span>
            </div>
        
      </div>
      
      
    </div>
  );
};

export default QuestionItem;