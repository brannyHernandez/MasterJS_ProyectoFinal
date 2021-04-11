import React from 'react';
import './Login.css';

//* Imports
import { Redirect } from 'react-router-dom';
import logo from '../../assets/logo192.png';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import $ from 'jquery';

//* Components
import environment from '../../services/API';
import Storage from '../../helpers/Storage';


class AppLogin extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user       : Storage.getUser(),
            email       :'',
            password    :'',
            login       :false,
            error       :'',
            timer       :5,
            API_URL     :`${environment.API}/login.php`,
        }

        this.handleChange   = this.handleChange.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this);
    }

/**
 * Método que modifica la propiedad 'login'= true en caso de que este, se encuentre logeado.
 */
    componentDidMount = ()=> {
        if(this.state.user){
            this.setState({
                login: true,
            });
        }
     }


/**
 * Método encargado de validar el resultado de la respuesta del login proveniente de la API.
 * @param - recibe un objeto que contiene la respuesta de la API.
 * @return - El estado (boleean) de login del usuario.
 */
    userValid = (result)=>{
        let connected = false;
        let message = "";

        if(result['STATUS']){
            if(result['STATUS']==="OK"){
                connected = true;
            }
    
            if(result['STATUS']==="ERROR"){
                switch(result['CODE']){
                    case "401": 
                        message = `<strong>Atención</strong> No se encontró ningún usuario con el E-mail '${this.state.email}' ingresado. Por favor, revisa el e-mail y/o contraseña ingresados.`;
                        break;
                    case "200":
                        message = `<strong>Atención</strong> La cuenta '${this.state.email}' aún no se encuentra activada. Por favor, revisa el e-mail de confirmación.`;
                        break;
                    default: message = `Ocurrio un error desconocido. Por favor, contáctese con el administrador.`;
                        break;
                }
    
                $("#msg-container > p").html(message);
                $("#msg-container").slideDown('slow');
            }
        }else{
            message = `Ocurrio un error desconocido, contactarse con el administrador.`;
            $("#msg-container > p").html(message);
            $("#msg-container").slideDown('slow');
        }
        return connected;
    }


 /**
 * Método que asigna valores de forma computada a las propiedades 'email' y 'password' del objecto de la clase.
 * @param - recibe un objeto que contiene la propiedad y el valor que se le debe asignar.
 */
    handleChange({type, value}){
        this.setState({
            [type] : value
        });

        $("#msg-container").slideUp('slow');
    }


 /**
 * Método encargado de desplegar un contador decreciente de segundos, una vez que se valida 
 * el usuario contra la API, siendo este redireccionado a su página (Profile).
 */
    setTimer = ()=>{
        let segundos = this.state.timer;
        let timerId = setInterval(()=>{
            segundos -= 1;

            if(segundos===0){
                clearTimeout(timerId);
                this.setState({
                    login: true,
                });
            }
            this.setState({
                timer: segundos,
            });
        }, 1000);
    }


 /**
 * Método encargado de submit del formulario para el envío de datos de login a la API.
 */
    handleSubmit(event){
        const { email, password} = this.state;

        if (!(email && password)) {
            return;
        }

       $("#msg-container").slideUp('fast'); 
       $("#icon_loading").fadeIn('slow');

       // Se genera la estructura de formulario para su envío
       var formData = new FormData();
       formData.append('ACCION', "login");
       formData.append('email', email);
       formData.append('password', password);
       
        fetch(this.state.API_URL, {
                method: 'POST',
                body: formData
            }).then((response) => {
   
            return response.json();
        })
        .then((result) => {
            $("#icon_loading").fadeOut('slow'); 
            
            if(this.userValid(result)){
                const {id, nombre, email, avatar} = result['USER'];

                Storage.setUser(JSON.stringify({
                    ID:id,
                    Nombre:nombre,  
                    Email:email, 
                    Avatar:avatar 
                }));

                $('#msg-container-ok').fadeIn('slow', ()=>{
                    this.setTimer();
                });
            }
        })
        .catch(error => console.log(error)); 
    }

    
    render(){

        if(this.state.login){
            return <Redirect to="/Profile"/>
        }

        return (
            <div className="AppLogin-container">
                
                <div className="AppLogin-header">
                    <img src={logo} alt='logo login'></img>
                    <p>Inicia sesion con tu cuenta </p>
                        <span>Consumo de API para login de usuario y la utilización de las funciones:
                         setInterval() y Window.localStorage.</span>
                </div>
               
            <Paper elevation={3} style={{padding: 15}}>
                <div className="AppLogin-container">
                    <TextField
                        label="E-mail"
                        style={{ marginBottom: 18 }}
                        variant="outlined"
                        size="small"
                        onChange={(e)=>
                            this.handleChange({
                                type: "email", 
                                value: e.target.value
                            })}
                    />
                    
                    <TextField
                        label="Password"
                        style={{ marginBottom: 18 }}
                        variant="outlined"
                        size="small"
                        type = "password"
                        onChange={(e)=>
                            this.handleChange({
                                type: "password", 
                                value:e.target.value
                            })}
                        />

                    <Button
                        label="Iniciar Sesion"
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        style={{ textTransform: "none" }}>
                            Iniciar Sesion 
                        <div id="icon_loading" class="lds-dual-ring" style={{display: 'none'}}></div>
                    </Button>

                    <p style={{paddingTop: '20px'}}>
                        Usuarios válidos API (Email/Pass):<br/>
                        <ul>
                            <li>jorellana@gmail.com/123456</li>
                            <li>branny@live.cl/123456</li>
                            <li>rgallardo@gmail.com/123456</li>
                        </ul>
                    </p>
                    
                    <div class="alert alert-warning" id="msg-container" style={{display:"none"}}>
                        <p></p>
                    </div>

                    <div class="alert alert-primary" id="msg-container-ok" style={{display:"none", padding:'4px'}}>
                        <p>
                            <strong>¡Bienvenido!</strong><br/>
                            Su información se guardó correctamente en el localstorage del navegador y en <strong>{this.state.timer}</strong> segundos 
                            será redirigido a una página para su visualización.
                        </p>
                    </div>
                </div>
            </Paper>
            </div>
        );
    }
}

export default AppLogin;