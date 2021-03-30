<template>
  <div class="tab-pane fade show active">
    <div class="audio-player custom-player">
      <div id="mainPlayer" class="thePlayer">{{ $t('audio_player_loaded') }}</div>
    </div>
    <div class="box">
      <div class="box-inner border-bottom">
        <div class="sec-title spaceLR-main mb-0">
          <div class="secTitleL">
            <h1 class="h3">
              <a href="javascript: void(0)" class="showBookCats thumb thumb-xs thumb-round">
                <i class="ico-menu-alt"></i>
              </a>
              <span class="strong6">{{ $t('audio_search_result') }}</span>
              <img src="/assets/img/loader.gif" v-if="isSearching" :alt="$t('searching')" style="margin: 6px 34px;">
            </h1>
          </div>
        </div>
      </div>
      <div class="sound-list mb-4">
        <div class="sound-list-content">
          <ul v-if="getSearchResult.length > 0" class="playlist-list list list-items list-items-sm">
            <Audios v-for="(audio,index) in getSearchResult" :key="index" :audio="audio" @playThis="playThis(index, audio.id)" @playNext="playNext" :showList="showList" :activeindex="activeindex" :term="getSearchStr"/>
          </ul>
          <ul v-else class="playlist-list list list-items list-items-sm">
            <li>
              <div class="soundtrack list-item item-multi-links">
                <a href="javascript:;" class="soundtrack-title">
                  <div class="list-item-body">
                    <h1 class="h3 text-danger">{{ $t('no_records') }}</h1>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <PaginationComponent :searchMeta="getSearchMeta" @onPageChange="loadData"/>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import MainPlayerComponent from "@/components/audio_components/MainPlayerComponent";
import PaginationComponent from "@/components/PaginationComponent";
import Audios from "~/components/audio_components/AudioComponent";

export default {
  name: "AudioContents",
  components: {PaginationComponent, MainPlayerComponent, Audios},

  data() {
    return {
      showList: true,
      activeindex: undefined
    }
  },

  computed: {
    ...mapGetters(['getSearchResult', 'getSearchMeta', 'getSearchStr', 'isSearching']),
  },

  mounted() {
    this.loadData(1);

      if (this.getSearchResult.length > 0) {
        var playlist = [];
        this.getSearchResult.map(function (value, key) {
          playlist.push({
            sources: [
              {
                file: value.file_name
              }
            ],
            title: value.title,
            /* duration: '00:02:10',*/
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
      }
  },

  methods: {
    loadData(page) {
      this.$store.dispatch('performSearch', {keyword: this.getSearchStr, pageNo: page, type: 'audio'});
    },

    nodeList2Array(sel) {
      var li = Array.prototype.slice.call(document.querySelectorAll(sel));
      return li;
    },
    playThis(index, value) {
      this.activeindex = value
      shuffle_playlistItem(index);
    },
    playNext(index, id) {
      this.playThis(index, index);
    }
  },

  beforeMount() {
    jwplayer.key = "CKjOe06GxAOe3Dj9NaWPCQKtqvqQdyFV8z9wsg==";
  }
}
</script>
