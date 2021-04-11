import React from 'react'
import './Publicaciones.css'

//* Imports
import $ from 'jquery';
import logo from '../../assets/logo192.png'
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import {Button, Select, MenuItem} from '@material-ui/core/';

//* Components
import AppSearch from '../search/AppSearch';
import environment from '../../services/API';
import CardPublicaciones from './Card';


class AppPublicaciones extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            url_API : `${environment.API}/publicar.php`,
            dataAPI: [],
            dataDisplay: [],
            totalRegistros:0,
            error: false,
            errorDesciption:''
        }
    }


/**
 * Método que es llamado al cargar el componente, encargado de obtener todas las publicaciones desde la API.
 */
    async componentDidMount() {
        const url  = this.state.url_API + '?publicaciones';
        try {
            const response  = await fetch(url);
            const json = await response.json();

            this.setState({
                dataAPI : json.data,
                dataDisplay : json.data,
                totalRegistros: json.data.length,
            });
        } catch (error) {
            console.log(error);
        }
     }


/**
 * Método encargado de retornar el Array original con todas las publicaciones.
 * @return - Array con todas las publicaciones desde la API.
 */
    getArrayDataAPI = ()=> this.state.dataAPI; 


/**
 * Método encargado de retornar el largo (length) del Array con los datos filtrados a desplegar por pantalla.
 * @return - Número entero con la cantidad de publicaciones del array.
 */
    getCountDataDisplay = ()=>this.state.dataDisplay.length;


/**
 * Método encargado de identificar a través de qué operador realizar el filtrado de publicaciones desde un array dado.
 * @param - Recibe un objeto que contiene un array a filtrar, en base al parámetro key con la condición definida en el parámetro 'operator'.
 * @return - Array data[] con las publicaciones filtradas en base a la propiedad 'key' y el operador 'operator'.
 */
    filterConditions = ({data=[], key='', value='', operator=''})=>{
        return data.filter((item)=>{
            switch(operator){
                case '===': return item[key] === value;
                break;
                case '==': return item[key] == value;
                break;
                case '!=': return item[key] != value;
                break;
                case '>=': return item[key] >= value;
                break;
                case '<=': return item[key] <= value;
                break;
                case 'includes': return item[key].includes(value);
                break;
            }
        });
    }


/**
 * Método encargado de ejecutar el filtrado de publicaciones sobre el array dataDisplay 
 * de la clase, en base a los parámetros recibidos en la función.
 * @param - Objeto con los parámetros de filtrado.
 */
    filterResults = (parametros)=>{
        let dataFiltrada = this.getArrayDataAPI();
        const {advancedSearch, dormitorios, banos, precio_min, precio_max, ciudad} = parametros;

        if(parametros){
            if (ciudad) {
                dataFiltrada = this.filterConditions({
                    data:dataFiltrada, 
                    key:'ciudad', 
                    value:ciudad.toUpperCase(),
                    operator:'includes'
                });
            }
            if(advancedSearch===true){
                if (dormitorios) {
                    let operador='';
                    (dormitorios < 4 ? operador='==' : operador='>=')

                    dataFiltrada = this.filterConditions({
                        data    : dataFiltrada, 
                        key     : 'dormitorio', 
                        value   : dormitorios, 
                        operator: operador
                    });
                }
                if (banos) {
                    let operador='';
                    (banos < 4 ? operador='==' : operador='>=')

                    dataFiltrada = this.filterConditions({
                        data    :dataFiltrada, 
                        key     :'bano', 
                        value   :banos, 
                        operator:operador
                    });
                }
                if (precio_min) {
                    dataFiltrada = this.filterConditions({
                        data    : dataFiltrada, 
                        key     : 'valor', 
                        value   : precio_min, 
                        operator: '>='
                    });
                }
                if (precio_max) {
                    dataFiltrada = this.filterConditions({
                        data    : dataFiltrada, 
                        key     : 'valor', 
                        value   : precio_max, 
                        operator: '<='
                    });
                }
            }

            if(dataFiltrada.length){
                this.setState({
                    error: false,
                    dataDisplay : dataFiltrada,
                    totalRegistros: dataFiltrada.length,
                });     
            }else{
                this.setState({
                    error: true,
                    errorDesciption: '<strong>Upss!</strong> No se encontraron publicaciones con los parámetros indicados.',
                    dataDisplay : [],
                    totalRegistros: 0,
                });
            }
        }
    }



/**
 * Método encargado de retornar el promedio del valor de los arriendos en base a las publicaciones del array 'dataDisplay'.
 * @return - Integer con el promedio del arriendo.
 */
    getAverage = () =>{
        const total = this.state.dataDisplay.reduce((acum, item)=>{
           return acum += parseInt(item.valor);
        },0);

        const nformat = new Intl.NumberFormat('en-US');
        return nformat.format(Math.round(total/this.getCountDataDisplay()));
    }


    render(){
        let registros = this.getCountDataDisplay();

        return (
            <div className="container-publicaciones">
                <AppSearch onChange={(dato)=>{ this.filterResults(dato); }}/>

                <div style={{margin:'30px'}}>
                     Se encontraron <strong>{this.state.totalRegistros}</strong> publicaciones.<br/>
                </div>

                {registros &&
                    <div style={{margin:'30px'}}>
                        El promedio del valor de arriendo es de $<strong>{this.getAverage()}</strong>
                    </div>
                }

                <Grid container justify="center" spacing={3}>
                    {this.state.dataDisplay.map((value) =>(
                        <Grid item>
                            <CardPublicaciones datos ={value}/>
                        </Grid>
                    ))}
                </Grid>
            
                {!registros &&
                    <div class="alert alert-warning" id="msg-container">
                        <p>No se encontraron publicaciones con los parámetros ingresados.</p>
                    </div>
                }
            </div>
        );
    }
}

export default AppPublicaciones;