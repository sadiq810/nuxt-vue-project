<template>
  <div id="MainContent" class=" player-atBottom">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="$t('articles_list')" :heading="$t('articles_list')"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <div class="CategoryWithFilter">

          <div class="SideBar RSideBar">
            <div class="box book-categories">
              <div class="head-title p-3">
                <div class="d-flex align-items-center mb-4">
                  <h5 class="strong6">{{ $t('article_categories') }}</h5>
                  <a class="thumb thumb-xs thumb-round LightBg mr-auto FilterTrigger"><i class="ico-close"></i></a>
                </div>
                <div class="form-control-icon">
                  <span class="input-icon"><i class="ico-search2"></i></span>
                  <input type="text" class="form-control searchInDrop" id="search-inBook2" v-model="search" :placeholder="$t('search')">
                  <span class="input-icon" id="close--icon" v-if="search" @click="search=''"><i class="ico-close"></i></span>
                </div>
              </div>

              <div class="sideBookmarks-scrollBox">
                <div class="underline-list multiLevels-menu">
                  <ul ref="menuList">
                    <li v-for="item in categoriesList" :key="item.id" :class="{current: getPostSelectedCategory && getPostSelectedCategory.id == item.id, parent: item.children.length > 0}">
                      <div class="ml-item" v-if="item.children.length == 0"> <i class="ico-file ml-item-ico"></i>
                        <a href="javascript: void(0)" @click="setCategory(item)">{{ item.name }}</a>
                      </div>

                      <div class="ml-item" v-if="item.children.length > 0">
                        <span class="mlItem-expand" @click="toggle($event)"><i class="ico-plus"></i></span>
                        <a href="javascript: void(0)" @click="setCategory(item)">{{ item.name}}</a>
                      </div>
                      <ul v-if="item.children.length > 0">
                        <li v-for="childItem in item.children" :key="childItem.id" :class="[getPostSelectedCategory && getPostSelectedCategory.id == childItem.id ? 'current': '']">
                          <div class="ml-item"><i class="ico-file ml-item-ico"></i>
                            <a href="javascript: void(0)" @click="setCategory(childItem)">{{ childItem.name }}</a>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="Category-MainContent">
            <div class="sec-title spaceLR-main mb-4">
              <div class="secTitleL">
                <h1 class="h1"><span class="strong6">{{ category ? category.name : '' }}</span></h1>
              </div>
              <SortComponent :value="sort" @sortChange="sortChange"/>
            </div>

            <ul class="fatawa-list" :style="{'max-height': height+'px', 'overflow-y':'auto'}">
              <li v-for="post in getPosts.data" :key="post.id">
                <nuxt-link :to="localePath(`/posts/${post.id}`)" class="side-thumbnail-item mb-4 box box-inner">
                  <div class="thumb-head" style="min-width: 200px">
                    <div class="thumbnail-img thumb-h4">
                      <img :src="post.image" :alt="post.title">
                    </div>
                  </div>

                  <div class="thumb-body">
                    <div class="thumb-body-inner">
                      <h2 class="strong6 MainText mb-3">{{ post.title }}</h2>
                      <p class="LightText">
                        {{ post.summary }}
                        <span class="MainText">{{ $t('show_more') }}</span>
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </li>
              <li v-if="getPosts.data && getPosts.data.length == 0">
              <a href="javascript: void(0)" class="side-thumbnail-item mb-4 box box-inner">
                <div class="thumb-body">
                  <div class="thumb-body-inner">
                    <h2 class="strong6 MainText mb-3">{{ $t('no_records') }}</h2>
                  </div>
                </div>
              </a>
              </li>
            </ul>

            <PaginationComponent :searchMeta="getPosts" @onPageChange="loadData"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import SortComponent from "@/components/SortComponent";
import PaginationComponent from "@/components/PaginationComponent";

export default {
  name: "index",
  components: {PaginationComponent, SortComponent, BreadCrumbComponent},
  async fetch({store}) {
    if (store.state.postCategories.length == 0) await store.dispatch('fetchPostCategories');
  },

  data() {
    return {
      search: '',
      sort: '',
      height: 700
    }
  },

  computed: {
    ...mapGetters(['getPostCategoriesList', 'getPostSelectedCategory', 'getPosts', 'getSiteDirection', 'getBreadcrumbs']),

    category() {
      if (this.getPostSelectedCategory)
        this.loadData(1);

      return this.getPostSelectedCategory;
    },

    categoriesList() {
      let s = this.search ? this.search.toLowerCase() : '';

      if (this.search) {
        let cs = JSON.parse(JSON.stringify(this.getPostCategoriesList));

        return cs.filter(c => {
          let children = c.children.filter(ch => ch.name.toLowerCase().includes(s));

          if (children.length > 0) {
            c.children = children;
            return true;
          }

          return c.name.toLowerCase().includes(s);
        });
      }

      return this.getPostCategoriesList;
    }
  },

  mounted() {
    if (this.getPostSelectedCategory == undefined) {
      if (this.getPostCategoriesList.length > 0) {
        let c = this.getPostCategoriesList[0];
        if (c.children.length > 0)
          c = c.children[0];

        this.setCategory(c);
      }
    }//..... end if() ....//

    if (this.$refs.menuList) {
      let h = this.$refs.menuList.offsetHeight;
      this.height = h > 700 ? h : this.height;
    }

  },

  beforeMount() {
    this.$store.commit('SET_POST_CATEGORY_SELECTED', undefined);
    this.$store.commit('SET_POSTS_LIST', {data: []});
  },

  methods: {
    scrollToTop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    },

    setCategory(item) {
      this.scrollToTop();
      this.$store.commit('SET_POST_CATEGORY_SELECTED', item);
    },

    loadData(page = 1) {
      let category_id = this.getPostSelectedCategory ? this.getPostSelectedCategory.id : 0;
      let sort = this.sort ? (this.sort == 1 ? 'latest': 'views'): '';
      this.$store.dispatch('fetchPosts', {category_id, page, sort});
    },

    toggle($event) {
      $event.currentTarget.parentNode.parentNode.classList.toggle('active')
      $( $event.currentTarget ).closest('li').children( 'ul' ).slideToggle( 'fast' );
    },

    sortChange(value) {
      this.sort = value;
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
    let url = "https://ibn-mahmoud.com/posts";

    return {
      title: this.$t('menu.posts')+ " - " +title,
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
