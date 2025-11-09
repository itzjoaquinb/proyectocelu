// Basado en A02 Componentes, View, Text, Pressable. (1).pptx - Diapositiva 17, 24, 31
// Basado en A03 Componente StyleSheet (1).pptx - Diapositiva 4
// Basado en A04- Formularios en RN - TextInput (1).pptx - Diapositiva 6
import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";

import { db, auth } from '../firebase/config' 


class NuevoPost extends Component{ 
    constructor(props){
        super(props)
        this.state={
            description: '', 
            error: '',
            loading: false, 
        }
    }
    
    onSubmitPost(){
        this.setState({ error: '', loading: true });
        const { description } = this.state;

        if (description.trim() === '') {
            this.setState({ error: 'El posteo no puede estar vacío.', loading: false });
            return;
        }


        db.collection('posts').add({
            description: description, 
            owner: auth.currentUser.email,
            createdAt: Date.now(), 
            likes: [], 
        })
        .then(() => {
            this.setState({ description: '', loading: false });
            this.props.navigation.navigate('HomeMenu'); 
        })
        .catch(error => {
            console.log('Error al guardar posteo:', error);
            this.setState({ error: 'Ocurrió un error al intentar publicar.', loading: false });
        })
    }
    
    render(){
        return(

            <View style={styles.conteiner}>
                <Text style={styles.title}>Crear Nuevo Posteo</Text>
                

                <Text style={styles.subtitle}>Contenido del Posteo</Text>
                <TextInput 
                    style={styles.input} 
                    keyboardType='default'

                    onChangeText={text => this.setState({description:text})} 
                    value={this.state.description}
                    placeholder='Escribe aquí tu posteo...'
                    multiline={true} 
                />

                {this.state.error !== '' ? <Text style={styles.error}>{this.state.error}</Text> : null}

                {this.state.loading ?
                    <ActivityIndicator size='large' color='blue' />
                    :
                    <Pressable style={styles.boton2} onPress={()=>this.onSubmitPost()}> 
                        <Text>Publicar</Text>
                    </Pressable>
                }
                 
            </View>
        )
    }
}


const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5,
        marginTop: 7,
    },
    boton2:{
        backgroundColor:'lightblue',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginTop: 9,
    },
    conteiner:{
        padding:10
    },
    input:{
        borderColor: 'grey',
        borderRadius: 3,
        borderWidth: 2,
        padding: 10,
        height: 100, 
        textAlignVertical: 'top', 
    },
    subtitle:{
        fontSize:15,
        fontWeight:'semibold',
        marginBottom:5,
        marginTop:7,
    },
    error:{
        color:'red',
        marginTop: 10,
        textAlign: 'center'
    }
});


export default NuevoPost 