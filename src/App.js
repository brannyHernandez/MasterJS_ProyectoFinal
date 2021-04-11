import React, {useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

/* Components */
import Header from './components/shared/Header/Header';
import Footer from './components/shared/Footer/Footer';

function App() {

  return (
    <div className='container-app'>
      <Header/>
      
      <Footer/>
    </div>
  );
}

export default App;
