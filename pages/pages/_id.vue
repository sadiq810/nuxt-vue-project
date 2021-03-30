<template>
  <div id="MainContent" :class="'book-'+bgColor +' book-content book-content-view'">
    <div class="MainContent-Container">
      <BreadCrumbComponent :title="data ?  data.title : $t('page')" :heading="data ?  data.title : ''"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <article class="bookPage mb-4">
          <div class="bookViewHead postViewHead">
            <div class="bookViewHead-inner">
              <div class="d-flex justify-content-between">
                <div class="bookViewHead-block ">
                  <div class="head-title p-2" style="width: 100%">
                    <h2 class="MainText strong6 mb-2">{{ data ?  data.title : ''}}</h2>
                  </div>
                </div>

                <div class="bookViewHead-block bookViewHead-left">
                  <ContentSettingComponent :bgColor="this.bgColor" @onBgColorChange="setBgColor"/>
                  <div class="dropdown inline-block">
                    <a href="#" class="thumb thumb-xs thumb-round dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="ico-share"></i>
                    </a>
                    <div class="dropdown-menu text-right">
                      <SocialComponent :item="data" :curl="url" :heading="$t('share')"/>
                    </div>
                  </div>

                  <PrintAndReportComponent elementId="printMe"/>
                </div>
              </div>
            </div>
          </div>
          <div class="bookViewContent" id="bookViewContent">
            <div class="box-post box-post-sm" id="printMe">
              <div style="margin-bottom: 30px; text-align: right;" v-html="data ? data.content: ''"></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import GallerySliderComponent from "~/components/gallery_components/GallerySliderComponent";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import SocialComponent from "@/components/SocialComponent";
import PrintComponent from "@/components/PrintComponent";
import PrintAndReportComponent from "@/components/PrintAndReportComponent";
import IconSocialComponent from "@/components/IconSocialComponent";
import ContentSettingComponent from "@/components/ContentSettingComponent";
import {mapGetters} from  'vuex';
import {stripTags} from "../../utility/Utility";

export default {
  components: {IconSocialComponent, PrintAndReportComponent, PrintComponent, SocialComponent, BreadCrumbComponent, GallerySliderComponent, ContentSettingComponent},
  async asyncData({app, params, store}) {
    let result = undefined;
    if (store.state.settings && store.state.settings.pages.data && store.state.settings.pages.data.length > 0)
      result = store.state.settings.pages.data.find(f => f.slug == params.id);

    if (result)
      return {data: result};
    else {

      try {
        let {data} = await app.$axios.get(`/page-by-slug?slug=${params.id}`);
        return {data: data};
      } catch (error) {
        console.log('Could not fetch single page, in detail page.', error);
      }//..... end of try-catch() .....//
    }//..... end if-else() .....//
  },

  data() {
    return {
      data: {},
      bgColor: 'white'
    }
  },

  computed: {
    ...mapGetters(['getSiteDirection', 'getBreadcrumbs']),
    url() {
      return process.client ? window.location.href : "";
    },

    getTitleForPage() {
      return this.$t('menu.page') + " - " +this.data.title;
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
    let url = "https://ibn-mahmoud.com/pages/"+this.$route.params.id;

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
