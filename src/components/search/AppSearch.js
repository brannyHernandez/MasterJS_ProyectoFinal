import React from 'react'
import './AppSearch.css'

//* Imports
import $ from 'jquery';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import {InputLabel, TextField, Button, Select, MenuItem} from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import FormHelperText from '@material-ui/core/FormHelperText';


class AppSearch extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            advancedSearch: true,
            ciudad:'',
            dormitorios:'',
            banos:'',
            precio_min:'',
            precio_max:''
        }
    }


/**
 * Método encargado del efecto toggle del panel de búsqueda avanzada.
 */
    advancedSearch = ()=>{
        let chequeado = this.state.advancedSearch;
        (chequeado)? chequeado = false : chequeado = true;

        this.setState({
            advancedSearch : chequeado,
        });
    }


 /**
 * Método que asigna valores de forma computada a las propiedades de búsqueda del objeto state de la clase.
 * @param - recibe un objeto que contiene la propiedad y el valor que se le debe asignar.
 */
    handleInputChange = ({type, value})=>{
        this.setState({
            [type] : value
        });
    }


 /**
 * Método encargado de enviar los parámetros y datos de búsqueda hacia el componente padre que hace uso de este componente.
 *  valores de forma computada a las propiedades de búsqueda del objeto state de la clase.
 * @return - Evento onChange con el objeto state con todos as propiedades de búsqueda establecidas.
 */
    handleSubmit = ()=>{
        const {onChange} = this.props;
        onChange(this.state);
    }


/**
 * Método encargado de limipar todos los campos de búsquedas y de ocultar el panel de búsqueda avanzada.
 */
    clearInputs = ()=>{
        this.setState({
            ciudad:'',
            dormitorios:'',
            banos:'',
            precio_min:'',
            precio_max:'',
            advancedSearch:false,
        });

        this.handleSubmit();
        $("#ciudad").focus();
    }


    render(){
        return (
            <div class="buscador">
                <Paper elevation={3} style={{padding: 15, overflow:'hidden'}}>
                    <TextField
                        required
                        id="ciudad"
                        label="Ciudad"
                        className= "input-ciudad"
                        variant="outlined"
                        size="small"
                        value= {this.state.ciudad}
                        placeholder="Ingrese la ciudad donde buscar ejemplo Villa.."
                        onChange={(e)=>
                            this.handleInputChange({
                                type: "ciudad", 
                                value:e.target.value
                            })
                        }/>

                    <Button
                        label="Buscar"
                        variant="contained"
                        color="primary"
                        style={{marginLeft:'5px'}}
                        onClick={this.handleSubmit}
                        startIcon={<SearchIcon />}>
                    Filtrar
                    </Button>

                    <IconButton aria-label="limpiar" >
                        <ClearAllIcon variant="contained" color="secondary"    onClick={this.clearInputs}/>
                    </IconButton>

                     <br/>
                    
                    <FormHelperText startIcon={<ClearAllIcon />}>Búsqueda avanzada (Javascript filter)
                        <IconButton aria-label="búsqueda avanzada" variant="contained">
                            <SettingsApplicationsIcon onClick={this.advancedSearch}/>
                        </IconButton>
                    </FormHelperText>                   

                    { /* Panel para la búsqueda avanzada */}
                    <Collapse in={this.state.advancedSearch}>
                        <div className='busqueda-avanzada'>
                        <div>
                            <InputLabel id="bano" shrink='true'>Dormitorios:</InputLabel>
                            <Select
                            labelId="domitorio"
                            id="domitorio"
                            value = {this.state.dormitorios}
                            onChange={(e)=>{ this.handleInputChange({type: "dormitorios", value:e.target.value}); } }>
                                <MenuItem value="">
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value={1}>1 Dormitorio</MenuItem>
                                <MenuItem value={2}>2 Dormitorios</MenuItem>
                                <MenuItem value={3}>3 Dormitorios</MenuItem>
                                <MenuItem value={4}>4 o más</MenuItem>
                            </Select>
                        </div>

                        <div>
                            <InputLabel id="bano" shrink='true'>Baños:</InputLabel>
                            <Select
                            labelId="bano"
                            id="bano"
                            value = {this.state.banos}
                            onChange={(e)=>{ this.handleInputChange({type: "banos", value:e.target.value}); } }>
                                <MenuItem value="">
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value={1}>1 Baño</MenuItem>
                                <MenuItem value={2}>2 Baños</MenuItem>
                                <MenuItem value={3}>3 Baños</MenuItem>
                                <MenuItem value={4}>4 o más</MenuItem>
                            </Select>
                        </div>

                        <div>
                            <TextField
                            id="outlined-number"
                            label="Precio Min."
                            type="number"
                            value={this.state.precio_min}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            onChange={(e)=>{ this.handleInputChange({type: "precio_min", value:e.target.value}); } }/>
                        </div>

                        <div>
                            <TextField
                            id="outlined-number"
                            label="Precio Max."
                            type="number"
                            value={this.state.precio_max}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            onChange={(e)=>{ this.handleInputChange({type: "precio_max", value:e.target.value}); } }/>
                        </div>
                    </div>
                    </Collapse>
                </Paper>
            </div>
        );
    }
}

export default AppSearch;