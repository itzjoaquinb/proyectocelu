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
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5,
        marginTop: 7,
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
    conteiner:{
        padding:10
    },
    input:{
        borderColor: 'grey',
        borderRadius: 3,
        borderWidth: 2,
        padding: 10,
    },
    subtitle:{
        fontSize:15,
        fontWeight:'semibold',
        marginBottom:5,
        marginTop:7,
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center'
    }
});

export default Register