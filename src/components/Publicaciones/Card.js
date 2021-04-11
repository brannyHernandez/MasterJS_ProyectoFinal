import React from 'react';
import './Card.css'

import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import BathtubIcon from '@material-ui/icons/Bathtub';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';

//* Componentes
import Storage from '../../helpers/Storage';


const useStyles = makeStyles({
  root: {
    width: 250,
  },
});


export default function CardPublicaciones({datos}) {
  const classes = useStyles();

  const {id, ciudad, dormitorio, bano, valor, DATE_REGISTER} = datos;
  const url_detail = `/detalle/${id}`;
  let txtDescuento;
  (valor.includes('%'))? txtDescuento='Oferta': txtDescuento='';

  return (
    
      <Card className={classes.root} elevation={4}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={datos.foto}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <span class='small' style={{fontSize:'14px'}}>{ciudad}</span><br/>
              <span class='small'>Publicado:{DATE_REGISTER}</span><br/>
              
              <span class='small'> 
                <AirlineSeatIndividualSuiteIcon fontSize='small' />&nbsp;{dormitorio} &nbsp; &nbsp;
                <BathtubIcon fontSize='small'/>&nbsp; {bano}</span> 

                <Link to={url_detail} style={{textDecoration:'none'}} >
                  <IconButton fontSize='small'>
                      <VisibilityIcon variant="contained" color="secondary" fontSize='small' />
                  </IconButton> &nbsp; &nbsp;
                </Link><br/>
              
                <span class='small'> Valor por día: ${valor} <span className='oferta'>{txtDescuento}</span></span><br/>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

  );
}
