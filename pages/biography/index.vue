<template>
  <div id="MainContent" :class="'book-'+bgColor +' book-content book-content-view'">
    <div class="MainContent-Container">
      <BreadCrumbComponent :title="$t('menu.sheikh_biography')" :heading="$t('menu.sheikh_biography')"/>

      <div class="sec-container BookPage-Box" style="margin-top: -60px;">
        <div class="bookCard">
          <div class="book-categories">
            <div class="head-title p-3">
              <div class="d-flex d-flex-sides">
                <h4 class="main-color strong6 mb-4">{{ $t('menu.sheikh_biography') }}</h4>
                <a href="#" class="showBookCats thumb thumb-xs thumb-round text-center"><i class="ico-close"></i></a>
              </div>
              <div class="form-control-icon">
                <span class="input-icon"><i class="ico-search2"></i></span>
                <input type="text" class="form-control searchInDrop" v-model="search" id="search-inBook2" :placeholder="$t('search_biography')">
                <span class="input-icon" id="close--icon" v-if="search" @click="search=''"><i class="ico-close"></i></span>
              </div>
            </div>

            <div class="sideBookmarks-scrollBox">
              <div class="underline-list multiLevels-menu">
                <ul ref="menuList">
                  <li v-for="f in filterList" :key="f.id" :class="[f.id == getSelectedBiography ? 'current': '']">
                    <div class="ml-item"> <i class="ico-book ml-item-ico"></i>
                      <a href="javascript: void(0)" @click="setBiography(f.id)">{{ $stripTags(f.title) }}</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bookPage">
            <div class="bookViewHead">
              <div class="bookViewHead-inner">
                <div class="d-flex justify-content-between">
                  <div class="bookViewHead-block bookViewHead-right">
                    <ContentSettingComponent :bookThumb="true"  :bgColor="this.bgColor" @onBgColorChange="setBgColor" :applyOnClass="true"/>
                  </div>
                  <div class="bookViewHead-block bookViewHead-center">
                    <div class="head-title p-2" style="width: 100%">
                      <h1 class="h4 mb-0 OneLine" v-html="biography ? biography.title : ''"></h1>
                    </div>
                  </div>
                  <div class="bookViewHead-block bookViewHead-left">
                    <div class="dropdown inline-block">
                      <a href="#" class="thumb thumb-xs thumb-round dropdown-toggle WithTooltip" :title="$t('share')" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="ico-share"></i>
                      </a>
                      <div class="dropdown-menu text-right">
                        <SocialComponent :item="biography ? biography : {title: $t('menu.sheikh_biography')}" :heading="$t('share')" :curl="url"/>
                      </div>
                    </div>
                    <PrintAndReportComponent elementId="printMe"/>
                  </div>
                </div>
              </div>
            </div>

            <div style="max-height: 1200px; overflow-y: auto" id="book--view--container">
              <div class="bookViewContent" id="printMe">
                <div  v-for="f in getPaginatedBiography.data" :key="f.id">
                  <div class="bookViewContent">
                    <article class="bookViewContent-inner main--content--container" :data-id="f.id">
                      <h1 class="title1" v-if="!getSelectedBiography">{{ f.title }}</h1>
                      <nuxt-link class="thumbnail-item thumbnail-item-full" :to="localePath(`/biography/${f.id}`)">
                        <div v-html="getSelectedBiography ? f.detail : f.short_detail" id="inner--contents" class="text-justify p-long inner--contents"></div>
                      </nuxt-link>
                      <hr v-if="!getSelectedBiography" />
                    </article>
                  </div>
                </div>

                <div class="bookViewContent" v-if="getPaginatedBiography.data && getPaginatedBiography.data.length == 0">
                  <article class="bookViewContent-inner main--content--container">
                    <div class="text-justify p-long inner--contents">{{ $t('content_not_found') }}</div>
                  </article>
                </div>
              </div>

              <nav class="text-center mt-3 mb-4" v-if="getSelectedBiography">
                <a href="javascript: void(0)" class="previous round" :title="$t('previous')" @click="load(-1)">&#8249;</a>
                <a href="javascript: void(0)" class="next round" :title="$t('next')" @click="load(1)">&#8250;</a>
              </nav>

              <PaginationComponent :searchMeta="getPaginatedBiography" @onPageChange="loadData"/>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import SocialComponent from "@/components/SocialComponent";
import PrintAndReportComponent from "@/components/PrintAndReportComponent";
import ContentSettingComponent from "@/components/ContentSettingComponent";
import {stripTags} from "../../utility/Utility";

export default {
  components: { PrintAndReportComponent, SocialComponent, BreadCrumbComponent, ContentSettingComponent},
  async fetch({store}) {
    if (store.state.biography_list.length == 0) await store.dispatch('fetchAllBiography');
  },

  data() {
    return {
      search: '',
      bgColor: 'white',
      sort: '',
      height: 700
    }
  },

  computed: {
    ...mapGetters(['getAllBiographyList', 'getSelectedBiography', 'getPaginatedBiography', 'getSiteDirection', 'getBreadcrumbs']),

    biography() {
      let f = this.getAllBiographyList.find((f) => f.id == this.getSelectedBiography);
      if (f) this.loadData(1);
      return f;
    },

    filterList() {
      return this.search ? this.getAllBiographyList.filter(f => f.title.toLowerCase().includes(this.search.toLowerCase())): this.getAllBiographyList;
    },

    url() {
      return process.client ? window.location.href : null;
    }
  },

  methods: {
    load(step) {
      let item = (step == -1 ? [...this.getAllBiographyList].sort((a, b) => b.id - a.id): this.getAllBiographyList).find(b => step == 1 ? b.id > this.getSelectedBiography : b.id < this.getSelectedBiography);

      if (item)
        this.setBiography(item.id);
    },

    scrollToTop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    },

    setBiography(id) {
      if (this.getSelectedBiography && this.getSelectedBiography == id) {
        this.$router.push({path: this.$route.path});
        this.$store.commit('SET_SELECTED_BIOGRAPHY', undefined);
        this.loadData();
      } else {
        this.$router.push({path: this.$route.path, query: {id: id}});
        this.$store.commit('SET_SELECTED_BIOGRAPHY', id);
      }


      this.scrollToTop();
    },

    loadData(page = 1) {
      let id = this.getSelectedBiography ? this.getSelectedBiography : 0;
      let sort = this.sort ? (this.sort == 1 ? 'latest': 'views'): '';
      this.$store.dispatch('fetchBiography', {id, page, sort});
    },

    sortChange(value) {
      this.sort = value;
      this.loadData();
    },

    toggle($event) {
      $event.currentTarget.parentNode.parentNode.classList.toggle('active')
      $( $event.currentTarget ).closest('li').children( 'ul' ).slideToggle( 'fast' );
    },

    setBgColor(color) {
      this.bgColor = color;
    }
  },

  mounted() {
    let id = this.$route.query.id;
    if (id)
      this.setBiography(id);
    else
      this.loadData(1);

    if (this.$refs.menuList) {
      let h = this.$refs.menuList.offsetHeight;
      this.height = h > 700 ? h : 700;
    }

    $('.fullscreen-book').click(function(){
      $('body').toggleClass('bookView');
    });

    $( '.showBookCats' ).click( function( ) {
      $('.book-content').toggleClass( 'bookWithoutCats' );
    });
  },

  beforeMount() {
    this.$store.commit('SET_SELECTED_BIOGRAPHY', undefined);
    this.$store.commit('SET_PAGINATED_BIOGRAPHY', []);
  },

  updated() {
    $(".bookViewContent *").css('font-family', $(".bookViewContent").css('font-family'));
  },

  jsonld() {
    return this.getBreadcrumbs;
  },

  head() {
    const i18nSeo = this.$nuxtI18nHead({ addSeoAttributes: true });
    let title = this.$t('meta.title');
    let keywords = this.$t('meta.keywords');
    let description = this.$t('meta.description');
    let url = "https://ibn-mahmoud.com/biography";

    return {
      title: this.$t('menu.sheikh_biography')+ " - " +title,
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
<style scoped>
a.round {
  margin: 0 25px;
  font-size: 30px;
  font-weight: bolder;
  color: black;
  line-height: 1;
  width: 48px;
  height: 55px;
  padding-left: 33px;
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
}

a.round:hover {
  background-color: #ddd;
  color: black;
}

.previous {
  background-color: #f1f1f1;
  color: black;
}

.next {
  background-color: #f1f1f1;
  color: black;
}

.round {
  border-radius: 50%;
}
</style>
