import React from "react";
import '../styles/cadastro.css'


const TelaCadastro = () => { 
    return (
        <div className="main-cadastro">
            <div className="left-cadastro">
                <h1>Faça um cadastro<br/>E entre para nosso time</h1>
                <img src="hand-coding-animate.svg" className="left-cadastro-image" alt="Codando"/>
            </div>
            <div className="right-cadastro">
                <div className="card-cadastro">
                    <h1>cadastro</h1>
                    <div className="textfield">
                        <label for="usuario">Usuário</label>
                        <input type="text" name="usuario" placeholder="Usuário"/>
                    </div>
                    <div className="textfield">
                        <label for="password">Senha</label>
                        <input type="password" name="senha" placeholder="Senha"/>   
                    </div>
                    <button className="btn-cadastro">cadastro</button>
                </div>
            </div>
        </div>
    )
}

export default TelaCadastro;