import React, {useState, useEffect} from "react";
import QuestionComents from "../components/questionComents";
import { useParams, Link } from "react-router-dom";
import imagemUser from '../images/icone-usuario.svg'
import { useNavigate } from "react-router-dom";

const usuario = [
    {id: 1, nome: 'João Pedro', email: 'joaopedro@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iaraC@gmail.com', senha: '1234'},
    {id: 3, nome: 'Vitoria Nobre', email: 'vitoria@gmail.com', senha: '1234'},
    {id: 4, nome: 'Gabriel Santiago', email: 'gabriel@gmail.com', senha: '1234'},
    {id: 5, nome: 'Raquel Duarte', email: 'raquel@gmail.com', senha: '1234'},
    {id: 6, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
]

const topicos = [
    {id: 1, idUser: 6, title: 'Como posso melhorar o desempenho do meu PC para jogos sem gastar muito dinheiro?', description:"O meu PC já tem alguns anos e noto que os jogos mais recentes estão a ter dificuldades de correr bem. Quais são as atualizações mais económicas e eficazes que posso fazer para melhorar o desempenho em jogos? Será que uma atualização de RAM ou uma nova placa gráfica faria a diferença?", data: '06/08/2024'},
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
    {id:15, idUser: 3, idTopico: 2, resposta: 'Eu também tive problemas após a última atualização. Uma solução que funcionou para mim foi fazer uma restauração do sistema para um ponto antes da atualização.', data: '07/08/2024'},
]

const likeRespostas = [
    {id: 1, idUser: 1, idResposta: 1},
]

const TelaComentarios = () => {
    const navigate = useNavigate();

    const { idTopic } = useParams();

    const [answers, SetAnswers] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [idUser, setIdUSer] = useState('');
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
            setIdUSer(foundTopic.id);
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

         /* Direciona para uma pagina contendo só os comentários de cada pergunta */
            const directLogin = () => {
                alert('Necessário autenticação');
                navigate(`/login`);
            };

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
                            <p className='username'>{getUserNameById(idUser)}</p>
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
                <button onClick={idUserLogged ==true ?AddComment : directLogin}>Enviar</button>
            </div>
            <Link to='/'><button className='button-voltar'>Voltar</button></Link>

        </div>
    )
};

export default TelaComentarios;


