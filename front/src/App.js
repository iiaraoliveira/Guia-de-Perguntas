import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/App.css';
import './styles/Questions.css'
import Header from './components/header';
import QuestionList from './components/questionList';
import ExibirMeusQuestions from './components/exibirMeusQuestions';
import ExibirMeusComments from './components/exibirMeusComentarios';
import QuestionCommentsList from './components/questionComentsList';
import TelaLogin from './pages/TelaLogin';
import TelaCadastro from './pages/TelaCadastro';
import TelaPerfil from './pages/TelaPerfil';
import './components/darkLightMode';

const usuario = [
  {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
  {id: 2, nome: 'Iara Costa', email: 'iara@gmail.com', senha: '1234'},
]

function App() {

  const idLogado = 1;
 
  const [isAutenticado, setIsAutenticado] = useState(false);

  const handleLogin = () => {
    setIsAutenticado(true);
  }

  /* Para não exibir o header nas telas de cadastro e login depois de logado  */
 // const shouldShowHeader = isAutenticado && location.pathname !== '/login' && location.pathname !== '/cadastro';

  return (
    <Router>
    <div className="App">
 
      <main>
        <Routes>
          <Route path="/login" element={<TelaLogin onLogin={handleLogin} />} />
          <Route path="/cadastro" element={<TelaCadastro />} />

          <Route path="/" element={isAutenticado ? <><Header id={idLogado} /> <QuestionList /></> : <Navigate to="/login" />} />
          <Route path="/comments/:idTopic" element={isAutenticado ? <><Header id={idLogado} /> <QuestionCommentsList /> </>: <Navigate to="/login" />} />
          <Route path="/myquestions/:id" element={isAutenticado ? <><Header id={idLogado} /> <ExibirMeusQuestions /></> : <Navigate to="/login" />} />
          <Route path="/mycomments/:id" element={isAutenticado ? <><Header id={idLogado} /> <ExibirMeusComments /></> : <Navigate to="/login" />} />
          <Route path="/perfil/:id" element={isAutenticado ? <><Header id={idLogado} /> <TelaPerfil /></> : <Navigate to="/login" />} />
        </Routes>

      </main>

    </div>
    </Router>
  );
}

export default App;
