<template>
  <div>
    <div>
      <label>Email: </label>
      <input type="text" v-model="email"/>
      <label>Password: </label>
      <input type="text" v-model="password"/>
      <button v-on:click="createUser()">Add</button>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQoeb1-EG1tqTNKlFc0TMTQwdILHMFcHc",
  authDomain: "my-music-app-1b933.firebaseapp.com",
  databaseURL: "http://localhost:8080/",
  projectId: "my-music-app-1b933",
  storageBucket: "",
  messagingSenderId: "69866712712",
  appId: "1:69866712712:web:8e0e0d902b430daa"
};

firebase.initializeApp(firebaseConfig);

export default {
  data(){
    return {
      email: '',
      password: '',
      passwordRepeat: '',
    }
  },
  methods: {
    createUser(){
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    }
  },
  components: {

  },
  created(){

  }
}
</script>

<style>
body{

}
</style>
