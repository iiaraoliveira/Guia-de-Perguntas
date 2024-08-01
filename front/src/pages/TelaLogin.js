import React, { useEffect , useState } from "react";
import '../styles/login.css'
import { useNavigate, Link } from 'react-router-dom';


const TelaLogin = ({onLogin}) => { 

    const emailUser = 'iara@gmail.com';
    const senhaUser = '1234';

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleClickLogar = () => {
         // Simulando autenticação
         if (email === emailUser && senha === senhaUser) {
            onLogin(); // Atualiza estado de autenticação no componente pai
            navigate('/'); // Redireciona para a rota principal após o login
        } else {
            alert('Email ou senha incorretos');
        }
    };

    return (
        <div className="main-login">
            <div className="left-login">
                <h1>Faça um login<br/>E entre para nosso time</h1>
            </div>
            <div className="right-login">
                <div className="card-login">
                    <h1>LOGIN</h1>
                    <div className="textfield">
                        <label for="usuario">Email</label>
                        <input value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="textfield">
                        <label for="password">Senha</label>
                        <input value={senha} 
                        onChange={(e) => setSenha(e.target.value)}
                        type="password" name="senha" placeholder="Senha"/>   
                    </div>
                    <button className="btn-login" onClick={handleClickLogar}>Login</button>
                    <Link to="/cadastro" className="link">Clique aqui para se cadastrar</Link>
                </div>
            </div>
        </div>
    )
}
export default TelaLogin;