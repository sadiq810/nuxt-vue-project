<template>
  <div id="MainContent" :class="'book-'+bgColor +' book-content book-content-view'">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="data ? data.title : ''" :innerPage="$t('cards')" :heading="$t('sheikh_cards')" innerSlug="cards"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <article class="bookPage mb-4">
          <div class="bookViewHead postViewHead">
            <div class="bookViewHead-inner">
              <div class="d-flex justify-content-between">
                <div class="bookViewHead-block ">
                  <div class="head-title p-2" style="width: 100%">
                    <h2 class="MainText strong6 mb-2">{{ data.title }}</h2>
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
            <div class="box-post box-post-sm">
              <div class="mb-3 text-center box lighter-bg p-3">
                <div id="printMe">
                  <img :src="data ? data.file_name : ''">
                </div>

                <div class="text-center mt-3 d-flex d-flex-sides">
                  <IconSocialComponent :title="data.title" :url="url"/>
                  <a :href="data ? data.file_name : ''" class="btn-solid btn-round" :download="data ? data.file_name.split('/').pop() : ''">
                    <span class="sm-none">{{ $t('download_card') }}</span>
                    <i class="ico-download"></i></a>
                </div>
              </div>
              <p style="margin-bottom: 30px; text-align: justify" v-html="data ? data.description : ''" id="inner--contents"></p>
            </div>
          </div>
        </article>
      </div>

      <section v-if="checkGallery" class="pt-4 pb-4 box">
        <div class="sec-container">
          <div class="text-center mb-30 center-title ">
            <h1 class="strong5 mb-3 MainText pt-2">{{ $t('ibn_mehmood_cards') }}</h1>
            <p class="strong6">{{ $t('ibn_mehmood_cards_intro') }}</p>
          </div>

          <div class="slider-sec slider-sec-top cardsSlider">
            <ul class="swiper-wrapper">
              <GallerySliderComponent v-for="card in getCards.data" :key="card.id" :card="card"/>
            </ul>

            <div class="cardsSlider-pagination swiper-pagination"></div>
            <div class="swiper-button-next cardsSlider-next"></div>
            <div class="swiper-button-prev cardsSlider-prev"></div>
          </div>

          <div class="text-center mt-30">
            <nuxt-link :to="localePath('/cards')" class="btn-solid btn-big btn-round">
              {{ $t('view_all_cards') }} <i class="ico-arrow-left"></i>
            </nuxt-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import GallerySliderComponent from "~/components/gallery_components/GallerySliderComponent";
  import BreadCrumbComponent from "@/components/BreadCrumbComponent";
  import SocialComponent from "@/components/SocialComponent";
  import PrintComponent from "@/components/PrintComponent";
  import PrintAndReportComponent from "@/components/PrintAndReportComponent";
  import IconSocialComponent from "@/components/IconSocialComponent";
  import ContentSettingComponent from "@/components/ContentSettingComponent";
  import {stripTags} from "../../utility/Utility";

  export default {
    components: {IconSocialComponent, PrintAndReportComponent, PrintComponent, SocialComponent, BreadCrumbComponent, GallerySliderComponent, ContentSettingComponent},
    async asyncData({app, params, store}) {
      let result = undefined;
      if (store.state.gallery && store.state.gallery.data && store.state.gallery.data.length > 0)
        result = store.state.gallery.data.find(f => f.slug == params.id);

        if (result)
          return {data: result};
      else {
        try {
          let {data} = await app.$axios.get(`/gallery-slug?slug=${params.id}`);
          return {data: data};
        } catch (error) {
          console.log('Could not fetch single card, in detail page.', error);
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
      ...mapGetters(['getCards', 'getSiteDirection', 'getBreadcrumbs']),

      // check the length of gallery array
      checkGallery() {
        return !!(this.$store.state.gallery && this.$store.state.gallery.data && this.$store.state.gallery.data.length > 0);
      },

      url() {
        return process.client ? window.location.href : "";
      },

      getTitleForPage() {
        return this.$t('menu.cards') + " - " +this.data.title;
      },

      getDescriptionForSeo() {
        let des = this.data.description;
        if (des) {
          des = stripTags(des);
          return des.substr(0, 160);
        }

        return this.getTitleForPage;
      }
    },

    mounted() {
      this.$store.dispatch('recordPageView', {type: 'card', id: this.data.id});

      var swiper = new Swiper('.cardsSlider', {
        slidesPerView: '5',
        //freeMode: true,
        //lazy: true,
        pagination: {
          el: '.cardsSlider-pagination',
          clickable: true
        },
        spaceBetween: 10,
        breakpoints: {
          1200: {
            slidesPerView: 4
          },
          767: {
            slidesPerView: 3.1
          },
          576: {
            slidesPerView: 2.1
          }
        },
        navigation: {
          nextEl: '.cardsSlider-next',
          prevEl: '.cardsSlider-prev',
        },

      });

      $('[data-fancybox="GallImages"]').fancybox({
        buttons: ["zoom", "share", "fullScreen", "download", "thumbs", "close"],
        protect: true,
        thumbs: {
          autoStart: true,
          hideOnClose: true,
        }
      });

      $("[data-fancybox]").fancybox();
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
      let url = "https://ibn-mahmoud.com/cards/"+this.$route.params.id;

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
