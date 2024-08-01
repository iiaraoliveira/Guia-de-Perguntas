import React from "react";
import '../styles/login.css'
import { useNavigate } from 'react-router-dom';


const TelaLogin = () => { 

    const navigate = useNavigate();

    const handleClickLogar = () => {
        navigate(`/`);
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
                        <input type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="textfield">
                        <label for="password">Senha</label>
                        <input type="password" name="senha" placeholder="Senha"/>   
                    </div>
                    <button className="btn-login" onClick={handleClickLogar}>Login</button>
                </div>
            </div>
        </div>
    )
}
export default TelaLogin;