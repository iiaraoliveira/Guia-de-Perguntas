import React, { useState, useEffect } from "react";
import '../styles/cadastro.css'
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

const usuario = [
    {id: 1, nome: 'Iara Amancio', email: 'iara@gmail.com', senha: '1234'},
    {id: 2, nome: 'Iara Costa', email: 'iaraC@gmail.com', senha: '1234'},
    {id: 3, nome: 'Vitoria Nobre', email: 'vitoria@gmail.com', senha: '1234'},
    {id: 4, nome: 'Gabriel Santiago', email: 'gabriel@gmail.com', senha: '1234'},
    {id: 5, nome: 'Raquel Duarte', email: 'raquel@gmail.com', senha: '1234'},
    {id: 6, nome: 'João Pedro', email: 'joaop@gmail.com', senha: '1234'},
]

const TelaPerfil = () => { 

    const idUser = useParams();

    const [nomeUSer, setNomeUser] = useState('');
    const [emailUSer, setEmailUser] = useState('');
    const [senhaUSer, setSenhaUSer] = useState('');


    useEffect(()=>{
        /* Encontrar o usuario de cada pergunta */
     const foundUser = usuario.find(u => u.id === parseInt(idUser.id));
     console.log(foundUser)
     if(foundUser){
        console.log('hello')
         setNomeUser(foundUser.nome);
         setEmailUser(foundUser.email);
         setSenhaUSer(foundUser.senha);
     }
     
  
    }, [idUser]);
     
 
    return (
        <div className="main-cadastro column">
            <div className="row">
                <h1 className="titulo">Meu Perfil</h1>
            </div>
           
                <div className="card-perfil">
                    <div className="textfieldCadastro">
                        <label for="usuario">Nome de Usuário</label>
                        <input type="text" name="usuario" placeholder={nomeUSer}/>
                    </div>
                    <div className="textfieldCadastro">
                        <label for="email">Email</label>
                        <input type="text" name="email" placeholder={emailUSer}/>
                    </div>
                    <div className="textfieldCadastro">
                        <label for="password">Senha</label>
                        <input type="password" name="senha" placeholder={senhaUSer}/>   
                    </div>
                    <button className="btn-cadastro" >salvar</button>
                </div>
            
            <Link to='/'><button className='button-voltar'>Voltar</button></Link>
        </div>
    )
}

export default TelaPerfil;