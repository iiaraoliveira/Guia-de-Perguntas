import React, {useState, useEffect} from "react";
import QuestionItem from "./questionItem";
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
    {id:1, idUser: 1, idTopico: 1, resposta: 'acho que não ein', data: 'today'},
    {id:2, idUser: 1, idTopico: 1, resposta: 'calma calabreso', data: 'today'}
]

const likeRespostas = [
    {id: 1, idUser: 1, idResposta: 1},
]

const QuestionList = () => {
    const [topics, SetTopics] = useState([]);
    const [likesTopic, SetLikesTopic] = useState([]);
    const [newQuestionTitle, setNewQuestionTitle] = useState('');
    const [newQuestionDescription, setNewQuestionDescription] = useState('')

    const idUsuario = 1;

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
        SetTopics(topicos);
        SetLikesTopic(likeTopicos);
    }, []);

    /* Criar novo Topico */
    const createNewTopic = () =>{
        if(newQuestionTitle){
            const newQuestionFormat = {
                id: topics.length + 1,
                idUser: idUsuario,
                title: newQuestionTitle,
                description: newQuestionDescription,
                data: 'today'
            };
            SetTopics([...topics, newQuestionFormat]);
            setNewQuestionTitle('');
            setNewQuestionDescription('');
        }     
    }

    return (
        <div>
            
            <div className="public-post row">
                <div>
                    <img className='icone-usuario' src={imagemUser}></img>
                </div>
                <div className="columm">
                    <input type="text" placeholder="Vamos compartilhar o que está acontecendo em sua mente..."
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}/>

                    <input className="subtittle" type="text" placeholder="Descrição do seu problema"
                    value={newQuestionDescription}
                    onChange={(e) => setNewQuestionDescription(e.target.value)}/>
                </div>
                <div>
                    <button className="button" onClick={createNewTopic}>Criar Pergunta</button>
                </div>  
                
            </div>
            
            <div className="question-list">
                {topics.map(topico => (
                    <QuestionItem key={topico.id} topico={topico}/>
                ))}
            </div>

        </div>
    )
};

export default QuestionList;


