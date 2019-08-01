import entryPage from './components/entryPage.vue';
import musicsPage from './components/musicsPage.vue';
import yourPlaylists from './components/yourPlaylists.vue';

export default [
  { path: '/', component: entryPage },
  { path: '/musics', component: musicsPage },
  { path: '/yourPlaylists', component: yourPlaylists }
]
