<template>
  <div id="MainContent" class=" player-atBottom">
    <div class="MainContent-Container">
      <BreadCrumbComponent :title="$t('videos_library')" :heading="$t('videos_library')"/>
      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <div class="CategoryWithFilter">
          <div class="Category-MainContent">
            <div class="sec-title spaceLR-main mb-3">
              <div class="secTitleL">
                <h1 class="h1"><span class="strong6">{{ $t('the_videos') }}</span></h1>
              </div>
              <OrderSortComponent :value="sort" @sortChange="sortChange"/>
            </div>

            <ul id="MainListing" class="listItems thumbnail-items thumbnail-items-cols">
              <videos v-for="video in getVideos.data" :key="video.id" :video="video" :showDescription="showDescription"/>
            </ul>

            <PaginationComponent :searchMeta="getVideos" @onPageChange="loadVideos"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import videos from "~/components/video_components/VideoComponent";
  import BreadCrumbComponent from "@/components/BreadCrumbComponent";
  import OrderSortComponent from "@/components/OrderSortComponent";
  import PaginationComponent from "@/components/PaginationComponent";

  export default {
    name: "index",
    components: {PaginationComponent, videos,OrderSortComponent,BreadCrumbComponent},

    data() {
      return {
        showDescription: true,
        sort: '1'
      }
    },

    async fetch({store}) {
      //if (store.state.videos.length == 0)
        await store.dispatch('fetchVideos', {page: 1})
    },

    computed: {
      ...mapGetters(['getVideos', 'getSiteDirection', 'getBreadcrumbs'])
    },

    methods: {
      async loadVideos(page = 1) {
        let sort = this.sort;
        await this.$store.dispatch('fetchVideos', {page, sort});
      },

      sortChange(value) {
        this.sort = value;
        this.loadVideos(1)
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
      let url = "https://ibn-mahmoud.com/videos";

      return {
        title: this.$t('menu.videos')+ " - " +title,
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
