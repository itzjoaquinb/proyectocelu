import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";
import { TextInput } from "react-native";


class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: "",
      error: "",
    };
  }


  componentDidMount() {
    const { postId } = this.props.route.params;

    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt", "asc")
      .onSnapshot((docs) => {
        const commentsList = [];
        docs.forEach((doc) => {
          commentsList.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.setState({ comments: commentsList });
      });
  }

  addComment() {

    if (this.state.comment.trim() === '') {
        this.setState({ error: 'El comentario no puede estar vacío.' });
        return;
    }
    
    const { postId } = this.props.route.params
    

    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        email: auth.currentUser.email,
        text: this.state.comment,
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({ comment: '', error: '' });
      })
      .catch((error) =>
        this.setState({ error: "Error al crear el comentario" })
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Comentarios</Text>
        

        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentBox}>
              <Text style={styles.commentUser}>{item.email}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
        />
        

        {this.state.error !== '' ? <Text style={styles.error}>{this.state.error}</Text> : null}

        <TextInput
        style={styles.input} 
        placeholder="Escribi un comentario" 
        value={this.state.comment} 
        onChangeText={(text) => this.setState({ comment: text })}
        multiline={true} 
        />
        <Pressable style={styles.button} onPress={() => this.addComment()}>
        <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f9f9f9", 
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        color: '#333',
    },
    commentBox: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    commentUser: { 
        color: "#007bff", 
        fontWeight: "bold", 
        marginBottom: 3 
    },
    commentText: { 
        color: "#14171A",
        fontSize: 15
    },
    input: {
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginTop: 20,
        backgroundColor: "#fff",
        fontSize: 16,
        height: 80, 
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: "#007bff", 
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { 
        color: "#fff", 
        fontWeight: "bold",
        fontSize: 16
    },
    error: { 
        color: "#dc3545", 
        marginTop: 10,
        textAlign: 'center' 
    },
});

export default Comentarios;