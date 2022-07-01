import React, { useEffect, useState } from 'react';
// import {getFetch} from '../../helpers/getData.js';
import ItemDetail from '../ItemDetail/ItemDetail';
import {useParams} from 'react-router-dom';
import { getFirestore,getDoc,doc } from 'firebase/firestore';


const ItemDetailContainer = () => {
    const [data,setData] = useState({});
    const {id} =useParams() //retiene el id
    console.log(id)

    //Para uno solo detalle
  useEffect(() => {
    const db = getFirestore ();
    const queryItem =doc(db,'films',id)
      getDoc(queryItem) //trae el documento , es como una promesa
      .then(res => setData({ id: res.id, ...res.data()}))
      .catch(err => console.log(err))
  },[id]);
  console.log(data);

    //Version anterior
    // useEffect(() => {
    //   getFetch(id) //se llama a la api getData.js para traer el id que es el de un parametro del array de objeto.
    //     .then((res) => setData(res)) //no es necesario usar la funcion find porque ya viene todo filtrado. 
    //     .catch(err => console.log(err))
    //   },[id]);
  return (
    <div className="border border-1 border-danger">
    <ItemDetail data={data} />
    </div>
  )
}

export default ItemDetailContainer;