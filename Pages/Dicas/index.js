import React, { useState, useEffect, }from 'react';
import {StyleSheet, Text, View,FlatList,TouchableOpacity,TextInput,} from 'react-native';


const Dicas = () => {
    const [dicas, setDicas] = useState([]);
    const [texto, setTexto] = useState([]);

    useEffect(()=>{
        Listar();
    }, [])

    const Listar = () =>{
        fetch( 'https://5f9a074d9d94640016f70531.mockapi.io/api/dicas',{
            method : 'GET'
        })
        .then(response => response.json())
        .then(dados => {
            setDicas(dados.data);
            console.log(dados.data);
                })
            .catch(err => console.log(err));
            }

    const renderItem = (dica) => {
        return (
           <View>

            <Item imagens = {dica.item.imagens}/>
            <Item texto ={dica.item.texto}/>
           </View>
               
        )
    }
    const delatar = (event) =>{
        fetch(url + '/' + id,{
            method : 'DELETE'
          })
          .then(response => response.json())
          .then(dados => {
            alert('Dica removida');
             Listar();
          })
          .catch(err => console.error(err));
    }
    const editar = () =>{

    }

    return(
        <View>
            <Text style={styles.titulo}>POSTAGENS</Text>
            <TextInput
            style={{ height: 50,  
                placeholderTextColor: "purple",  
                borderColor: 'purple', 
                borderWidth: 3,
                width: '80%',
                marginLeft: '10%',
                borderRadius: '20px',
                }}
            onChangeText={text => onChangeText(text)} placeholder = "  Digite aqui o seu comentario "
            value={texto}
            />
            
            <TouchableOpacity style={styles.button}  onPress={delatar}><Text style={{color: 'white',display: 'flex',justifyContent: "center",}}>Salvar</Text></TouchableOpacity>
            
            <div >
            <FlatList 
                data={dicas}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                />
            

             <TouchableOpacity style={styles.button}  onPress={delatar}><Text style={{color: 'white',display: 'flex',  justifyContent: 'center',}}>Deletar</Text></TouchableOpacity>
             <TouchableOpacity style={styles.button}  onPress={delatar}><Text style={{color: 'white',display: 'flex',  justifyContent: 'center',}}>Editar</Text></TouchableOpacity>
            
            </div>
        
            
        </View>
    )

}
const styles = StyleSheet.create({

    container: {
        display: 'flex',
        justifyContent: "center",
        width: '80%',
        marginLeft: "10%"
      },
    button: {
        backgroundColor: 'green',
        marginTop: 15,
        color: 'white',
        width: '80%',
        height: '25px',
        marginLeft: "10%",
        borderRadius: '20px',
    },
    titulo: {
        fontFamily: "Andale Mono, monospace", 
        fontSize: 40,
        fontWeight: 'bold',
        color: "purple",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    buttondiv: {
        display: 'flex',
        justifyContent: "center",
    },
    card: {
        
        borderColor: 'purple',
    }
    
  });
  
  
export default Dicas;