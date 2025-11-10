import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { db, auth } from '../firebase/config'


class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            password:'',
            error: '', // Estado de error para manejar errores de Firebase o de la validación.
        }
    }

    onSubmit(){
        const { email, password, userName } = this.state
        this.setState({ error: '' }) // Limpia los errores previos

        // creamos el user en Firebase 
        auth.createUserWithEmailAndPassword(email, password)
         .then(response => {
            // guardamos sus datos
            db.collection('users').add({
                owner: auth.currentUser.email, 
                userName: userName, 
                createdAt: Date.now(), 
            })
            .then(() => {
                // t lleva al Login después de un registro exitoso
                this.props.navigation.navigate('Login')
            })
            .catch(error => {
                // cualquier error q pueda pasar guardando en la DB, mostrar un error
                console.log('Error al guardar datos en DB:', error);
                this.setState({error: 'Fallo al guardar datos adicionales.'})
            })
        })
        .catch(error => {
            this.setState({error: 'Fallo en el registro. Revise credenciales.'})
        })
    }
    
    render(){
    return(
        <View style={styles.conteiner}>
            <Text style={styles.title}>Registro</Text> 
            <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate('Login')}> 
                <Text>Ya tengo cuenta. Ir al login</Text>
            </Pressable>

            <Text style={styles.subtitle}>Email</Text>
            <TextInput 
                style={styles.input} 
                keyboardType='email-address' 
                onChangeText={text => this.setState({email:text})} 
                placeholder='ejemplo@email.com'
            />
            
            <Text style={styles.subtitle}>Nombre de Usuario</Text>
            <TextInput 
                style={styles.input} 
                keyboardType='default'
                onChangeText={text => this.setState({userName:text})} 
                value={this.state.userName}
                placeholder='MiUserName'
            />

            <Text style={styles.subtitle}>Password</Text>
            <TextInput 
                style={styles.input} 
                keyboardType='default'
                onChangeText={text => this.setState({password:text})} 
                value={this.state.password}
                secureTextEntry={true} 
                placeholder='Mínimo 6 caracteres'
            />

            {this.state.error !== '' ? <Text style={styles.error}>{this.state.error}</Text> : null}

            <Pressable style={styles.boton2} onPress={()=>this.onSubmit()}> 
                <Text>Registrarme</Text>
            </Pressable>
             
        </View>
    )
}
};

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

export default Register