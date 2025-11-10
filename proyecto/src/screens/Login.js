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
        flex: 1, 
        padding: 20,
        backgroundColor: '#f9f9f9', 
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', 
        textAlign: 'center',
    },
    subtitle:{
        fontSize: 16,
        fontWeight: '600', 
        marginBottom: 8,
        marginTop: 15,
        color: '#555',
    },
    input:{
        borderColor: '#ddd', 
        borderRadius: 8, 
        borderWidth: 1,
        padding: 12,
        backgroundColor: '#fff', 
        fontSize: 16,
    },
    boton:{ 
        backgroundColor: '#e1e1e1', 
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
    },
    boton2:{ 
        backgroundColor: '#007bff', 
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 25,
    },
    error: {
        color: '#dc3545', 
        marginTop: 15,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    boton2Text: {
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 18
    }
});

export default Login