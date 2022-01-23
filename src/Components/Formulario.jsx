import React, {useState} from 'react';
import styled from 'styled-components';

//Importando db
import { db } from "./../firebase/firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    //Funciones del formulario
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
          
            if(nombre!== '' && correo!== '' && telefono!== ''){
                //Agregar datos a la base de datos
                const docRef = await addDoc(collection(db, "usuarios"),{
                    nombre: nombre,
                    correo: correo,
                    telefono: parseInt(telefono)
                });
                //Limpiar los campos
                setNombre('');
                setCorreo('');
                setTelefono('');
                alert('Datos guardados ✅');
            } else {
                alert('Todos los campos son obligatorios');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (  
        <form action="" onSubmit={onSubmit}>
            <Input 
                type="text"
                name='nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
            />
            <Input 
                type="email"
                name='correo'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo"
            />

            <Input
                type="tel"
                name='telefono'
                value={telefono}
                onChange={(e) => setTelefono(parseInt(e.target.value))}
                placeholder="(+57) 313-xxx-xxxx"
            />

            <Boton type='submit'>
                Agregar
            </Boton>
        </form>
    );
}
 
const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: .5s ease all;
    outline: none;
    text-align: center;
    
    &:focus {
        border: 2px solid #3D76E9;
    }
`;
 
const Boton = styled.button`
    padding: 10px 30px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    transition: .5s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #3D76E9;
    }
`;
export default Formulario;