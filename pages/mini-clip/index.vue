<template>
  <div id="MainContent" class=" player-atBottom">
    <div class="audio-player custom-player">
      <div id="mainPlayer" class="thePlayer">{{ $t('audio_player_loaded') }}</div>
    </div>
    <div class="MainContent-Container">
      <BreadCrumbComponent :title="$t('audio_library')" :heading="$t('mini_clips')"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <div class="CategoryWithFilter">
          <div class="SideBar RSideBar">
            <div class="box book-categories">
              <div class="head-title p-3">
                <div class="d-flex align-items-center mb-4">
                  <h4 class="main-color strong6 mb-0">{{ $t("mini_clips")}}</h4>
                  <a class="thumb thumb-xs thumb-round LightBg mr-auto FilterTrigger"><i class="ico-close"></i></a>
                </div>

                <div class="form-control-icon">
                  <span class="input-icon"><i class="ico-search2"></i></span>
                  <input type="text" class="form-control searchInDrop" v-model="search" id="search-inBook2" :placeholder="$t('search')">
                  <span class="input-icon" id="close--icon" v-if="search" @click="search=''"><i class="ico-close"></i></span>
                </div>
              </div>

              <div class="sideBookmarks-scrollBox">
                <div class="underline-list multiLevels-menu">
                  <ul ref="menuList">
                    <li v-for="f in filterList" :key="f.id" :class="[f.id==getSelectedMiniClip ? 'current' : '']">
                      <div class="ml-item">
                        <i class="ico-volume ml-item-ico"></i>
                        <a href="javascript:;" @click="setMiniClipCategory(f.id)">{{ f.name }}</a></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="Category-MainContent">
            <div class="box">
              <div class="box-inner border-bottom">
                <div class="sec-title spaceLR-main mb-0">
                  <div class="secTitleL">
                    <h1 class="h3"><span class="strong6">{{ soundCategory ? soundCategory.name : 'كل الأصوات' }}</span>
                    </h1>
                  </div>
                  <OrderSortComponent :value="sort" @sortChange="sortChange"/>
                </div>
              </div>

              <div class="sound-list mb-4">
                <div class="sound-list-content">
                  <ul v-if="getMiniclips.data.length > 0" class="playlist-list list list-items list-items-sm" :style="{'max-height': height+'px', 'overflow-y':'auto'}">
                    <Audios v-for="(audio,index) in getMiniclips.data" :key="index" :audio="audio" @playNext="playNext" @playThis="playThis(index, audio.id)" :showList="showList" :activeindex="activeindex"/>
                  </ul>
                  <ul v-else class="playlist-list list list-items list-items-sm">
                    <li>
                      <div class="soundtrack list-item item-multi-links">
                        <a href="javascript:;" class="soundtrack-title">
                          <div class="list-item-body">
                            <h1 class="h3 text-danger">{{ $t("no_records") }}</h1>
                          </div>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <PaginationComponent :searchMeta="getMiniclips" @onPageChange="loadAudios"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import BreadCrumbComponent from "@/components/BreadCrumbComponent";
  import OrderSortComponent from "@/components/OrderSortComponent";
  import Audios from "~/components/audio_components/AudioComponent";
  import PaginationComponent from "@/components/PaginationComponent";
  var mainPlayerInstance = undefined;

  export default {
    name: "index",
    components: {PaginationComponent, OrderSortComponent, BreadCrumbComponent, Audios},
    data() {
      return {
        sort: '1',
        search: '',
        showList: true,
        activeindex: undefined,
        height: 900
      }
    },

    async fetch({store}) {
         await store.dispatch('fetchMiniClip');
    },

    computed: {
      ...mapGetters(['getSoundCategory', 'getSelectedMiniClip', 'getMiniclips', 'getSiteDirection', 'getBreadcrumbs']),
      soundCategory() {
        return this.getSoundCategory ? this.getSoundCategory.find((f) => f.id == this.getSelectedMiniClip) : undefined;
      },
      filterList() {
        return this.search ? this.getSoundCategory.filter(f => f.name.toLowerCase().includes(this.search.toLowerCase())) : this.getSoundCategory;
      },
    },

   async mounted() {
     if (this.$refs.menuList) {
       let h = this.$refs.menuList.offsetHeight;
       this.height = h > 700 ? h : this.height;
     }

      if (this.$store.state.sound_category_list.length == 0) await this.$store.dispatch('fetchAllSoundCategory');

      var playlist = [];
      if (this.$store.state.miniclips && this.$store.state.miniclips.data && this.$store.state.miniclips.data.length > 0) {
        this.getMiniclips.data.map(function (value, key) {
          playlist.push({
            sources: [
              {
                file: value.file_name
              }
            ],
            title: value.title,
           // duration: '00:02:10',
            slug: value.title,
          });
        });
      }
        mainPlayerInstance = jwplayer("mainPlayer");
        mainPlayerInstance.setup({
          playlist: playlist,
          plugins: {
            '/assets/js/jwplayer/jwplayer.shuffle.min.js': {
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

     this.$store.dispatch('recordPageView', {type: 'sound', id: this.$route.params.id});
    },

    beforeMount() {
      jwplayer.key = "CKjOe06GxAOe3Dj9NaWPCQKtqvqQdyFV8z9wsg==";
    },

    updated() {
      if (mainPlayerInstance) {
        let playlist = [];
        this.getMiniclips.data.map(function (value, key) {
          playlist.push({
            sources: [{file: value.file_name}],
            title: value.title,
            slug: value.title,
          });
        });
        mainPlayerInstance.load(playlist)
      }
    },

    methods: {
      setMiniClipCategory(id) {
        this.$store.commit('SET_SELECTED_MINI_CLIP_CATEGORY', id);
        this.loadAudios(1)
      },
      nodeList2Array(sel) {
        var li = Array.prototype.slice.call(document.querySelectorAll(sel));
        return li;
      },
      playThis(index, value) {
        this.activeindex = value
        shuffle_playlistItem(index);
      },
      loadAudios(page = 1) {
        let category_id = this.getSelectedMiniClip ? this.getSelectedMiniClip : 0;
        let sort = this.sort;
        this.$store.dispatch('fetchMiniClip', {page, sort, category_id});
      },
      sortChange(value) {
        this.sort = value;
        this.loadAudios(1)
      },

      playNext(index, id) {
        this.playThis(index, index);
      }
    },

    jsonld() {
      return this.getBreadcrumbs;
    },

    head() {
      const i18nSeo = this.$nuxtI18nHead({ addSeoAttributes: true });
      let title = this.$t('meta.title');
      let keywords = this.$t('meta.keywords');
      let description = this.$t('meta.description');
      let url = "https://ibn-mahmoud.com/mini-clip";

      return {
        title: this.$t('menu.mini_clips')+ " - " +title,
        htmlAttrs: {
          ...i18nSeo.htmlAttrs,
          dir: this.getSiteDirection
        },
        bodyAttrs: {
          class: ""
        },
        meta: [
          {name: 'keywords', content: keywords},
          {hid: 'og-title', property: 'og:title', content: '' + title + ''},
          {hid: 'og:description', content: '' + description + '', property: 'og:description'},
          {hid: 'og:site_name', property: 'og:site_name', content: '' + title + ''},
          {hid: 'meta-title', name: 'title', content: '' + title + ''},
          {hid: 'description', name: 'description', content: '' + description + ''},
          {hid: 'twitter:title', name: 'twitter:title', content: '' + title + ''},
          {hid: 'twitter:description', name: 'twitter:description', content: '' + description + '' },
          {hid: 'og:url', content: '' + url + '', property: 'og:url'},
          {hid: 'twitter:url',name: "twitter:url", content: '' + url + ''},
          ...i18nSeo.meta
        ],
        link: [
          ...i18nSeo.link
        ]
      }
    }
  }
</script>
