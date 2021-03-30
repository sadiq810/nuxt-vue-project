<template>
  <div id="MainContent" class=" player-atBottom">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="$t('cards')" :heading="$t('sheikh_cards')"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <div class="">
          <div class="pt-2 pb-3 ">
            <div class="sec-title spaceLR-main mb-0">
              <div class="secTitleL">
                <h1 class="h3">
                  <span class="strong6">{{ $t('sheikh_cards') }}</span>
                </h1>
              </div>
              <SortComponent :value="sort" @sortChange="sortChange"/>
            </div>
          </div>

          <ul id="MainListing" class="listItems thumbnail-items thumbnail-items-cols">
            <GalleryComponent v-for="card in getCards.data" :key="card.id" :card="card"></GalleryComponent>
          </ul>

          <PaginationComponent :searchMeta="getCards" @onPageChange="loadGallery"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import GalleryComponent from "~/components/gallery_components/GalleryComponent";
  import BreadCrumbComponent from "@/components/BreadCrumbComponent";
  import SortComponent from "@/components/SortComponent";
  import PaginationComponent from "@/components/PaginationComponent";

  export default {
    name: "index",
    components: {PaginationComponent, SortComponent, BreadCrumbComponent, GalleryComponent},
    async fetch({store}) {
      //if (store.state.gallery.length == 0)
      await store.dispatch('fetchGallery', {page: 1});
    },

    data() {
      return {
        sort: ''
      }
    },

    computed: {
      ...mapGetters(['getCards', 'getSiteDirection', 'getBreadcrumbs']),
    },

    methods: {
      scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
      },
      async loadGallery(page = 1) {
        this.scrollToTop();
        let sort = this.sort ? (this.sort == 1 ? 'latest' : 'views') : '';
        await this.$store.dispatch('fetchGallery', {page, sort});
      },

      sortChange(value) {
        this.sort = value;
        this.loadGallery(1)
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
      let url = "https://ibn-mahmoud.com/cards";

      return {
        title: this.$t('menu.cards')+ " - " +title,
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
