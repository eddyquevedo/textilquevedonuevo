import React,{useState,useEffect} from 'react'
// import { getFetch } from '../../helpers/getData';
import ItemList from '../ItemList/Itemlist'
import {useParams} from 'react-router-dom';
import {collection,getDocs, getFirestore, query, where} from 'firebase/firestore'

const ComponentContainer = ({saludo}) => {
  const [data,setData] = useState([]); // el estado es data se inicia en un array vacio y con su setData pasan a ser una raiz de objetos luego se envia a itemlist.
  const {categoriaId} =useParams();


//Traer todos y filtrados
useEffect(() => {
        const db = getFirestore ();
        const queryCollection = collection(db,'films');

  if (categoriaId) {
        const queryCollectionFilter = query(
          queryCollection,
          where('categoria','==',categoriaId)
          );
        getDocs(queryCollectionFilter)
        .then((dataRes) => 
          setData(
            dataRes.docs.map((film) =>({ id: film.id, ...film.data() }))
            )
        )
        .catch(err => console.log(err));
  }else{
      getDocs(queryCollection)
        .then(dataRes => setData(dataRes.docs.map(film =>({ id: film.id, ...film.data()}))))
          .catch(err => console.log(err));

        }
},[categoriaId]);
console.log(data);

//version anterior
  // useEffect(() =>{ //crear una promesa que traiga el valor en unos 2 seg para simular que hay demoras en la base de datos y luego setear la data y al haber un cambio vuelve a renderizar.
  //   if (categoriaId) {
  //     getFetch() //llama al api getData.js pero sin ningun parametro por lo cual es un undefined y al ir este devuelve todo el array completo.
  //     .then((res) => {
  //       setData(res.filter(film => film.categoria === categoriaId ))
  //     }); //captura esa respuesta y las devuelve y setea data
  //   }else{
  //     getFetch()
  //     .then((res) => {setData(res)}); //captura esa respuesta y las devuelve y setea data
  //   }

  // },[categoriaId])

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
