import React from 'react';
import './Profile.css';

//* Imports
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import ImgLogin from '../../assets/img_login.png';
import {TextField, IconButton} from '@material-ui/core/';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Button} from '@material-ui/core';

//* Components
import Storage from '../../helpers/Storage';


class AppProfile extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            user       : Storage.getUser(),
            logOut     : false,
            property   :'',
            value      :'',
            redirect   :6000,
        }
    }

/**
 * Método que redirecciona al usuario a la página de login, en caso de que este no se encuentre logeado.
 */
    componentDidMount = ()=> {
        const seconds = this.state.redirect;

        if(!this.state.user){
            var myPromise = new Promise(function(resolve, reject) {
                setTimeout(() => resolve('redirect'), seconds);
            });

            myPromise.then(value => { this.logOut() });
        }
     }

/**
 * Método que asigna valores de forma computada a propiedades objecto con los datos del usuario.
 * @param - recibe un objeto que contiene la propiedad y el valor que se le debe asignar.
 */
    handleInputChange = ({type, value})=>{
        this.setState({
            [type] : value
        });
    }

/**
 * Método que llama a función externa, para la eliminación de la información 
 * del usuario almacenada en el localstorage del navegador.
 */
    logOutLocalStarage = ()=>{
        Storage.logOut();
    }

/**
 * Método que elimina los datos de la sesión del usuario (logOut).
 * @param - recibe el evento del objeto de origen que llama al método y previene su comportamiento.
 */
    logOut = ()=>{
        this.logOutLocalStarage();
        this.setState({logOut:true});
    }

/**
 * Método que lee las propiedades y valores de la información del usuario.
 * @return - retorna la información del usuario estructurada en una tabla HTML.
 */
    getDataUser = ()=>{
        const usuario = {...this.state.user};
        let keys = [];
        let values = [];

        Object.keys(usuario).forEach((key) =>{ 
            keys.push(key);
            values.push(usuario[key]);
        })

        return keys.map((key, i)=>{
                return (
                <tr>
                    <td>{key}</td>
                    <td>{values[i]}</td>
                </tr>)
            })
    }

/**
 * Método que agrega nuevas propiedades a la información del usuario y actualiza la 
 * información almacenada en el local storage del navegador.
 * @param - recibe un objeto con información del usuario actualmente logeado.
 */
    addProperty = (user)=>{
        const userData  = {...user};
        const property  = this.state.property;
        const value     = this.state.value;

        if(!property || !value){
            alert("Debe especificar la nueva propiedad que tendrá el usuario y su valor");
            return false;
        }

        const newUserData = {...userData,...{[property]:value}};
        this.setState({
            user    : newUserData,
            property:'',
            value   :'',
         });

        Storage.setUser(JSON.stringify(newUserData));
    }


    render(){
        if(this.state.logOut){
            return <Redirect to="/login"/>
        }

        const loginSuccess = this.state.user;

        return (
            <div className='profile-Container'>
                {loginSuccess &&
                    <Paper elevation={3} style={{width:'560px'}}>
                        <div className="card" >
                            <img src={this.state.user.Avatar} alt="avatar" className='card-profile'/>
                            <h4>{this.state.user.Nombre}</h4>
                            <FormHelperText style={{ margin:'auto'}}>
                                    Información obtenida desde el LocalStorage del navegador.
                                </FormHelperText>
                            <div className="card-body">
                                <table>
                                    <tbody>
                                        {this.getDataUser()}
                                    </tbody>
                                </table>
                                
                                <FormHelperText>
                                    Cree nuevas propiedades o modifique las actuales.<br/> 
                                    (Uso de Spread operator + Literal String)
                                </FormHelperText>

                                <div className='flex-content'>
                                    <TextField 
                                        type="text"
                                        id='property'
                                        placeholder='Propiedad'
                                        InputLabelProps={{
                                            shrink: false,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value = {this.state.property}
                                        onChange={(e)=>{ this.handleInputChange({type: "property", value:e.target.value}); }} 
                                    />
                                    
                                    <TextField 
                                        type="text"
                                        id='valor'
                                        placeholder='Valor'
                                        InputLabelProps={{
                                            shrink: false,
                                        }}
                                        variant="outlined"
                                        size="small"
                                        value = {this.state.value}
                                        onChange={(e)=>{ this.handleInputChange({type: "value", value:e.target.value}); }} 
                                    />
                                    <IconButton >
                                        <AddCircleIcon onClick={() =>{this.addProperty(this.state.user)}}/>
                                    </IconButton>
                                </div>
                            </div>
                            <div className="card-footer text-muted">
                                <Button
                                    label="Cerrar Sesión"
                                    variant="contained"
                                    size="small"
                                    endIcon= {<ExitToAppIcon/>}
                                    onClick={(e)=>{ this.logOut(e)}}
                                    style={{ textTransform: "none", width:'30%'}}>
                                    Salir
                                </Button>
                            </div>
                        </div>
                    </Paper>
                }

                {!loginSuccess &&
                    <div class="alert alert-warning" >
                        <img className='card-profile' src={ImgLogin} alt="sin avatar" />
                        <h4 className="card-title">No ha iniciado sesión</h4>
                        <p>Aún no ha iniciado sesión en el nuestro sitio. Puede hacerlo presionando el botón, o esperar
                            a ser redireccionado a nuestra página de login dentro de los siguientes segundos (setTimeOut = {this.state.redirect/1000} segundos).</p>
                        <Button
                            label="Iniciar Sesion"
                            variant="contained"
                            color="primary"
                            size="small" 
                            onClick={this.logOut}
                            style={{ textTransform: "none", width:'30%'}}>
                            Iniciar Sesión
                        </Button>
                    </div>
                }
            </div>
        );
    }
}

export default AppProfile;