import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/App.css';
import './styles/Questions.css'
import './styles/modal.css'
import Header from './components/header';
import Home from './pages/Home';
import ExibirMeusQuestions from './components/exibirMeusQuestions';
import ExibirMeusComments from './components/exibirMeusComentarios';
import TelaComentarios from './pages/TelaComentarios';
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
        {
        
        <Routes>
            <Route path="/login" element={<TelaLogin onLogin={handleLogin} />} />
            <Route path="/cadastro" element={<TelaCadastro />} />
            <Route path="/" element={<><Header id={idLogado} /> <Home /></>} />
            <Route path="/comments/:idTopic" element={<><Header id={idLogado} /> <TelaComentarios /></>} />
            <Route path="/myquestions/:id" element={<><Header id={idLogado} /> <ExibirMeusQuestions /></>} />
            <Route path="/mycomments/:id" element={<><Header id={idLogado} /> <ExibirMeusComments /></>} />
            <Route path="/perfil/:id" element={<><Header id={idLogado} /> <TelaPerfil /></>} />
          </Routes>
          }

      </main>

    </div>
    </Router>
  );
}

export default App;
