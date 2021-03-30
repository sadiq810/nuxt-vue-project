<template>
  <div id="MainContent" :class="'book-'+bgColor +' book-content book-content-view'">
    <div class="MainContent-Container">
      <BreadCrumbComponent :title="book ? book.title : ''" :innerPage="$t('books')" :heading="book ? book.title : ''" innerSlug="books"/>

      <div class="sec-container BookPage-Box" style="margin-top: -60px;">
        <div class="bookCard">
          <div class="book-categories">
            <div class="head-title p-3">
              <div class="d-flex d-flex-sides">
                <h4 class="main-color strong6 mb-4">{{ $t('book_index') }}</h4>
                <a href="#" class="showBookCats thumb thumb-xs thumb-round text-center" >
                  <i class="ico-close"></i>
                </a>
              </div>
              <div class="form-control-icon">
                <span class="input-icon"><i class="ico-search2"></i></span>
                <input type="text" class="form-control searchInDrop" v-model="search" id="search-inBook2" :placeholder="$t('search')">
                <span class="input-icon" id="close--icon" v-if="search" @click="search=''"><i class="ico-close"></i></span>
              </div>
            </div>

            <div class="sideBookmarks-scrollBox">
              <div class="underline-list multiLevels-menu">
                <ul>
                  <MenuListItemComponent v-for="book in filterList" :key="book.id" :book="book" @selectIndex="setIndex" :selectedIndex="item" @onToggle="toggle"/>
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
                    <a href="javascript:;" class="fullscreen-book thumb thumb-xs thumb-round" v-if="history.length > 0" title="back" @click="goBack">
                      <i class="ico-back-left"></i>
                    </a>
                  </div>

                  <div class="bookViewHead-block bookViewHead-center">
                    <div class="head-title p-2" style="width: 100%">
                      <h1 class="h4 mb-0 OneLine" v-html="item ? item.title : ''"></h1>
                    </div>
                  </div>

                  <div class="bookViewHead-block bookViewHead-left">
                    <div class="dropdown inline-block">
                      <a href="#" class="thumb thumb-xs thumb-round dropdown-toggle WithTooltip" :title="$t('share')" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="ico-share"></i>
                      </a>
                      <div class="dropdown-menu text-right">
                        <SocialComponent :item="item" :heading="$t('share')" :curl="url"/>
                      </div>
                    </div>

                    <DownloadComponent :book="book"/>

                    <a href="javascript: void(0)" title=" reference تنزيل الكتاب" class="thumb thumb-sm thumb-round lighter-bg ml-1 WithTooltip" >
                      <img src="/uploads/copy.jpg">
                    </a>
                    <PrintAndReportComponent elementId="printMe"/>
                  </div>

                </div>
              </div>
            </div>

            <div style="max-height: 1200px; overflow-y: auto" id="book--view--container">
              <div class="bookViewContent" id="bookViewContent">
                <article class="bookViewContent-inner main--content--container" :data-id="item.id" id="printMe">
                  <div class="text-justify p-long" v-html="item ? item.content: ''" style="text-align: right;" id="inner--contents"></div>
                </article>
              </div>
              <div class="bookViewContent">
              <div  v-for="item in other">
                <hr/>
                <div class="bookViewHead" style="border-top: 1px solid #f3f3f3;">
                  <div class="bookViewHead-inner">
                    <div class="d-flex justify-content-between">
                      <div class="bookViewHead-block bookViewHead-center">
                        <div class="head-title p-2" style="width: 100%">
<!--                          <h1 class="h4 mb-0 OneLine" v-html="item ? item.title : ''"></h1>-->
                          &nbsp;
                        </div>
                      </div>
                      <div class="bookViewHead-block bookViewHead-left">
                        <div class="dropdown inline-block">
                          <a href="#" class="thumb thumb-xs thumb-round dropdown-toggle WithTooltip" :title="$t('share')" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="ico-share"></i>
                          </a>
                          <div class="dropdown-menu text-right">
                            <SocialComponent :item="item" :heading="$t('share')" :curl="populateUrl(item)"/>
                          </div>
                        </div>
<!--                        <DownloadComponent :book="book"/>-->
                      </div>
                    </div>
                  </div>
                </div>

                <div class="bookViewContent">
                  <article class="bookViewContent-inner main--content--container" :data-id="item.id">
                    <div class="text-justify p-long inner--contents" v-html="item ? item.content: ''" style="text-align: right;"></div>
                  </article>
                </div>
              </div>
              </div>

              <client-only>
                <infinite-loading v-if="indexList.length > 0" spinner="waveDots" @infinite="infiniteHandler" direction="bottom" style="margin-bottom: 12px; color: #918e8e;">
                  <div slot="no-more">{{ $t('end') }}</div>
                  <div slot="no-results">{{ $t('end') }}</div>
                </infinite-loading>
              </client-only>
            </div>

            <a class="showBookCats showBookCats-bg"></a>
          </div>

          <div id="BookFooter">
            <div class="sec-container">
              <div class="bookContent-footer">
                <div class="bookContent-footer-Side1">
                  <form class="form-inline" @submit.prevent="handleInputPageChange">
                    <label for="__BVID__82"> {{ $t('page') }} </label>
                    <input class="btn-input ml-1 mr-1 form-control" id="__BVID__82" :placeholder="$t('page_number')" type="text" v-model="goToPage">
                  </form>
                </div>
                <div class="bookContent-footer-Side2">
                  <input class="custom-range" id="__BVID__83" :max="total_pages" min="0" step="1" type="range" v-model="pageSlider">
                </div>
                <div class="bookContent-footer-Side3 d-flex-center d-flex">
                  <a class="btn-input d-inline-block WithTooltip" :title="$t('previous_page')" href="javascript: void(0)" @click="previousPage">
                    <i class="ico-angle-right"></i>
                  </a>
                  <span class="mr-2 ml-2"> {{ current_page }} / {{ total_pages }}</span>
                  <a class="btn-input d-inline-block WithTooltip" :title="$t('next_page')" href="javascript: void(0)" @click="nextPage">
                    <i class="ico-angle-left"></i>
                  </a>
                </div>
              </div>
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
import MenuListItemComponent from "@/components/book_components/MenuListItemComponent";
import SocialComponent from "@/components/SocialComponent";
import PrintAndReportComponent from "@/components/PrintAndReportComponent";
import ContentSettingComponent from "@/components/ContentSettingComponent";
import DownloadComponent from "@/components/book_components/DownloadComponent";
import {stripTags} from "../../utility/Utility";

export default {
  components: {
    DownloadComponent,
    PrintAndReportComponent, SocialComponent, MenuListItemComponent, BreadCrumbComponent, ContentSettingComponent},
  async fetch({store}) {
    if (store.state.bookList.length === 0) await store.dispatch('fetchAllBooks');
  },

  async asyncData({app, params, query}) {
    try {
      let {data: {data, max_pages, detail, other}} = await app.$axios.get('/book-index-list?book_id='+params.id+'&index='+(query.index || '')+(query.term ? '&term='+encodeURI(query.term): ''));
      return {indexList: data, total_pages: max_pages, item: detail ? detail : {}, footnotes: detail ? {...detail.footnotes} : {}, current_page: detail ? detail.page_no: 0, other};
    } catch (error) {
      console.error('Error: Error occurred while fetching index list in book detail page.', error);
    }
  },

  data() {
    return {
      search: '',
      indexList: [],
      item: {},//..... data of selected index will be loaded here.
      total_pages: 0,
      current_page: 0,
      goToPage: undefined, //.... input box of the page.
      bgColor: 'white',
      other: [],
      loaderRef: undefined,
      footnotes: {},
      lastShownFootnote: undefined,
      history: []//.... it will keep navigation history of this page.
    }
  },

  computed: {
    ...mapGetters(['getBookList', 'getSiteDirection', 'getBreadcrumbs']),

    filterList() {
      if (this.search) {
        let s = this.search.toLowerCase();
        let result = [];
        let data = JSON.parse(JSON.stringify(this.indexList));

        data.forEach((h1) => {
          if (h1.title.toLowerCase().includes(s)) {
            let {id, title} = h1;
            result.push({id, title, h_one: []});
          }//..... end if() .....//

          h1.h_one.forEach(h2 => {
            if (h2.title.toLowerCase().includes(s)) {
              let {id, title} = h2;
              result.push({id, title, h_one: []});
            }//..... end if() .....//

            h2.h_two.forEach(h3 => {
              if (h3.title.toLowerCase().includes(s)) {
                let {id, title} = h3;
                result.push({id, title, h_one: []});
              }//..... end if() .....//

              h3.h_three.forEach(h4 => {
                if (h4.title.toLowerCase().includes(s)) {
                  let {id, title} = h4;
                  result.push({id, title, h_one: []});
                }//..... end if() .....//

                h4.h_four.forEach(h5 => {
                  if (h5.title.toLowerCase().includes(s)) {
                    let {id, title} = h5;
                    result.push({id, title, h_one: []});
                  }//..... end if() .....//
                })
              })
            })

          });
        });

        return result;
      }

      return this.indexList;
    },

    book() {
      return this.getBookList.find(f => f.id == this.$route.params.id);
    },

    pageSlider: {
      set: function(no) {
        let page = parseInt(no);
        this.current_page = page;
        this.loadData(null, page);
      },
      get: function() {
        return this.current_page;
      }
    },

    url() {
      return process.client ? window.location.href : null;
    },

    getTitleForPage() {
      return this.$t('menu.books') + " - " +this.item.title;
    },

    getDescriptionForSeo() {
      let des = this.item.content;
      if (des) {
        des = stripTags(des);
        return des.substr(0, 160);
      }

      return this.getTitleForPage;
    }
  },

  methods: {
    populateUrl(item) {
      if (process.client) {
       let url = window.location.origin;
        url += window.location.pathname;
       url += '?index='+item.id+'&page='+item.page_no;
       return url;
      }

      return null;
    },

    setIndex(index) {
      $('#book--view--container').animate({ scrollTop: 0 }, "slow");
      this.item = index;
      this.current_page = index.sequence_page_no;
      this.loadData(index.id, index.page_no);
    },

    async loadData(id, page = '', saveHistory = true) {

      if (this.loaderRef)
        this.loaderRef.reset();

      try {
        if (this.history.length == 0 && saveHistory)
          this.setHistory(this.$route.query.index, this.$route.query.page);

        this.$router.push({path: this.$route.path, query: { index: id, page: page }},  ($route) => {
          if (saveHistory)
            this.setHistory($route.query.index, $route.query.page);
        });


        let {data: {data, other}} = await this.$axios.get(`/book-content-by-id?id=${id}&page=${page}&book_id=${this.$route.params.id}`);

        if (data) {
          this.item = data;
          this.current_page = page || 1;

          Object.entries(data.footnotes).forEach(([key, value]) => {
            this.initPopover(key, value);
          });
        }//..... end if() .....//

        this.other = other;
      } catch(error) {
        console.error('Error occurred while fetching content by id, in detail book page.', error);
       // this.item = {};
      }
    },

    async loadDataMore(page = 0 ,$state = null) {
      try {
        let newPage = parseInt(page) + 1;
        let {data: {data}} = await this.$axios.get(`/book-content-more?book_id=${this.$route.params.id}&page=${newPage}`);
        if (Object.keys(data).length > 0) {
          this.current_page = newPage;
          this.other = [...this.other, data];

          Object.entries(data.footnotes).forEach(([key, value]) => {
            this.initPopover(key, value);
          });
        }//.... end if() .....//

        if ($state && (Object.keys(data).length == 0 || this.total_pages == this.other.length)) {
          $state.complete();
        } else if ($state) {
          $state.loaded();
        }
      } catch(error) {
        console.error('Error occurred while fetching content by id, in detail book page.', error);
        this.other = [];
        if ($state)
          $state.complete();
      }
    },

    handleInputPageChange() {
      let page = parseInt(this.goToPage);
      this.current_page = page;
      this.loadData(null, page);
    },

    previousPage() {
      if (this.current_page > 1)
        this.loadData(null, this.current_page - 1);
    },

    nextPage() {
      if (this.current_page + 1 < this.total_pages)
        this.loadData(null, this.current_page + 1);
    },

    toggle($event) {
      $event.currentTarget.parentNode.parentNode.classList.toggle('active')
      $( $event.currentTarget ).closest('li').children( 'ul' ).slideToggle( 'fast' );
    },

    setBgColor(color) {
      this.bgColor = color;
    },

    infiniteHandler($state) {
      this.loaderRef = $state;
      this.loadDataMore(this.current_page, $state);
    },

    initPopover(footnote_no, title) {
      setTimeout(function() {
        $('span [name=noteBody'+footnote_no+']').popover({
          title: title,
          html: true,
          placement: 'right',
          trigger: 'hover click focus'
        });
      }, 1000)
    },

    setHistory(index, page) {
      this.history.push({index, page});
    },

    goBack() {
      let url = this.history.pop();

      if (url.index == this.$route.query.index)
        url = this.history.pop();

      if (url.index == undefined)
        this.$router.push({path: this.$route.path});
      else
        this.$router.push({path: this.$route.path, query: url});

      this.loadData(url.index, url.page ? url.page : 1, false)
    }
  },

  mounted() {
    let $this = this;

    $('body').on('show.bs.popover', '.footnote', function () {
      if ($this.lastShownFootnote)
        $(`span [name=${$this.lastShownFootnote}]`).popover('hide');

      $this.lastShownFootnote = $(this).attr('name');
    })

    this.$store.dispatch('recordPageView', {type: 'book', id: this.$route.params.id});

    if (this.indexList.length > 0 && Object.keys(this.item).length == 0) {
      this.item = this.indexList[0];
      this.loadData(this.indexList[0].id, 1);
    }

    $('.fullscreen-book').click(function(){
      $('body').toggleClass('bookView');
    });

    $( '.showBookCats' ).click( function( ) {
      $('.book-content').toggleClass( 'bookWithoutCats' );
    });

    Object.entries(this.footnotes).forEach(([key, value]) => {
      this.initPopover(key, value);
    });
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
