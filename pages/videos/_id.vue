<template>
  <div id="MainContent" :class="'book-'+bgColor +' book-content book-content-view'">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="data ? data.title : ''" :innerPage="$t('videos_library')" :heading="$t('videos_library')" innerSlug="videos"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <article class="bookPage mb-4">
          <div class="bookViewHead postViewHead">
            <div class="bookViewHead-inner">
              <div class="d-flex justify-content-between">
                <div class="bookViewHead-block ">
                  <div class="head-title p-2" style="width: 100%">
                    <h2 class="MainText strong6 mb-2">{{ data ? data.title: '' }}</h2>
                  </div>
                </div>
                <div class="bookViewHead-block bookViewHead-left">
                  <ContentSettingComponent :bgColor="this.bgColor" @onBgColorChange="setBgColor"/>
                  <div class="dropdown inline-block">
                    <a href="#" class="thumb thumb-xs thumb-round dropdown-toggle" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                      <i class="ico-share"></i>
                    </a>
                    <div class="dropdown-menu text-right">
                      <SocialComponent :item="data" :curl="url" heading="مشاركة عبر:"/>
                    </div>
                  </div>
                  <PrintAndReportComponent elementId="printMe"/>
                </div>
              </div>
            </div>
          </div>

          <div class="bookViewContent" id="bookViewContent">
            <div class="box-post box-post-sm">

              <div class="mb-3 text-center box bg-dark p-3">
                <div class="embed-responsive embed-responsive-16by9 mb-3">
                  <iframe class="embed-responsive-item" :src="data ? data.file_name : ''" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div class="text-center mb-3">
                  <IconSocialComponent :title="data.title" :url="url"/>
                </div>
              </div>
              <div id="printMe">
                <div style="margin-bottom: 30px; text-align: right;" v-html=" data ? data.summary : ''" id="inner--contents"></div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <section class="pt-4 pb-4 box">
        <div class="sec-container">

          <div class="text-center mb-30 center-title ">
            <h1 class="strong5 mb-3 MainText pt-2">{{ $t('watch_also') }}</h1>
            <p class="strong6">{{ $t('watch_also_intro') }}</p>
          </div>

          <div class="slider-sec slider-sec-top VideoSlider">
            <ul class="swiper-wrapper">
              <VideoSliderComponent v-for="video in relatedVideos" :key="video.id" :video="video"/>
            </ul>
            <div class="swiper-button-next VideoSlider-next"></div>
            <div class="swiper-button-prev VideoSlider-prev"></div>
          </div>

          <div class="text-center mt-30">
            <nLink :to="localePath('/videos')" class="btn-solid btn-big btn-round ">
              {{ $t('view_all_videos') }}<i class="ico-arrow-left"></i>
            </nLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import VideoSliderComponent from '~/components/video_components/VideoSliderComponent'
  import BreadCrumbComponent from "@/components/BreadCrumbComponent";
  import SocialComponent from "@/components/SocialComponent";
  import PrintAndReportComponent from "@/components/PrintAndReportComponent";
  import IconSocialComponent from "@/components/IconSocialComponent";
  import ContentSettingComponent from "@/components/ContentSettingComponent";
  import {mapGetters} from 'vuex';
  import {stripTags} from '../../utility/Utility';

  export default {
    components: {IconSocialComponent, PrintAndReportComponent, SocialComponent, VideoSliderComponent,BreadCrumbComponent, ContentSettingComponent},

    data() {
      return {
        data: {},
        relatedVideos: [],
        bgColor: 'white'
      }
    },

    async asyncData({app, params, store}) {
      let result = undefined;
      if (store.state.videos && store.state.videos.data && store.state.videos.data.length > 0)
        result = store.state.videos.data.find(f => f.id == params.id);

      if (result)
        return {data: result, relatedVideos: store.state.videos.data.filter(f => f.id != result.id)};
      else {
        try {
          let {data} = await app.$axios.get(`/video-id?id=${params.id}`);
          return {data: data.data, relatedVideos: data.relatedVideos};
        } catch (error) {
          console.log('Could not fetch single card, in detail page.', error);
        }//..... end of try-catch() .....//
      }//..... end if-else() .....//
    },

    mounted() {
      var swiper = new Swiper('.VideoSlider', {
        slidesPerView: '3',
//        freeMode: true,
        //lazy: true,
        pagination: {
          el: '.VideoSlider-pagination',
          clickable: true
        },

        spaceBetween: 10,

        breakpoints: {
          1200: {
            slidesPerView: 3
          },
          767: {
            slidesPerView: 2.1
          },
          576: {
            slidesPerView: 1.1
          }
        },
        navigation: {
          nextEl: '.VideoSlider-next',
          prevEl: '.VideoSlider-prev',
        },

      });

      this.$store.dispatch('recordPageView', {type: 'video', id: this.$route.params.id});
    },

    computed: {
      ...mapGetters(['getSiteDirection', 'getBreadcrumbs']),
      url() {
        return process.client ? window.location.href : "";
      },
      getTitleForPage() {
        return this.$t('menu.videos') + " - " +this.data.title;
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
