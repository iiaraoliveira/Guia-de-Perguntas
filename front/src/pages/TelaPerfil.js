import React from "react";
import '../styles/cadastro.css'
import { useNavigate, Link } from 'react-router-dom';


const TelaPerfil = () => { 

  
    const navigate = useNavigate();

    return (
        <div className="main-cadastro column">
            <div className="row">
                <h1 className="titulo">Meu Perfil</h1>
            </div>
           
                <div className="card-cadastro">
                    <div className="textfieldCadastro">
                        <label for="usuario">Nome de Usuário</label>
                        <input type="text" name="usuario" placeholder="Usuário"/>
                    </div>
                    <div className="textfieldCadastro">
                        <label for="email">Email</label>
                        <input type="text" name="email" placeholder="Email"/>
                    </div>
                    <div className="textfieldCadastro">
                        <label for="password">Senha</label>
                        <input type="password" name="senha" placeholder="Senha"/>   
                    </div>
                    <button className="btn-cadastro" >salvar</button>
                </div>
            
            <Link to='/'><button className='button-voltar'>Voltar</button></Link>
        </div>
    )
}

export default TelaPerfil;