import React, { useState } from "react";
import '../styles/cadastro.css'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const TelaCadastro = ({onLogin}) => { 
    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleClickCadastrar = async () => {
       try {
        const response = await axios.post('http://localhost:8080/publico/criar', {
            nome,
            login,
            senha
        });

        navigate('/login');
       } catch (error) {
        console.log('Erro ao cadastrar', error);
       }
    };

    return (
        <div className="main-cadastro">
            <div className="left-cadastro">
                <h1>Faça um cadastro<br/>E entre para nosso time</h1>
                <Link to="/login"><button className="btn-voltar"  onClick={() => navigate('/login')}>Voltar</button></Link>
                
            </div>
            <div className="right-cadastro">
                <div className="card-cadastro">
                    <h1>Cadastre-se</h1>
                    <div className="textfieldCadastro">
                        <label for="login">Nome</label>
                        <input type="text" id="login" name="login" placeholder="Nome" value={login}
                            onChange={(e) => setLogin(e.target.value)}/>
                    </div>
                    <div className="textfieldCadastro">
                        <label htmlFor="nome">Usuário</label>
                        <input type="text" id="nome" name="nome" placeholder="Usuário" value={nome}
                            onChange={(e) => setNome(e.target.value)}/>
                    </div>
                    <div className="textfieldCadastro">
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="senha" placeholder="Senha" value={senha}
                            onChange={(e) => setSenha(e.target.value)}/>   
                    </div>
                    <button className="btn-cadastro" onClick={handleClickCadastrar}>Cadastrar</button>
                </div>
            </div>
        </div>
    )
}

export default TelaCadastro;