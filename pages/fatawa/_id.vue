<template>
  <div id="MainContent" :class="'book-'+bgColor +' book-content book-content-view'">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="data ? data.title : ''" :innerPage="$t('fatawas')" :heading="$t('fatawas')" innerSlug="fatawa"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <article class="bookPage mb-4">
          <div class="bookViewHead postViewHead">
            <div class="bookViewHead-inner">
              <div class="d-flex justify-content-between">
                <div class="bookViewHead-block ">
                  <div class="head-title p-2" style="width: 100%">
                    <h2 class="MainText strong6 mb-2">{{ data ? data.title : '' }}</h2>
                  </div>
                </div>
                <div class="bookViewHead-block bookViewHead-left">
                  <ContentSettingComponent  :bgColor="this.bgColor" @onBgColorChange="setBgColor"/>
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
            <div class="box-post box-post-sm" id="printMe">
              <div style="margin-bottom: 30px; text-align: right;" v-html="data ? data.content: ''" id="inner--contents"></div>
            </div>
            <nav class="text-center mt-3 mb-4">
              <a href="javascript: void(0)" class="previous round" :title="$t('previous')" @click="load(data.previous)">&#8249;</a>
              <a href="javascript: void(0)" class="next round" :title="$t('next')" @click="load(data.next)">&#8250;</a>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import SocialComponent from "@/components/SocialComponent";
import PrintAndReportComponent from "@/components/PrintAndReportComponent";
import ContentSettingComponent from "@/components/ContentSettingComponent";
import {mapGetters} from 'vuex';
import {stripTags} from "../../utility/Utility";

export default {
  components: {PrintAndReportComponent, SocialComponent, BreadCrumbComponent, ContentSettingComponent},

  async asyncData({app, params, store, query}) {
    let result = undefined;
    if (store.state.fatawaPaginatedList && store.state.fatawaPaginatedList.data && store.state.fatawaPaginatedList.data.length > 0)
      result = store.state.fatawaPaginatedList.data.find(f => f.id == params.id);

    if (result)
      return {data: result};
    else {
      try {
        let {data} = await app.$axios.get(`/fatawa/${params.id}`+(query.term ? '?term='+encodeURI(query.term): ''));
        return {data: data.data};
      } catch (error) {
        console.log('Could not fetch single fatwa, in detail page.', error);
      }//..... end of try-catch() .....//
    }//..... end if-else() .....//
  },

  data() {
    return {
      data: {},
      bgColor: 'white'
    }
  },

  mounted() {
    this.$store.dispatch('recordPageView', {type: 'fatawa', id: this.$route.params.id});
  },

  computed: {
    ...mapGetters(['getSiteDirection', 'getBreadcrumbs']),
    url() {
      return process.client ? window.location.href : null;
    },

    getTitleForPage() {
      return this.$t('menu.fatawa') + " - " +this.data.title;
    },

    getDescriptionForSeo() {
      let des = this.data.content;
      if (des) {
        des = stripTags(des);
        return des.substr(0, 160);
      }

      return this.getTitleForPage;
    }
  },

  methods: {
    setBgColor(color) {
      this.bgColor = color;
    },

    load(id) {
      if (!id) return false;
      let p = this.$route.path.split('/').reverse();
      p[0] = id;
      this.$router.push(p.reverse().join('/'));
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
    let url = "https://ibn-mahmoud.com/videos/"+this.$route.params.id;

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

<style scoped>
a.round {
  margin: 0 25px;
  font-size: 30px;
  font-weight: bolder;
  color: black;
  /* line-height: 1; */
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
