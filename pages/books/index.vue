<template>
  <div id="MainContent" class=" player-atBottom">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="$t('books')" :heading="$t('books')"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <div class="">
          <div class="pt-2 pb-3 ">
            <div class="sec-title spaceLR-main mb-0">
              <div class="secTitleL">
                <h1 class="h3">
                  <span class="strong6">{{ $t('books') }}</span>
                </h1>
              </div>
              <OrderSortComponent :value="sort" @sortChange="sortChange"/>
            </div>
          </div>

          <ul id="MainListing" class="listItems thumbnail-items thumbnail-items-cols">
            <BookComponent v-for="book in getBooks.data" :key="book.id" :book="book"/>
          </ul>

          <client-only>
            <infinite-loading v-if="getBooks.data.length > 0" spinner="waveDots" @infinite="loadBooks" direction="bottom" style="margin-bottom: 12px; color: #918e8e;">
              <div slot="no-more">{{ $t('end') }}</div>
              <div slot="no-results">{{ $t('end') }}</div>
            </infinite-loading>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import BookComponent from "~/components/book_components/BookComponent";
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import OrderSortComponent from "@/components/OrderSortComponent";

export default {
  name: "index",
  components: {OrderSortComponent, BreadCrumbComponent, BookComponent},
  async fetch({store}) {
    await store.dispatch('fetchBooks', {page: 1});
  },

  data() {
    return {
      sort: '1',
      loaderRef: undefined,
      currentPage: undefined
    }
  },

  computed: {
    ...mapGetters(['getBooks', 'getSiteDirection', 'getBreadcrumbs']),
  },

  updated() {
    if (! this.currentPage)
      this.currentPage = this.getBooks.meta.current_page;
    else {
      if (this.currentPage != this.getBooks.meta.currentPage) {
        if (this.loaderRef)
          this.loaderRef.loaded();
        this.currentPage = this.getBooks.meta.current_page;
        if (this.getBooks.meta.to == this.getBooks.meta.total)
          if (this.loaderRef)
            this.loaderRef.complete();
        else
          if (this.loaderRef)
            this.loaderRef.loaded();
      }
    }
  },

  methods: {
    async loadBooks($state, page = undefined) {
      this.loaderRef = $state;
      if (!page)
        page = this.getBooks.meta.current_page + 1
      await this.$store.dispatch('fetchBooks', {page, sort: this.sort});
    },

    sortChange(value) {
      this.sort = value;
      this.loadBooks(undefined, 1);
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
    let url = "https://ibn-mahmoud.com/books";

    return {
      title: this.$t('menu.books')+ " - " +title,
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
