import React, {useState, useEffect} from "react";
import QuestionComents from "./questionComents";
import { useParams, Link } from "react-router-dom";
import imagemUser from '../images/icone-usuario.svg'

const usuario = [
    {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iara@gmail.com', senha: '1234'},
]

const topicos = [
    {id: 1, idUser: 1, title: 'Blockchain developer best practices on innovationchain', description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book", data: '3 weeks'},
    {id: 2, idUser:2, title: 'Como estilizar um button?', description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book", data: '2 weeks'},
]

const likeTopicos = [
    {id: 1, idUser: 1, idTopico: 1},
    {id: 2, idUser: 2, idTopico: 1},
]

const respostas = [
    { id: 1, idUser: 1, idTopico: 1, resposta: 'acho que não ein', data: 'today' },
    { id: 2, idUser: 2, idTopico: 1, resposta: 'calma calabreso', data: 'today' },
    { id: 3, idUser: 2, idTopico: 2, resposta: 'Incrivel', data: 'today' }
];

const likeRespostas = [
    {id: 1, idUser: 1, idResposta: 1},
]

const QuestionCommentsList = () => {

    const { idTopic } = useParams();

    const [answers, SetAnswers] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [titleTopic, setTitleTopic] = useState('');
    const [subTitleTopic, setSubTitleTopic] = useState('');
    const [dataTopic, setDataTopic] = useState('');
    
   

    const idUserLogged = 1;

    useEffect(() => {

        /*
        const fetchQuestion = async () => {
            try{
                const responde = await axios.get('api)}
                setQuestion(responde.data)
            } catch (error){
                console.log("Error")}
             }

        fetchQuestion();

         */

        /* Retorna o topico a qual estou mostrando os comentários */
        const foundTopic = topicos.find(t => t.id === parseInt(idTopic))
        if(foundTopic){
            setTitleTopic(foundTopic.title);
            setSubTitleTopic(foundTopic.description);
            setDataTopic(foundTopic.data)
        }else{
            setTitleTopic('Título não encontrado!')
        }

        SetAnswers(respostas.filter(resposta => resposta.idTopico === parseInt(idTopic)));
    }, []);

    

    const AddComment = () => {
        
        if (newComment) {
            const newCommentText = {
                id: answers.length + 1,
                idUser: idUserLogged,  
                idTopico: parseInt(idTopic),
                resposta: newComment,
                data: 'today'
            };
            SetAnswers([...answers, newCommentText]);
            setNewComment('');
        }
        };

        const getUserNameById = (userId) => {
            const user = usuario.find(u => u.id === userId);
            return user? user.nome: 'Usuário desconhecido';
          }

    return (
        <div>

             <div className="question-item-detail column-between">
                <h3 className='titulo-question'>{titleTopic}</h3>
                <h4 className="subtitulo-question">{subTitleTopic}</h4>
                <div className='row space-between'>
                    <div className='row'>
                        <div>
                            <img className='icone-usuario' src={imagemUser}></img>
                        </div>   
                        <div>
                            <p className='username'>{getUserNameById(idUserLogged)}</p>
                            <p className='data'>{dataTopic}</p>
                        </div>                 
                    </div>         
                </div>
            </div>

            <div className="answers">
                {answers? (answers.map(a => (
                    <QuestionComents answer={a}/>
                ))):(<div>Nenhum Comentário</div>)}
            </div>

            <div className="public-comment row align-top">
                <img className='icone-usuario' src={imagemUser}></img>
                <input type="text" placeholder="Adicione um comentário" 
                        value={newComment}
                        className='input-text'
                        onChange={(e) => setNewComment(e.target.value)}/>
                <button onClick={AddComment}>Enviar</button>
            </div>
            <Link to='/'><button className='button-voltar'>Voltar</button></Link>

        </div>
    )
};

export default QuestionCommentsList;


