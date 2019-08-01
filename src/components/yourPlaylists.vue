<template>
  <div>
    <div>
      <h3>Your Playlists</h3>
      <button v-on:click="changeCreatePlaylistState()">Add new playlist</button><hr>
      <!-- Add Playlist -->
      <div v-show="createPlaylistState">
        <label>Playlist Name: </label>
        <input type="text" v-model="playlistName"/><br>
        <label>You need to upload 1 music to create playlist. </label>
        <input type="file" multiple v-on:change="onFilesChanged()" ref="myFiles"/>
        <button v-on:click="createPlaylist()">Create Playlist</button>
        <div id="percentageWrapper">
          <div id="percentage" v-bind:style="percentageStyle">
            <!-- Uploading bar -->
          </div>
        </div>
      </div>
      <!-- Var olan bir playliste yeni muzik eklemeyi saglayan alan -->
      <div v-show="addNewMusicState">
        <p>You are adding new music to {{this.playlistNameForMusicUplaod}}</p>
        <input type="file" multiple ref="myUploadFiles"/>
        <button v-on:click="addNewMusic()">Add the music</button>
        <div id="percentageWrapper1">
          <div id="percentage1" v-bind:style="percentageStyle1">
            <!-- Uploading bar -->
          </div>
        </div>
      </div>
      <div>
        <video id="audioClip" controls autoplay name="media">
          <source v-bind:src="downloadAudioSrc" type="audio/mp3">
        </video>
        <p>{{currentMusicName}}</p>
      </div>
      <!-- Playlists -->
      <div>
        <div v-for="playlist in playlists" class="playlistsDiv">
          <h4>{{ playlist.playlistName }}</h4>
          <button v-on:click="changeAddNewMusicState(playlist.playlistName)">Add new music to {{playlist.playlistName}}</button>
          <div v-for="music in playlist.musics" class="musicsDiv">
            <p>{{ music }}</p>
            <button v-on:click="downloadMusic(music, playlist.playlistName)">Play this music</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export default {
  data(){
    return {
      playlists: [],
      createPlaylistState: false,
      playlistName: '',
      playlistNames: [],
      playlistNameForMusicUplaod: '',
      addNewMusicState: false,
      currentMusicName: '',
      percentageStyle:{
        width: 0
      },
      percentageStyle1:{
        width: 0
      },
      downloadAudioSrc: ''
    }
  },
  //Auth icin kullanicaz
  /*beforeRouteEnter (to, from, next) {
    console.log("Sa");
    next();
  },*/
  created(){
    this.listAllPlaylists();
  },
  methods: {
    listAllPlaylists(){
      var user = firebase.auth().currentUser;
      var storageRef = firebase.storage().ref(user.uid);

      storageRef.listAll().then((res) => {
        res.prefixes.forEach((folderRef) => {
          this.playlistNames.push(folderRef);

          //Burda playlist'ler listelenir
          var playlistName = folderRef.name;
          var playlist = {playlistName: playlistName, musics: []};
          this.playlists.push(playlist);

          var newStorageRef = firebase.storage().ref(folderRef.fullPath);
          newStorageRef.listAll().then((res) => {
            res.items.forEach((itemRef) => {

              //Burda sarkilar listelenir
              playlist.musics.push(itemRef.name);

            });
          });

        });
      });
    },
    changeCreatePlaylistState(){
      this.createPlaylistState = !this.createPlaylistState;
    },
    createPlaylist(){
      var file = this.$refs.myFiles.files[0];
      var user = firebase.auth().currentUser;

      var storageRef = firebase.storage().ref(user.uid + '/' + this.playlistName + '/' + file.name);
      var task = storageRef.put(file);

      task.on('state_changed',
      (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
        this.percentageStyle.width = percentage + '%';
      },
      (error) => {
        console.log("Failed");
      },
      () => {
        console.log("Completed");
        this.percentageStyle.width = 0;
      });
    },
    onFilesChanged(){},
    downloadMusic(musicName, playlistName){
      var user = firebase.auth().currentUser;
      var storageRef = firebase.storage();

      var pathReference = storageRef.ref(user.uid + '/' + playlistName + '/' + musicName);
      this.currentMusicName = musicName;

      pathReference.getDownloadURL().then((url) => {
        console.log(url);

        this.downloadAudioSrc = url;
        var audioContainer = document.getElementById('audioClip');
        audioContainer.load();
        audioContainer.play();

      }).catch((error) => {

      });

    },
    addNewMusic(){
      var file = this.$refs.myUploadFiles.files[0];
      var user = firebase.auth().currentUser;

      var storageRef = firebase.storage().ref(user.uid + '/' + this.playlistNameForMusicUplaod + '/' + file.name);
      var task = storageRef.put(file);

      task.on('state_changed',
      (snapshot) => {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
        this.percentageStyle1.width = percentage + '%';
      },
      (error) => {
        console.log("Failed");
      },
      () => {
        console.log("Completed");
        this.percentageStyle1.width = 0;
      });
    },
    changeAddNewMusicState(playlistName){
      this.playlistNameForMusicUplaod = playlistName;
      this.addNewMusicState = !this.addNewMusicState;
    },
  },
  components: {

  },
}
</script>

<style scoped>

#percentageWrapper{
  width: 50%;
  border: 1px solid gray;
  margin-top: 10px;
  margin-bottom: 10px;
}

#percentage{
  background-color: red;
  height: 10px;
  width: 0;
}

#percentageWrapper1{
  width: 50%;
  border: 1px solid gray;
  margin-top: 10px;
  margin-bottom: 10px;
}

#percentage1{
  background-color: red;
  height: 10px;
  width: 0;
}

.playlistsDiv{
  margin-bottom: 20px;
}

.playlistsDiv h4{
  display: inline;
  margin-right: 10px;
}

.musicsDiv p{
  display: inline;
  margin-right: 10px;
}

.musicsDiv{
  margin-top: 10px;
}

</style>
