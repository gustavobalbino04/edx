import React, { useState, useEffect, }from 'react';
import {StyleSheet, Text, View,FlatList,TouchableOpacity,TextInput,Form, Button,Image} from 'react-native';


const Dicas = () => {
    const [dicas, setDicas] = useState([]);
    const [texto, setTexto] = useState([]);
    const [urlImagem, setUrlImagem] = useState('');
    const[id,setId] = useState(' ');
    const onPress = () => setCount(count + 1);


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
    const editar = (event) =>{
        
        fetch(`${url}/eventos/${event.target.value}`, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            setId(dado.data.id);
            setNome(dado.data.texto);
            setUrlImagem(dado.data.urlImagem);
        })
    }
    const salvar = (event) => {
        event.preventDefault();

        const evento = {
            texto : texto,
            urlImagem :urlImagem,
            

        }
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/eventos` : `${url}/eventos/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(evento),
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Postagem salva');

            Listar();
        })
        .catch(err => console.error(err))
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>POSTAGENS</Text>
            <TextInput
            style={{ height: 50,  
                placeholderTextColor: "#9D0DCA",  
                borderColor: '#9D0DCA', 
                borderWidth: 3,
                width: '90%',
                marginLeft: '5%',
                borderRadius: '10px',
                }}
            onChangeText={text => onChangeText(text)} placeholder = "  Digite aqui o seu comentario "
            value={texto}
            />
            
            <TouchableOpacity style={styles.button}  onPress={delatar}><Text style={{color: 'white',display: 'flex',justifyContent: "center",}}>Salvar</Text></TouchableOpacity>
            
            
            <FlatList 
                data={dicas}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                />
                

                <TouchableOpacity style={styles.card}>
                  <Image style={styles.cardImage} source={{uri:'https://s3-sa-east-1.amazonaws.com/sensediafiles/marketing/newsletter/2015/09set/SENSEDIA-gamification-apis-600.jpg'}}/>
                  <Text style={styles.cardText}>Para dominar bem as linguagens de programação dos games, conhecer bem e saber implementar as lógicas de programação, é preciso dominar o inglês. Pois, como falamos, o material disponível em português é bastante escasso.</Text>
                  <View style={styles.display}>

                    <TouchableOpacity style={styles.button}  onPress={delatar}><Text style={{color: 'white',display: 'flex',  justifyContent: 'center',}}>Deletar</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button}  onPress={editar}><Text style={{color: 'white',display: 'flex',  justifyContent: 'center',}}>Editar</Text></TouchableOpacity>
                    <TouchableHighlight onPress={onPress}>
                        <View style={styles.button}>
                        <Text>Touch Here</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.countContainer}>
                        <Text style={styles.countText}>
                        {count ? count : null}
                        </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                
                

            
            
        
            
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
        width: '90%',
        height: '25px',
        marginLeft: "5%",
        borderRadius: '10px',
        
    },
    titulo: {
        fontFamily: "Andale Mono, monospace", 
        fontSize: 40,
        fontWeight: 'bold',
        color: "#9D0DCA",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    card:{
        padding: '10px',
        borderRadius: '10px',
        marginTop:"10px",
        backgroundColor: 'white',
        borderColor:'#00C2EE',
        marginBottom:10,
        shadowColor:'#00C2EE',
        borderWidth: 2,
        
    },
    cardImage:{
        borderRadius: '10px',
        width:'100%',
        height:200,
        resizeMode:'cover'
    },
    cardText:{
        padding:10,
        fontSize: 16
    },
    display:{
        flex: 1,
        justifyContent: 'space-between',

    }

    
  });
  
  
export default Dicas;