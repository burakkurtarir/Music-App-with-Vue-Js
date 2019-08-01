<template>
  <div>
    <div id="registerForm">
      <h2>Register Form</h2>
      <div class="formGroup">
        <label>Email address</label><br>
        <input type="text" v-model="registerValues.email"/>
      </div>
      <div class="formGroup">
        <label>Password</label><br>
        <input type="password" v-model="registerValues.password"/>
      </div>
      <div class="formGroup">
        <label>Password again</label><br>
        <input type="password" v-model="registerValues.passwordRepeat"/>
      </div>
      <div class="formGroup">
        <button v-on:click="createUserWithEmailAndPassword()">Register</button>
      </div>
    </div>
    <div id="signInForm">
      <h2>Sign In Form</h2>
      <div class="formGroup">
        <label>Email address</label><br>
        <input type="text" v-model="signInValues.email"/>
      </div>
      <div class="formGroup">
        <label>Password</label><br>
        <input type="password" v-model="signInValues.password"/>
      </div>
      <div class="formGroup">
        <button v-on:click="signInWithEmailAndPassword()">Sign In</button>
      </div>
    </div>
    <div id="test">
      <p>These buttons will be removed after beta release.</p>
      <button v-on:click="getCurrentUser()">Get Current User</button>
      <button v-on:click="signOut()">Sign Out</button>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
//import firebase from '../firebase.js';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCQoeb1-EG1tqTNKlFc0TMTQwdILHMFcHc",
  authDomain: "my-music-app-1b933.firebaseapp.com",
  databaseURL: "https://my-music-app-1b933.firebaseio.com/",
  projectId: "my-music-app-1b933",
  storageBucket: "my-music-app-1b933.appspot.com",
  messagingSenderId: "69866712712",
  appId: "1:69866712712:web:8e0e0d902b430daa"
};

firebase.initializeApp(firebaseConfig);

export default {
  data(){
    return{
      registerValues: {
        email: '',
        password: '',
        passwordRepeat: ''
      },
      signInValues: {
        email: '',
        password: '',
      },
      audioSrc: '',
      audioPercentage: 0,
      abc: 0
    }
  },
  created(){
    this.getCurrentUser();
  },
  methods: {
    createUserWithEmailAndPassword(){
      if (this.registerValues.email === "" || this.registerValues.email.includes(" ")) {
        return;
      }
      if (this.registerValues.password === "" || this.registerValues.password.includes(" ")) {
        return;
      }
      if (this.registerValues.password != this.registerValues.passwordRepeat) {
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(this.registerValues.email, this.registerValues.password)
      .then((result) => {
        //console.log(result);
        console.log(result.user);
        alert("Welcome " + result.user.email);
        this.$router.push({path:'/yourPlaylists'});
      })
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode);
        console.log(errorMessage);
      });
    },
    //Test email
    //burak.kurtarir35@hotmail.com
    //Test sifre
    //burak123
    signInWithEmailAndPassword(){
      if (this.signInValues.email === "" || this.signInValues.email.includes(" ")) {
        return;
      }
      if (this.signInValues.password === "" || this.signInValues.password.includes(" ")) {
        return;
      }
      firebase.auth().signInWithEmailAndPassword(this.signInValues.email, this.signInValues.password)
      .then((result) => {
        console.log(result.user);
        alert("Welcome back " + result.user.email);
        this.$router.push({ path: '/yourPlaylists' });
      })
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(errorCode);
        console.log(errorMessage);
      });
    },
    getCurrentUser(){
      var user = firebase.auth().currentUser;
      console.log(user);
    },
    signOut(){
      firebase.auth().signOut()
      .then((result) => {
        // Sign out successful
        console.log(result);
        console.log("You signed out");
      })
      .catch((error) => {
        // An error happened
        console.log(error);
        console.log("There is an error");
      });
    },
  },
  components: {

  }
}
</script>

<style scoped>
#signInForm{
  border: 1px solid black;
  max-width: 1200px;
  margin: auto;
  padding: 10px;
  margin-top: 10px;
}

#registerForm{
  border: 1px solid black;
  max-width: 1200px;
  margin: auto;
  padding: 10px;
}

.formGroup{
    text-align: center;
}

.formGroup label{
  font-size: 1.2em;
}

.formGroup input{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 30%;
}

.formGroup button{
  width: 30%;
  text-align: center;
  margin-top: 5px;
}

h2{
  margin-bottom: 25px;
  margin-top: -5px;
  text-align: center;
}
</style>
