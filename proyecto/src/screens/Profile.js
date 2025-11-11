
import React, { Component } from "react";
import { StyleSheet, Pressable, Text, View, FlatList, ActivityIndicator } from "react-native";

import { db, auth } from '../firebase/config';

import Post from '../components/Post'; 

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            myPosts: [], 
            userInfo: {}, 
            loadingPosts: true, 
            loadingUser: true,
            error: '',
        }
    }

    componentDidMount() {
        this.fetchUserInfo();
        this.fetchMyPosts();
    }
    
    fetchUserInfo() {
        const userEmail = auth.currentUser.email;

        db.collection('users')
            .where('email', '==', userEmail) 
            .onSnapshot(docs => {
                let userInfo = {};
                docs.forEach(doc => {
                    userInfo = doc.data(); 
                });
                
                this.setState({
                    userInfo: userInfo,
                    loadingUser: false
                });
            }, error => {
                console.log('Error obteniendo info de usuario:', error);
                this.setState({ loadingUser: false });
            });
    }


    fetchMyPosts() {
        const userEmail = auth.currentUser.email;
        
        db.collection('posts')
            .where('owner', '==', userEmail)
            .orderBy('createdAt', 'desc') 
            .onSnapshot(
                docs => {
                    let posts = [];
                    docs.forEach(doc => {
                        posts.push({
                            id: doc.id, 
                            data: doc.data() 
                        });
                    });

                    this.setState({
                        myPosts: posts, 
                        loadingPosts: false,
                    });
                }, 
                error => {
                    console.log('Error obteniendo mis posteos:', error);
                    this.setState({ loadingPosts: false, error: 'Error al cargar mis posteos.' });
                }
            );
    }
    
    logout() {
        auth.signOut()
            .then(() => {

            })
            .catch(error => {
                console.log('Error al hacer logout:', error);
                this.setState({ error: 'Hubo un error al cerrar sesión.' });
            });
    }


    render() {
        const { loadingUser, loadingPosts, userInfo, myPosts, error } = this.state;
        const totalPosts = myPosts.length;

        if (loadingUser || loadingPosts) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="green" />
                    <Text>Cargando perfil y posteos...</Text>
                </View>
            );
        }

        return(
            <View style={styles.conteiner}> 
                <Text style={styles.title}>Mi Perfil</Text>
                
                <Text style={styles.infoText}>
                    <Text style={styles.label}>Email:</Text> {auth.currentUser.email}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.label}>Usuario:</Text> {userInfo.userName ? userInfo.userName : 'N/A'}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.label}>Posts totales:</Text> {totalPosts}
                </Text>
                
                <Pressable style={styles.botonLogout} onPress={()=>this.logout()}>
                    <Text style={styles.textLogout}>Cerrar Sesión (Logout)</Text>
                </Pressable>
                
                {error !== '' && <Text style={styles.errorText}>{error}</Text>}

                <Text style={styles.subtitle}>Mis Posteos</Text>
                
                {totalPosts === 0 ? 
                    <Text>Aún no has creado ningún posteo.</Text>
                :
                    <FlatList
                        data={myPosts} 
                        keyExtractor={(item) => item.id.toString()} 
                        renderItem={({ item }) => (
                            <Post 
                                post={item} 
                                id={item.id}
                                navigation={this.props.navigation} 


                            />
                        )}
                        style={styles.flatlist}
                    />
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    conteiner:{
        flex: 1, 
        padding: 20,
        backgroundColor: '#f9f9f9', // Fondo consistente
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 28,
        fontWeight:'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    subtitle:{
        fontSize: 20,
        fontWeight:'bold',
        marginTop: 25,
        marginBottom: 15,
        color: '#333',
    },
    infoText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
    botonLogout:{
        backgroundColor: '#dc3545', 
        borderRadius: 8,
        padding: 12,
        alignItems:'center',
        marginTop: 20,
    },
    textLogout: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    flatlist: {
        width: '100%',
        flex: 1,
    },
    errorText: {
        color: '#dc3545',
        marginTop: 10,
        textAlign: 'center',
    }
});

export default Profile