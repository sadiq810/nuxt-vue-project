<template>
  <div id="MainContent" class="player-atBottom search__page">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="$t('search')" :heading="$t('search_result') +':'+ getSearchStr"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <div class="CategoryWithFilter active">
          <div class="SideBar RSideBar">
            <div class="box book-categories">
              <div class="head-title p-3">
                <div class="d-flex align-items-center mb-4">
                  <h4 class="main-color strong6 mb-0">{{ $t('search_scope') }}</h4>
                  <a class="thumb thumb-xs thumb-round LightBg mr-auto FilterTrigger"><i class="ico-close"></i></a>
                </div>
              </div>
              <div class="sideBookmarks-scrollBox">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a  :class="[selectedTab == 'book' ? 'nav-link active' : 'nav-link']" @click="setTab('book')"  href="javascript: void(0)">  <i class="ico-book ml-item-ico"></i>نتائج الرسائل (الكتب)</a>
                  <a  :class="[selectedTab == 'fatawa' ? 'nav-link active' : 'nav-link']" @click="setTab('fatawa')"  href="javascript: void(0)">  <i class="ico-question ml-item-ico"></i>نتائج الفتاوي</a>
                  <a  :class="[selectedTab == 'audio' ? 'nav-link active' : 'nav-link']" @click="setTab('audio')" href="javascript: void(0)"><i class="ico-volume ml-item-ico"></i>نتائج قسم الصوتيات</a>
                  <a  :class="[selectedTab == 'video' ? 'nav-link active' : 'nav-link']" @click="setTab('video')" href="javascript: void(0)"> <i class="ico-video-camera ml-item-ico"></i>نتائج قسم المرئيات</a>
                  <a  :class="[selectedTab == 'article' ? 'nav-link active' : 'nav-link']" @click="setTab('article')" href="javascript: void(0)"><i class="ico-list-ol ml-item-ico"></i>نتائج المقالات</a>
                </div>
              </div>
            </div>
          </div>
          <div class="Category-MainContent">
            <div class="tab-content" id="SearchTabsContent">
              <FatawaContents v-if="selectedTab == 'fatawa'"/>
              <BookContents v-if="selectedTab == 'book'"/>
              <ArticleContents v-if="selectedTab == 'article'"/>
              <AudioContents v-if="selectedTab == 'audio'"/>
              <VideoContents v-if="selectedTab == 'video'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import BookContents from "@/components/search_component/BookContents";
import FatawaContents from "@/components/search_component/FataContents";
import ArticleContents from "@/components/search_component/ArticleContents";
import AudioContents from "@/components/search_component/AudioContents";
import VideoContents from "@/components/search_component/VideoContents";
import {mapGetters} from 'vuex';

export default {
name: "search",
  components: {VideoContents, AudioContents, ArticleContents, FatawaContents, BookContents, BreadCrumbComponent},

  computed: {
    ...mapGetters(['getAdvanceSearchFilter', 'getSelectedTab', 'getSiteDirection', 'getSearchStr', 'getBreadcrumbs']),
    selectedTab: {
      set: function(tab) {
        this.$store.commit('SET_SELECTED_TAB', tab);
      },
      get: function() {
        return this.getSelectedTab
      }
    },

    getTitle() {
      if (this.getSearchStr)
        return this.$t('menu.home')+ " - " + this.$t(this.getSelectedTab + '_search_result')+": "+this.getSearchStr+" - "+this.$t('meta.title');

      return this.$t('menu.home')+ " - " + this.$t('meta.title')
    }
  },

  methods: {
    setTab(tab) {
      if (this.selectedTab != tab)
        this.$store.commit('SET_SEARCH_RESULT', {data: [], meta: []})

      this.selectedTab = tab;
    }
  },

  jsonld() {
    return this.getBreadcrumbs;
  },

  mounted() {
    $( 'body' ).on('click', '.showBookCats', function( ) {
      $('.CategoryWithFilter').toggleClass( 'active' );
    });
  },

  head() {
    const i18nSeo = this.$nuxtI18nHead({ addSeoAttributes: true });
    let title = this.$t('meta.title');
    let keywords = this.$t('meta.keywords');
    let description = this.$t('meta.description');
    let url = "https://ibn-mahmoud.com/search";

    return {
      title: this.$t('search')+ " - " + title,
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
