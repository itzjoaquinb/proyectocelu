import React, { Component } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase"; 

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    
    onLike(){
        if(auth.currentUser){
            db.collection('posts')
            .doc(this.props.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(response => {
                console.log('Like agregado')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    // Método para sacar el email del usuario del array de likes
    onUnlike(){
        if(auth.currentUser){
            db.collection('posts').doc(this.props.id).update({
                // arrayRemove saca el email del array 'likes'
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(response => {
                console.log('Like removido')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    goToComments(){
        this.props.navigation.navigate('Comentarios', { postId: this.props.id });
    }

    borrarBoton() {
        if (this.props.onDelete) {
            this.props.onDelete();
        }
    }


    render(){
        const postData = this.props.post.data;
        const totalLikes = postData.likes ? postData.likes.length : 0;
        const userHasLiked = auth.currentUser && postData.likes.includes(auth.currentUser.email);
        // Verifica si la prop isOwnerProfile fue enviada (solo desde Profile.js)
        const isOwnerProfile = this.props.isOwnerProfile || false; 

        return(
            <View style={styles.conteiner}>
                <Text style={styles.title}>@{postData.owner}</Text>
                <Text style={styles.message}>{postData.description}</Text>
                <Text style={styles.likes}>Likes: {totalLikes}</Text>
                
                <View style={styles.actionsContainer}>
                    
                    {auth.currentUser ? ( 
                        userHasLiked ?
                        // Botón Quitar Like
                        <Pressable style={styles.boton2} onPress={()=>this.onUnlike()}>
                            <Text>Quitar like</Text>
                        </Pressable>
                        :
                        // Botón Like
                        <Pressable style={styles.boton} onPress={()=>this.onLike()}>
                            <Text>Like</Text>
                        </Pressable> 
                    ) : (
                        <Text style={styles.noAuth}>Debes estar logueado para dar like</Text>
                    )}
                    
                    {auth.currentUser ? (
                        <Pressable onPress={()=>this.goToComments()}>
                            <Text style={styles.commentText}>Comentar</Text>
                        </Pressable>
                    ) : null}
                    
                    {isOwnerProfile ? (
                        <Pressable style={styles.deleteButton} onPress={()=>this.borrarBoton()}>
                            <Text style={styles.deleteText}>Borrar Posteo</Text>
                        </Pressable>
                    ) : null}
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner:{
        padding: 15,
        marginVertical: 8, 
        marginHorizontal: 5,
        borderWidth: 0, 
        borderRadius: 12,
        backgroundColor: '#fff', 
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#007bff', 
    },
    message:{
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    likes:{
        fontSize: 14,
        marginTop: 5, 
        color: '#555',
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 1, 
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    boton:{ 
        backgroundColor: 'lightgreen',
        borderRadius: 4,
        padding: 5,
        marginRight: 15,
    },
    boton2:{ 
        backgroundColor: '#ff6676ff',
        borderRadius: 4,
        padding: 5,
        marginRight: 15,
    },
    botonText: {
        backgroundColor: 'green',
        fontWeight: 'bold',
        fontSize: 14
    },
    boton2Text: {
        color: '#dc3545', 
        fontWeight: 'bold',
        fontSize: 14
    },
    commentText: {
        color: '#007bff', 
        fontWeight: 'bold',
        padding: 5, 
    },
    deleteButton: {
        backgroundColor: '#dc3545', 
        borderRadius: 5,
        padding: 8,
        marginLeft: 'auto',
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    noAuth:{
        fontSize:12,
        color:'#ffc107', 
        textAlign:'center',
        marginTop:5
    },
});


export default Post