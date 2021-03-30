<template>
  <div class="audio-player custom-player">
    <div id="mainPlayer" class="thePlayer">{{ $t('audio_player_loaded') }}</div>
  </div>
</template>

<script>
export default {
name: "MainPlayerComponent",
  props: {
    playListAudios: { type: Array, default:[] }
  },

  async mounted() {
    var playlist = [];
    this.playListAudios.map(function (value, key) {
      playlist.push({
        sources: [
          {
            file: value.file_name
          }
        ],
        title: value.title,
        duration: '00:02:10',
        slug: value.title,
      });
    });

    var mainPlayerInstance = jwplayer("mainPlayer");
    mainPlayerInstance.setup({
      playlist: playlist,
      plugins: {
        '../assets/js/jwplayer/jwplayer.shuffle.min.js': {
          autostart: true,
        }
      },
      height: 40,
      width: "100%",
      volume: 100,
      autostart: false,
      shuffle: true
    });

    mainPlayerInstance.on('playlistItem', function () {
      var playlist = mainPlayerInstance.getPlaylist();
      var idx = mainPlayerInstance.getPlaylistIndex();
      var li = this.nodeList2Array('.soundtrack');
      for (var i = 0; i < playlist.length; i++) {
        if (i === idx) {
          li[i].classList.add('active');
        } else {
          li[i].classList.remove('active');
        }
      }
    });
  },

  beforeMount() {
    jwplayer.key = "CKjOe06GxAOe3Dj9NaWPCQKtqvqQdyFV8z9wsg==";
  }
}
</script>
