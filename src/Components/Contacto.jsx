import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const Contacto = ({ id, datos }) => {
  const [editar, setEditar] = useState(false);
  const [nombre, setNombre] = useState(datos.nombre);
  const [correo, setCorreo] = useState(datos.correo);
  const [telefono, setTelefono] = useState(datos.telefono);

  // Función para actualizar o editar el usuario en Firestore
  const onUpdate = async (e) => {
    //Buscar el documento requerido por Id para actulizarlo
    const usuarioRef = doc(db, `usuarios/${id}`);
    try {
      //Actualizar el documento recibe la referencia del documento y los datos a actualizar
      await updateDoc(usuarioRef, {
        nombre,
        correo,
        telefono,
      });
      alert("Usuario actualizado");
      setEditar(!editar);
    } catch (error) {
      console.error(error);
    }
  };

  //Función para eliminar un documento de Firestore
  const onDelete = async (e) => {
    //Buscar el documento requerido por Id para eliminarlo
    const usuarioRef = doc(db, `usuarios/${id}`);
    let confirmacion = window.confirm("¿Estas seguro de eliminar este usuario?");
    try {
      
       if(confirmacion){
         await deleteDoc(usuarioRef)
         alert("Usuario eliminado");
       }else{
         alert("Operación cancelada")
       }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ContenedorContacto>
      {editar ? (
        <form>
          <Input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <Input
            type="email"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
          />
          <Input
            type="tel"
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(parseInt(e.target.value))}
            placeholder="Telefono"
          />
          <Boton type="button" onClick={(e) => onUpdate(e)} actualizar>
            Actualizar
          </Boton>
        </form>
      ) : (
        <>
          <Nombre>{datos.nombre}</Nombre>
          <Correo>{datos.correo}</Correo>
          <Telefono>{datos.telefono}</Telefono>
          <Boton actualizar onClick={() => setEditar(!editar)}>
            Editar
          </Boton>
          <Boton eliminar onClick={() => onDelete()}>
            Eliminar
          </Boton>
        </>
      )}
    </ContenedorContacto>
  );
};

const ContenedorContacto = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Nombre = styled.p`
  font-weight: bold;
`;

const Correo = styled.p`
  font-style: italic;
  color: #6b6b6b;
  margin: 5px 0;
`;

const Telefono = styled.p`
  font-style: italic;
  color: #6b6b6b;
  margin: 5px 0;
`;

const Boton = styled.button`
  padding: 5px 20px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  margin: 0px 2px;
  margin-bottom: 10px;
  transition: 0.3s ease all;
  outline: none;
  background: #c4c4c4;
  color: #fff;
  font-size: 12px;

  &:hover {
    background: ${(props) =>
      props.actualizar ? "#3D76E9" : props.eliminar ? "red" : "#3D76E9"};
    //background: #3D76E9;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  width: 100%;
  margin-bottom: 10px;
  transition: 0.2s ease all;
  outline: none;
  text-align: center;

  &:focus {
    border: 2px solid #3d76e9;
  }
`;
export default Contacto;
