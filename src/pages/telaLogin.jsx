import React from "react";
import '../styles/login.css'

const TelaLogin = () => { 
    return (
        <div className="main-login">
            <div className="left-login">
                <h1>Faça um login<br/>E entre para nosso time</h1>
                <img src="hand-coding-animate.svg" className="left-login-image" alt="Codando"/>
            </div>
            <div className="right-login">
                <div className="card-login">
                    <h1>LOGIN</h1>
                    <div className="textfield">
                        <label for="usuario">Usuário</label>
                        <input type="text" name="usuario" placeholder="Usuário"/>
                    </div>
                    <div className="textfield">
                        <label for="password">Senha</label>
                        <input type="password" name="senha" placeholder="Senha"/>   
                    </div>
                    <button className="btn-login">Login</button>
                </div>
            </div>
        </div>
    )
}
export default TelaLogin;