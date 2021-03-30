<template>
  <div id="MainContent"  :class="'book-'+bgColor +' book-content book-content-view'">
    <div class="MainContent-Container">
      <BreadCrumbComponent :title="data ? data.title : ''" :innerPage="$t('audio_library')" :heading="$t('audio_library')" innerSlug="sounds"/>
      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <article class="bookPage mb-4">
          <div class="bookViewHead postViewHead">
            <div class="bookViewHead-inner">
              <div class="d-flex justify-content-between">
                <div class="bookViewHead-block ">
                  <div class="head-title p-2" style="width: 100%">
                    <h2 class="MainText strong6 mb-2" v-html=" data ? data.title : ''"/>
                    <p v-html=" data ? data.category : ''"></p>
                  </div>
                </div>

                <div class="bookViewHead-block bookViewHead-left">
                  <ContentSettingComponent :bgColor="this.bgColor" @onBgColorChange="setBgColor"/>
                  <div class="dropdown inline-block">
                    <a href="#" class="thumb thumb-xs thumb-round dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="ico-share"></i>
                    </a>
                    <div class="dropdown-menu text-right">
                      <SocialComponent :item="data" :heading="$t('share')" :curl="url"/>
                    </div>
                  </div>
                  <PrintAndReportComponent elementId="printMe"/>
                </div>
              </div>
            </div>
          </div>

          <div class="bookViewContent" id="bookViewContent">
            <div class="box-post box-post-sm">
              <div class="mb-3 box lighter-bg p-3">
                <div class="audio-player custom-player2">
                  <div id="mainPlayer" class="thePlayer">{{ $t('audio_player_loaded') }}</div>
                </div>

                <div class="text-center mt-3 d-flex d-flex-sides">
                  <IconSocialComponent :title="data.title" :url="url"/>
                  <a :href="data.file_name" :download="data.file_name" target="_blank" class="btn-solid btn-round" @click="$store.dispatch('bookDownloaded', {id: data.id, type: 'sound'})">
                    <span class="sm-none">{{ $t('download') }}</span>
                    <i class="ico-download"></i>
                  </a>
                </div>
              </div>
              <div id="printMe">
                <div style="margin-bottom: 30px; text-align: right" v-html=" data ? data.summary : ''" id="inner--contents"></div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <section class="pt-4 pb-4 box">
        <div class="container">
          <div class="text-center mb-30 center-title ">
            <h1 class="strong5 mb-3 AltText pt-2">{{ $t('watch_also') }}</h1>
            <p class="strong6">{{ $t('watch_also_intro') }}</p>
          </div>
          <div class="box box-playlist-home">
            <div class="sound-list">
              <div class="sound-list-content">
                <ul class="playlist-list list list-items list-items-sm row">
                  <Audios v-for="(audio,index) in relatedAudios" :key="index" :audio="audio" @playThis="playThis(index,audio.id)" :PlaySingle="PlaySingle" :activeindex="activeindex" :singlePlayIndex="singlePlayIndex"/>
                </ul>
              </div>
            </div>
          </div>
          <div class="text-center mt-30">
            <nuxt-link class="btn-solid btn-big btn-round" :to="localePath('/sounds')">
              {{ $t('show_more') }} <i class="ico-arrow-left"></i>
            </nuxt-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Audios from "~/components/audio_components/AudioComponent";
import SocialComponent from "@/components/SocialComponent";
import PrintAndReportComponent from "@/components/PrintAndReportComponent";
import IconSocialComponent from "@/components/IconSocialComponent";
import ContentSettingComponent from "@/components/ContentSettingComponent";
import {mapGetters} from 'vuex';
import {stripTags} from "../../utility/Utility";

export default {
  components: {IconSocialComponent, PrintAndReportComponent, SocialComponent, BreadCrumbComponent, Audios, ContentSettingComponent},

  data() {
    return {
      data: {},
      relatedAudios: [],
      PlaySingle:true,
      activeindex:undefined,
      singlePlayIndex: this.$route.params.id,
      bgColor: 'white'
    }
  },

  async asyncData({app, params, store, query}) {
    let result = undefined;
    if (store.state.audios && store.state.audios.data && store.state.audios.data.length > 0)
      result = store.state.audios.data.find(f => f.id == params.id);

    if (result)
      return {data: result, relatedAudios: store.state.audios.data.filter(f => f.id != result.id)}
    else {
      try {
        let {data} = await app.$axios.get(`/audio-id?id=${params.id}`+(query.term ? '&term='+encodeURI(query.term): ''));
        return {data: data.data, relatedAudios: data.relatedAudios};
      } catch (error) {
        console.log('Could not fetch single audios, in detail page.', error);
      }//..... end of try-catch() .....//
    }//..... end if-else() .....//
  },

  mounted() {
    var playlist = [{
      sources: [
        {
          file: this.data.file_name
        }
      ],
      title: this.data.title,
      duration: '00:02:10',
      slug: this.data.title,
    },];
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
      autostart: true,
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
  methods: {
    nodeList2Array(sel) {
      var li = Array.prototype.slice.call(document.querySelectorAll(sel));
      return li;
    },

    playThis(index, value) {
      this.activeindex = value
      shuffle_playlistItem(index);
    },

    setBgColor(color) {
      this.bgColor = color;
    }
  },

  computed: {
    ...mapGetters(['getSiteDirection', 'getBreadcrumbs']),
    url() {
      return process.client ? window.location.href : "";
    },

    getTitleForPage() {
      return this.$t('menu.sounds') + " - " +this.data.title;
    },

    getDescriptionForSeo() {
      let des = this.data.summary;
      if (des) {
        des = stripTags(des);
        return des.substr(0, 160);
      }

      return this.getTitleForPage;
    }
  },

  jsonld() {
    return this.getBreadcrumbs;
  },

  head() {
    const i18nSeo = this.$nuxtI18nHead({ addSeoAttributes: true });
    let title = this.getTitleForPage + " - " +this.$t('meta.title');
    let description = this.getDescriptionForSeo;
    let keywords = this.$t('meta.keywords');
    let url = "https://ibn-mahmoud.com/sounds/"+this.$route.params.id;

    return {
      title: title,
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
