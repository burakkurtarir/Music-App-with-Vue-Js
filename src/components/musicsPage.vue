<template>
  <div>
    <div id="yourMusics">
      <h2>Your Musics</h2>
      <div v-for="music in musicList">
        <p>{{music.name}}</p>
        <button v-on:click="downloadMusic(music.name)">Download this music</button>
      </div>
      <video id="audioClip" controls autoplay name="media">
        <source id="testSource" v-bind:src="downloadAudioSrc" type="audio/mp3">
      </video>
    </div>
    <button v-on:click="showMusics(5)">Show Musics</button>
    <button v-on:click="newMusicSectionToggle()">New Music</button>
    <div id="newMusic" v-show="newMusicSection">
        <h3>Choose your music</h3>
        <input type="file" multiple v-on:change="onFilesChanged()" ref="myFiles"/>
        <br><br>
        <audio v-bind:src="audioSrc" controls></audio>
        <button v-on:click="saveToStorage()">Upload</button>
        <div id="percentageWrapper">
          <div id="percentage">

          </div>
        </div>
        <p id="uploadResult"></p>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
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



export default {
  data(){
    return {
      newMusicSection: false,
      audioSrc: '',
      musicList: [],
      downloadAudioSrc: '',
      audioControls: true
    }
  },
  //Auth icin kullanicaz
  /*beforeRouteEnter (to, from, next) {
    console.log("Sa");
    next();
  },*/
  created(){
    this.listFiles();
  },
  methods: {
    newMusicSectionToggle(){
      this.newMusicSection = !this.newMusicSection;
    },
    onFilesChanged(){
      this.audioSrc = URL.createObjectURL(this.$refs.myFiles.files[0]);
    },
    saveToStorage(){

      var file = this.$refs.myFiles.files[0];

      var storageRef = firebase.storage().ref('audios/' + file.name);
      var task = storageRef.put(file);

      task.on('state_changed',
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        var percentageDiv = document.getElementById('percentage');
        percentageDiv.style.width = percentage + "%";
        console.log(percentage);
      },
      function error(err){console.log("Upload failed");},
      function complete(){
        alert("Upload completed");
        var percentageDiv = document.getElementById('percentage');
        percentageDiv.style.width = "0";
      });
    },
    listFiles(){
      var storageRef = firebase.storage().ref('audios');
      console.log(storageRef);

      storageRef.listAll().then((res) => {
        res.items.forEach((itemRef) => {
          this.musicList.push({name: itemRef.name});
        });
      });
      /*storageRef.listAll().then(function(res){
        res.prefixes.forEach(function(folderRef){
          console.log("Prefixes");
        });
        res.items.forEach((itemRef) => {
          console.log(itemRef.name);
        });
      }).catch(function(error){
      });*/
    },
    showMusics(number){
      console.log(this.musicList);
      console.log(number);
    },
    downloadMusic(musicName){
      console.log(musicName);

      var storage = firebase.storage();
      var pathReference = storage.ref('audios/' + musicName);

      pathReference.getDownloadURL().then((url) => {


        console.log(url);
        //this.downloadAudioSrc = url;
        //console.log("al ulan");
        //console.log(this.downloadAudioSrc);

        var srcValue = url;
        var audioContainer = document.getElementById('audioClip');
        var audioSource = document.getElementById('testSource');
        audioSource.setAttribute('src', srcValue);
        audioContainer.load();
        audioContainer.play();

        //Burda dosya yolu belirlenecek
      }).catch((error) => {

      });
    },
  },
  components: {

  },
}
</script>

<style scoped>

#yourMusics{
  max-width: 1200px;
  margin: auto;
}

#percentageWrapper{
  width: 50%;
  border: 1px solid gray;
}

#percentage{
  background-color: red;
  height: 10px;
  width: 0;
}

</style>
