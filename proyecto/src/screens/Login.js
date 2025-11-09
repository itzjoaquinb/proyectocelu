import React, { Component } from "react";
import { StyleSheet, TextInput, Pressable, Text, View } from "react-native"; 
import {auth} from '../firebase/config'

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            error: '', // Creo un estado para manejar los mensajes de error
        }
    }
    
    // Método para Logueo
    onSubmit(){
        const { email, password } = this.state;
        this.setState({ error: '' }); //limpiar el error
        
        // validar
        if (!email.includes('@')) {
            this.setState({error: 'Email mal formateado'});
            return;
        }
        if (password.length < 6) {
            this.setState({error: 'La password debe tener una longitud mínima de 6 caracteres'});
            return; 
        }
        
        // llamo a Firebase
        auth.signInWithEmailAndPassword(email, password)
        .then( (response) => {
            // si pasa se va al menu principal de la app
            this.setState({loggedIn: true});
            this.props.navigation.navigate('HomeMenu');
        })
        .catch(error => {
            // si no pasa muestra mnsj con credenciales invalidad
            console.log('Error de login:', error);
            this.setState({error: 'Credenciales inválidas'});
        });
    }

    render(){
        return(
            <View style={styles.conteiner}>
                <Text style={styles.title}>Ingresar</Text>
                <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate('Register')}>
                    <Text>Ir al registro</Text>
                </Pressable>
                
                <Text style={styles.subtitle}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    keyboardType="email-address" 
                    placeholder='ejemplo@dominio.com'
                    onChangeText={text=>this.setState({email:text})} 
                    value={this.state.email}
                />
                
                <Text style={styles.subtitle}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    keyboardType="default" 
                    placeholder='Mínimo 6 caracteres'
                    onChangeText={text=>this.setState({password:text})} 
                    value={this.state.password} 
                    secureTextEntry={true}
                />
                
                {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}           
                <Pressable style={styles.boton2} onPress={()=>this.onSubmit()}> 
                    <Text>Logearme</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner:{
        padding:10
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5,
        marginTop: 7,
    },
    subtitle:{
        fontSize:15,
        fontWeight:'semibold',
        marginBottom:5,
        marginTop:7,
    },
    input:{
        borderColor: 'grey',
        borderRadius: 3,
        borderWidth: 2,
        padding: 10,
    },
    boton:{
        backgroundColor:'orange',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7,
        marginTop: 7,
    },
    boton2:{
        backgroundColor:'lightblue',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginTop: 9,
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    }
});

export default Login