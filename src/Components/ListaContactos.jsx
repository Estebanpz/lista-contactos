import React, {useState, useEffect}from 'react';
import styled from 'styled-components';
import { db } from '../firebase/firebaseConfig';
import {collection, onSnapshot} from "firebase/firestore";
import Contacto from './Contacto';

const ListaContactos = () => {
    const [contactos, setContactos] = useState([]);

    useEffect(()=>{
         onSnapshot(
            collection(db, "usuarios"),
            (querySnapshot) => {
                let arregloUsuarios = querySnapshot.docs.map((usuario)=>{
                    return {
                        id: usuario.id,
                        ...usuario.data()
                    }
                });
                setContactos(arregloUsuarios);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [])
    return (
        contactos.length > 0 &&
        <ContenedorContactos>
            {
                contactos.map((contacto)=>(
                        <Contacto key={contacto.id} id={contacto.id} datos={contacto}/>
                    )
                )
            }
        </ContenedorContactos>
     );
}

const ContenedorContactos = styled.div`
    margin-top: 40px;
`;
export default ListaContactos;