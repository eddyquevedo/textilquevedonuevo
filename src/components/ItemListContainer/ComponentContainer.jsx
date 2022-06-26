import React,{useState,useEffect} from 'react'
import { getFetch } from '../../helpers/getData';
import ItemList from '../ItemList/Itemlist'
import {useParams} from 'react-router-dom';

const ComponentContainer = ({saludo}) => {
  const [data,setData] = useState([]); // el estado es data se inicia en un array vacio y con su setData pasan a ser una raiz de objetos luego se envia a itemlist.

  const {categoriaId} =useParams()
  console.log(categoriaId)

  useEffect(() =>{ //crear una promesa que traiga el valor en unos 2 seg para simular que hay demoras en la base de datos y luego setear la data y al haber un cambio vuelve a renderizar.
    if (categoriaId) {
      getFetch() //llama al api getData.js pero sin ningun parametro por lo cual es un undefined y al ir este devuelve todo el array completo.
      .then((res) => {
        setData(res.filter(film => film.categoria === categoriaId ))
      }); //captura esa respuesta y las devuelve y setea data
    }else{
      getFetch()
      .then((res) => {setData(res)}); //captura esa respuesta y las devuelve y setea data
    }

  },[categoriaId])

  return (
    <div>
        <h2>{saludo}</h2>
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
        <ItemList data ={data}/>
        </div>
    </div>
  )
}

export default ComponentContainer