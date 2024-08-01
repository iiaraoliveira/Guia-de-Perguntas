
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import './styles/Questions.css'
import Header from './components/header';
import QuestionList from './components/questionList';
import ExibirMeusQuestions from './components/exibirMeusQuestions';
import ExibirMeusComments from './components/exibirMeusComentarios';
import QuestionCommentsList from './components/questionComentsList';

const usuario = [
  {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
  {id: 2, nome: 'Iara Costa', email: 'iara@gmail.com', senha: '1234'},
]

function App() {
  return (
    
    <Router>
      <div className="App">
            <header className="header">
              <Header id={usuario[0].id} /> {/* suponto o usuario logado localizado no indice 0*/}
            </header>
            <main>
              <Routes>
                  <Route path="/" element={<QuestionList />} />
                  <Route path="/comments/:idTopic" element={<QuestionCommentsList />} />
                  <Route path="/myquestions/:id" element={<ExibirMeusQuestions />} />
                  <Route path="/mycomments/:id" element={<ExibirMeusComments />} />
              </Routes>
           
            </main>
            <footer>

            </footer>
        </div>
    </Router>
  );
}

export default App;
