import React from 'react'
import './Detalle.css'

//* Imports
import { Button} from '@material-ui/core';

//* Components
import environment from '../../services/API';


class DetallePublicacion extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            url_API : `${environment.API}/publicar.php`,
            dataAPI: {},
            error: false,
            errorDesciption:''
        }
    }


/**
 * Método que obtiene desde los parámetros enviados en la URL, el ID de la publicación, para luego llamar al método
 * que obtendrá su información desde la API.
 */
    componentDidMount() {
        const id = this.props.match.params.id;
        this.getDataAPI(id);
    }


/**
 * Método que obtiene todas las publicaciones desde la API, para luego encontrar la publicación
 * buscada en base a su id recibida por parámetro.
 * @param - Id de la publicación a consultar.
 */
    async getDataAPI(id) {
        const url  = this.state.url_API + '?publicaciones';
        try {
            const response  = await fetch(url);
            const json = await response.json();

            let post = json.data.find(element => element.id == id);
            this.setState({
                dataAPI : post,
            });
        } catch (error) {
            console.log(error);
        }
    }


    render(){
        const {id, ciudad, titulo, valor, foto, descripcion, bano, dormitorio,
            nombre,
            email,
            direccion, 
            DATE_REGISTER} = this.state.dataAPI;

        return (
            <div class="card" style={{width:'60%', margin:'auto'}}>
                <div class="card-header">
                    {ciudad}
                </div>
                <div className='cuerpo'>
                    <div>
                        <img src={foto} style={{width:'450px'}} />
                        <small class="text-muted">Publicado: {DATE_REGISTER}</small>
                    </div>
                    <div>
                        <p>
                            <h5>{titulo}</h5>
                            <p>{descripcion}</p>
                            <ul>
                                <li>Dormitorios:{dormitorio}</li>
                                <li>Baños:{bano}</li>
                                <li>Valor noche: ${valor} CLP</li>
                            </ul>
                        </p>

                        <p>
                            <h5>Contacto:</h5>
                            <ul>
                                <li>{nombre}</li>
                                <li>{email}</li>
                                <li> {direccion}, {ciudad} </li>
                            </ul>
                        </p>

                        <Button
                            label="Iniciar Sesion"
                            variant="contained"
                            color="primary"
                            onClick={this.props.history.goBack}
                            style={{ textTransform: "none" }}>
                            Volver
                        </Button>
                    </div> 
                </div>
            </div>
        );
    }
}

export default DetallePublicacion;