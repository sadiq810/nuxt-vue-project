<template>
  <div id="MainContent" class=" player-atBottom">

    <div class="audio-player custom-player">
      <div id="mainPlayer" class="thePlayer">{{ $t('audio_player_loaded') }}</div>
    </div>

    <div class="MainContent-Container">
      <section class="">
        <div class="MainBanner banner" style="background-image: url('/uploads/bg-1.jpg');">
          <div class="slide-details">
            <img src="/uploads/hero-logo.svg">
            <article class="mt-30">
              <p>{{ $t('main_page_intro') }}</p>
            </article>
            <div class="social-btn ">
              <ul class="socials socials-xs socials-round  ">
                <li><span>{{ $t('sheikh_accounts') }}</span></li>
                <li v-for="social in getSettings.social" :key="social.id">
                    <a :href="social.link" :class="social.title" target="_blank">
                    <svg v-if="social.s_class === 'telegram'" width="40px" height="40px" viewBox="0 0 512 446" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Fill-1">
                          <path d="M165.323,234.3428 L395.89,92.3358 C400.034,89.7918 404.298,95.3948 400.739,98.6958 L210.454,275.5738 C203.765,281.7998 199.451,290.1318 198.229,299.1758 L191.747,347.2118 C190.889,353.6248 181.879,354.2618 180.11,348.0548 L155.18,260.4598 C152.325,250.4688 156.486,239.7968 165.323,234.3428 M9.043,213.7498 L127.018,257.7818 L172.682,404.6358 C175.604,414.0408 187.105,417.5178 194.739,411.2768 L260.5,357.6668 C267.393,352.0498 277.212,351.7698 284.416,356.9988 L403.026,443.1128 C411.192,449.0478 422.761,444.5728 424.809,434.7048 L511.698,16.7588 C513.933,5.9788 503.342,-3.0132 493.078,0.9558 L8.905,187.7358 C-3.043,192.3428 -2.939,209.2598 9.043,213.7498"></path>
                        </g>
                      </g>
                    </svg>
                    <i v-else :class="social.s_class"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!--Books Section-->
      <section class="pt-70 pb-70 lighter-bg pattern-4">
        <div class="sec-container">
          <div class="text-center mb-30 center-title">
            <h1 class="strong5 mb-3 AltText pt-2">{{ $t('sheikh_letter_books') }}</h1>
            <p class="strong6">{{ $t('sheikh_letter_books_intro') }}</p>
          </div>
          <client-only>
            <div class="slider-sec-top slider-sec booksSlider">
              <ul class="swiper-wrapper listItems thumbnail-items">
                <BookComponent v-for="book in getDashboardData.books" :key="book.id" :book="book"/>
              </ul>
              <div class="swiper-button-next booksSlider-swiper-button-next "></div>
              <div class="swiper-button-prev booksSlider-swiper-button-prev"></div>
            </div>
          </client-only>
          <div class="text-center mt-30">
            <nLink :to="localePath('/books')" class="btn-solid btn-big btn-round btn-light">
              {{ $t('view_all_books') }}
              <i class="ico-arrow-left"></i>
            </nLink>
          </div>
        </div>
      </section>
      <!--Fatawa section-->
      <section class="pt-70 pb-70 LightBg pattern-1">
        <div class="sec-container">

          <div class="text-center mb-30 center-title">
            <h1 class="strong5 mb-3 AltText pt-2">{{ $t('sheikh_fatawas') }}</h1>
            <p class="strong6">{{ $t('sheikh_fatawas_intro') }}</p>
          </div>

          <div class="slider-sec-top slider-sec FatawaSlider">
            <ul class="swiper-wrapper listItems thumbnail-items">
              <FatawaComponent v-for="fatawa in getDashboardData.fatawa" :key="fatawa.id" :fatawa="fatawa"/>
            </ul>
            <!-- Add Arrows -->
            <div class="swiper-button-next FatawaSlider-next"></div>
            <div class="swiper-button-prev FatawaSlider-prev"></div>
          </div>

          <div class="text-center mt-30">
            <a href="#" class="btn-solid btn-big btn-round btn-white">
              {{ $t('view_all_sheikh_fatawas') }}
              <i class="ico-arrow-left"></i></a>
          </div>

        </div>
      </section>
      <!--videos section-->
      <section class="MainSec MainBg pattern-2 ">
        <div class="sec-container">
          <div class="text-center mb-30 center-title text_white">
            <h1 class="strong5 mb-3 text_white pt-2">{{ $t('videos_library') }}</h1>
            <p class="strong6">{{ $t('video_lib_intro') }}</p>
          </div>

          <div class="row tight-row ">
            <Videos v-for="video in getDashboardData.videos" :key="video.id" :video="video"/>
          </div>

          <div class="text-center mt-30">
            <NLink :to="localePath('/videos')" class="btn-solid btn-big btn-round btn-white">
              {{ $t('view_all_videos') }} <i class="ico-arrow-left"></i>
            </NLink>
          </div>
        </div>
      </section>
      <section class="">
        <div class="DarkBg sec-half-img sec-half-img-r d-flex align-items-center pattern-2" style="min-height: 500px">
          <div class="sec-container">
            <div class="side-img" style="background-image: url('/uploads/thumb-1.jpeg')">
            </div>
            <div class="side-text WText">
              <h1 class="mb-4">{{ $t('sheikh_messages') }}</h1>
              <p class="LighterText big-text mb-4">
                {{ $t('sheikh_messages_intro') }}
              </p>
              <nLink :to="localePath('/abstracts')" class="btn-solid btn-big btn-round btn-white"> {{ $t('read_more')}}
                <i class="ico-arrow-left"></i>
              </nLink>
            </div>
          </div>
        </div>
      </section>
      <!--cards section-->
      <section class="MainSec LightBg" style="background-image: url('/uploads/bg-3.jpg')">
        <div class="sec-container">
          <div class="text-center mb-30 center-title ">
            <h1 class="strong5 mb-3 AltText pt-2">{{ $t('ibn_mehmood_cards') }}</h1>
            <p class="strong6">{{ $t('ibn_mehmood_cards_intro') }}</p>
          </div>
          <div class="slider-sec slider-sec-top cardsSlider">
            <ul class="swiper-wrapper">
              <GallerySliderComponent v-for="card in getDashboardData.gallery" :key="card.id" :card="card"/>
            </ul>
            <div class="cardsSlider-pagination swiper-pagination"></div>
            <div class="swiper-button-next cardsSlider-next"></div>
            <div class="swiper-button-prev cardsSlider-prev"></div>
          </div>

          <div class="text-center mt-30">
            <nuxt-link :to="localePath('/cards')" class="btn-solid btn-big btn-round btn-white"> {{ $t('view_all_cards') }}
              <i class="ico-arrow-left"></i>
            </nuxt-link>
          </div>
        </div>
      </section>
      <!--audio section-->
      <section class="MainSec LightBg" style="background-image: url('/uploads/bg-2.jpg')">
        <div class="container">
          <div class="text-center mb-30 center-title ">
            <h1 class="strong5 mb-3 AltText pt-2">{{ $t('audio_library') }}</h1>
            <p class="strong6">{{ $t('audio_library_intro') }}</p>
          </div>

          <div class="box box-playlist-home">
            <div class="sound-list">
              <div class="sound-list-content">
                <ul class="playlist-list list list-items list-items-sm row">
                  <Audios v-for="(audio,index) in getDashboardData.audios" :key="index" :audio="audio" @playThis="playThis(index,audio.id)" :activeindex="activeindex"/>
                </ul>
              </div>
            </div>
          </div>

          <div class="text-center mt-30">
            <nuxt-link :to="localePath('/sounds')" class="btn-solid btn-big btn-round btn-white">
              {{ $t('view_library') }} <i class="ico-arrow-left"></i>
            </nuxt-link>
          </div>

        </div>
      </section>

      <section class="MainSec TwitterBg ">
        <div class="sec-container">

          <div class="text-center mb-30 center-title ">
            <h1 class="strong5 mb-3 pt-2">{{ $t('latest_tweets') }}</h1>
            <p class="strong6">{{ $t('tweet_intro') }}</p>
          </div>

          <div class="row">
            <div class="col-md-6 offset-md-3">
              <div class="box box-borderd" style="height: 100%">
                <a class="twitter-timeline" data-lang="ar" data-height="400" href="https://twitter.com/Ibn_Mahmoud?ref_src=twsrc%5Etfw">تغريدات @Ibn_Mahmoud</a>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
              </div>
            </div>
          </div>

          <div class="text-center mt-30">
            <a href="https://twitter.com/Ibn_Mahmoud?ref_src=twsrc%5Etfw" target="_blank" class="btn-solid btn-big btn-round btn-white"> {{ $t('view_tweets_on_twitter') }} <i class="ico-arrow-left"></i></a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import BookComponent from "~/components/book_components/BookComponent";
  import FatawaComponent from "@/components/fatawa_component/FatawaComponent";
  import GallerySliderComponent from "~/components/gallery_components/GallerySliderComponent";
  import Videos from "~/components/video_components/VideoComponent";
  import Audios from "~/components/audio_components/AudioComponent";

  export default {
    components: {FatawaComponent, BookComponent, GallerySliderComponent, Videos, Audios},

    data() {
      return {
        activeindex: undefined
      }
    },

    async fetch({store}) {
      if (store.state.dashboard.books.length === 0)
        await store.dispatch('getBooksForDashboard');
    },

    async mounted() {
      await this.$store.dispatch('getOtherContentsForDashboard');

      var swiper = new Swiper('.booksSlider', {
        slidesPerView: '5',
        freeMode: true,
        //lazy: true,
        spaceBetween: 15,

        breakpoints: {

          1200: {
            slidesPerView: 3
          },
          767: {
            slidesPerView: 2
          },
          576: {
            slidesPerView: 1.1
          }
        },
        navigation: {
          nextEl: '.booksSlider-swiper-button-next',
          prevEl: '.booksSlider-swiper-button-prev',
        },

      });
      var swiper = new Swiper('.FatawaSlider', {
        slidesPerView: '3',
//        freeMode: true,
        //lazy: true,
        spaceBetween: 15,

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
          nextEl: '.FatawaSlider-next',
          prevEl: '.FatawaSlider-prev',
        },

      });
      var swiper = new Swiper('.VideosSlider', {
        slidesPerView: '4',
//        freeMode: true,
        //lazy: true,
        spaceBetween: 15,

        breakpoints: {
          1200: {
            slidesPerView: 4
          },
          767: {
            slidesPerView: 3.1
          },
          576: {
            slidesPerView: 1.1
          }
        },
        navigation: {
          nextEl: '.VideosSlider-next',
          prevEl: '.VideosSlider-prev',
        },

      });
      var swiper = new Swiper('.cardsSlider', {
        slidesPerView: '5',
//        freeMode: true,
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
      var swiper = new Swiper('.messagesSlider', {
        slidesPerView: '3',
//        freeMode: true,
        //lazy: true,
        spaceBetween: 15,

        breakpoints: {
          1200: {
            slidesPerView: 2
          },
          767: {
            slidesPerView: 1.1
          },
          576: {
            slidesPerView: 1.1
          }
        },
        navigation: {
          nextEl: '.messagesSlider-next',
          prevEl: '.messagesSlider-prev',
        },

      });

      $("body").on('click', '.fancy--box, .download--btn, .card--view-btn', function(event) {
        event.stopPropagation();
        if (! ($(event.currentTarget).hasClass('download--btn') || $(event.currentTarget).hasClass('card--view-btn')))
          $(this).nextAll('.fancybox__trigger:first').trigger('click');
      });

      $('[data-fancybox="GallImages"]').fancybox();

      var playlist = [];
      this.$store.state.dashboard.audios.map(function (value, key) {
        playlist.push({
          sources: [
            {
              file: value.file_name
            }
          ],
          title: value.title,
          duration: '00:02:10',
          slug: value.title,
        });
      });
      var mainPlayerInstance = jwplayer("mainPlayer");
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
    },

    computed: {
      ...mapGetters(['getDashboardData','getSettings', 'getSiteDirection', 'getBreadcrumbs']),
    },

    jsonld() {
      return this.getBreadcrumbs;
    },

    head() {
      const i18nSeo = this.$nuxtI18nHead({ addSeoAttributes: true });
      let title = this.$t('meta.title');
      let keywords = this.$t('meta.keywords');
      let description = this.$t('meta.description');
      let url = "https://ibn-mahmoud.com";

      return {
        title: this.$t('menu.home')+ " - " +title,
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
