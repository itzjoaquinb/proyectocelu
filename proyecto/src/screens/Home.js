import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { db } from '../firebase/config';
import Post from '../components/Post'; 

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [], // Array para los doc d posteos
            loading: true, 
        };
    }

    // componentDidMount para comenzar la consulta a la base de datos
    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        // Consultamos la colección 'posts' y ordenamos los posteos con createdat de mas nuevo a mas viejo
        db.collection('posts')
            .orderBy('createdAt', 'desc') 
            //onSnapshot para obtener datos en tiempo real
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
                        posteos: posts, 
                        loading: false,
                    });
                }
            );
    }
    render() {
        // para mostrar el cosito de carga si los datos todavia no cargaron
        if (this.state.loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="blue" />
                    <Text>Cargando posteos...</Text>
                </View>
            );
        }
         return (
            <View style={styles.container}>
                <Text style={styles.title}>Feed de Posteos</Text>
                
                {this.state.posteos.length === 0 ? 
                    <Text>Aún no hay posteos para mostrar.</Text>
                :// muestra la lista de posteos
                    <FlatList
                        data={this.state.posteos} // es un array d datos
                        keyExtractor={(item) => item.id.toString()} // Clave única en formato string
                        // usamos el componente Post para renderizar cada elemento
                        renderItem={({ item }) => (
                            <Post 
                                post={item} 
                                id={item.id}
                                // pasamos navigation a Post para permitir la navegación a comentarios
                                navigation={this.props.navigation} 
                            />
                        )}
                        style={styles.flatlist} 
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    flatlist: {
        width: '100%',
        flex: 1 
    },
});

export default Home;