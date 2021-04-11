import React from 'react'
import './Home.css'

//* Imports
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core/';

//* Components
import environment from '../../services/API';
import CardPublicaciones from '../Publicaciones/Card';


class AppHome extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            url_API : `${environment.API}/publicar.php`,
            dataAPI: [],
            limite: 8,
            aplicaDecuento:60000,
            descuento:10,
            dataDisplay: [],
        }
    }


/**
 * Método que obtiene todas las publicaciones desde la API, para luego limitar la visualización a lo establecido
 * en la propiedad 'limite' del objeto state de la clase. Adicionalmente, se encarga de que en cada carga del componente,
 * se muestren de forma aleatoria las publicaciones.
 */
    async componentDidMount() {
        const url  = this.state.url_API + '?publicaciones';
        try {
            const response  = await fetch(url);
            const json = await response.json();

            this.setState({
                dataAPI : json.data,
                dataDisplay : this.shuffle(json.data.slice(0, this.state.limite)),
                totalRegistros: json.data.length,
            });
        } catch (error) {
            console.log(error);
        }
     }


/**
 * Método que se encargar de generar un array aleaorio de elementos en base al array recibido por parámetro.
 * @param - Recive el array a procesar
 * @return - Array con los elementos ordenados de forma aleatoria.
 */
    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }


/**
 * Método encargado de retornar el largo (length) del Array con las publicaciones obtenidas desde la API.
 * @return - Número entero con la cantidad de publicaciones del array.
 */
    getCountDataArray = ()=>this.state.dataAPI.length;


/**
 * Método encargado de validar si un arriendo se encuentra con un % de arriendo. Solo se aplicará si el valor del arriendo
 * es mayor o igual al definido en la propiedad 'aplicaDescuento' del objeto state de la clase.
 * @param - Recive el objeto con la propiedad 'valor' a validar.
 * @return - Retorna el objeto con la propiedad 'valor' procesada.
 */
    discountOffert = (item)=>{
        let {valor} = item;

        if(valor >= this.state.aplicaDecuento){
            valor =  `${(valor - 1000)} (-${this.state.descuento}%)`;
            item.valor = valor;
        }
        return item;
    }


    render(){
        return (
            <div className="container-publicaciones">
                <div class="jumbotron">
                    <h1 class="display-4">Arriendo de Propiedades</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention <br/>
                    to featured content or information.</p>
                    <hr class="my-4"/>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p class="lead">
                        <Link to='/publicaciones'>
                            <Button
                                label="Ver Publicación"
                                variant="contained"
                                color="primary"
                                style={{ textTransform: "none" }}>
                                    Ver Publicaciones
                            </Button>
                        </Link> 
                    </p>
                </div>

                <p style={{margin:'auto', display:'block', textAlign:'center', paddingBottom:'20px'}}>
                    <h4 >Publicaciones Destacadas</h4>
                    <span class="text-muted"> Busque en más de <strong>{this.getCountDataArray()} </strong> 
                    propiedades en arriendo en las mejores ciudades de nuestro país.</span>
                </p>
   
                <Grid container justify="center" spacing={3}>
                    {this.state.dataDisplay.map((value) =>(
                        <Grid item>
                            <CardPublicaciones datos ={this.discountOffert(value)}/>
                        </Grid>
                    ))}
                </Grid> 
            </div>
        );
    }
}

export default AppHome;