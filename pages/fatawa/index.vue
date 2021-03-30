<template>
  <div id="MainContent" class=" player-atBottom">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="$t('fatawas')" :heading="$t('fatawas')"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <div class="CategoryWithFilter">
          <div class="SideBar RSideBar">
            <div class="box book-categories">
              <div class="head-title p-3">
                <div class="d-flex align-items-center mb-4">
                  <h5 class="strong6">{{ $t('fatawa_categories') }}</h5>
                  <a class="thumb thumb-xs thumb-round LightBg mr-auto FilterTrigger"><i class="ico-close"></i></a>
                </div>
                <div class="form-control-icon">
                  <span class="input-icon"><i class="ico-search2"></i></span>
                  <input type="text" class="form-control searchInDrop" id="search-inBook2" v-model="search" :placeholder="$t('search_fatawa')">
                  <span class="input-icon" id="close--icon" v-if="search" @click="search=''"><i class="ico-close"></i></span>
                </div>
              </div>
              <div class="sideBookmarks-scrollBox">
                <div class="underline-list multiLevels-menu">
                  <ul ref="menuList">
                    <client-only>
                      <MenuListItemComponent v-for="f in filterList" :key="f.id" :fatawa="f" @selectIndex="setFatawa" :selectedIndex="getSelectedFatawa ? getSelectedFatawa : {id: 0, parent: 0}" @onToggle="toggle"/>
                    </client-only>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="Category-MainContent">
            <div class="sec-title spaceLR-main mb-4">
              <div class="secTitleL">
                <h1 class="h1"><span class="strong6">{{ getSelectedFatawa.title }}</span></h1>
              </div>
              <SortComponent :value="sort" @sortChange="sortChange"/>
            </div>

            <ul class="fatawa-list" :style="{'max-height': height+'px', 'overflow-y':'auto'}">
              <li class="mb-3" v-for="f in getPaginatedFatawas.data" :key="f.id">
                <div class="box box-inner-big">
                  <nuxt-link class="thumbnail-item thumbnail-item-full" :to="localePath(`/fatawa/${f.id}`)">
                    <div v-html="getSelectedFatawa.id ? f.content: f.content_short" id="inner--contents"></div>
                  </nuxt-link>
                </div>
              </li>
              <li class="mb-3" v-if="getPaginatedFatawas.data && getPaginatedFatawas.data.length == 0">
                <div class="box box-inner-big">
                  <a href="javascript: void(0)" class="thumbnail-item thumbnail-item-full">
                    <div>{{ $t('content_not_found') }}</div>
                  </a>
                </div>
              </li>
            </ul>

            <nav class="text-center mt-3 mb-4" v-if="getSelectedFatawa.id">
              <a href="javascript: void(0)" class="previous round" :title="$t('previous')" @click="load(-1)">&#8249;</a>
              <a href="javascript: void(0)" class="next round" :title="$t('next')" @click="load(1)">&#8250;</a>
            </nav>

            <PaginationComponent :searchMeta="getPaginatedFatawas" @onPageChange="pageChanged"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import SortComponent from "@/components/SortComponent";
import PaginationComponent from "@/components/PaginationComponent";
import MenuListItemComponent from "@/components/fatawa_component/MenuListItemComponent";

  export default {
    name: "fatawa",
    components: {PaginationComponent, SortComponent, BreadCrumbComponent, MenuListItemComponent},
    async fetch({store}) {
      if (store.state.fatawa_list.length == 0) await store.dispatch('fetchAllFatawa');
    },

    data() {
      return {
        search: '',
        sort: '',
        height: 1200
      }
    },

    computed: {
      ...mapGetters(['getAllFatawaList', 'getSelectedFatawa', 'getPaginatedFatawas', 'getSiteDirection', 'getBreadcrumbs']),
      ...mapState(['flatten_fatawa_list']),

      filterList() {
        return this.search ? this.flatten_fatawa_list.filter(f => f.title.toLowerCase().includes(this.search.toLowerCase())): this.getAllFatawaList;
      }
    },

    mounted() {
      if (this.$refs.menuList) {
        let h = this.$refs.menuList.offsetHeight;
        this.height = h > 1200 ? h : 1200;
      }

      this.loadData();

      if (this.getSelectedFatawa.id != 0 && this.getSelectedFatawa.title == '') {
        let id = parseInt(this.getSelectedFatawa.id);
        let ft = this.flatten_fatawa_list.find(ft => ft.id == id);
        if (ft)
          this.$store.commit('SET_SELECTED_FATAWA', ft);
      }
    },

    beforeMount() {
      this.$store.commit('SET_FATAWAS_LIST', {data: []});
      this.$store.commit('SET_SELECTED_FATAWA', {id: this.$route.query.id ?? 0, parent: 0, title: ''});
    },

    methods: {
      toggle($event) {
        $event.currentTarget.parentNode.parentNode.classList.toggle('active')
        $( $event.currentTarget ).closest('li').children( 'ul' ).slideToggle( 'fast' );
      },

      load(step) {
        let item = (step == -1 ? [...this.flatten_fatawa_list].sort((a, b) => b.id - a.id): this.flatten_fatawa_list).find(b => step == 1 ? b.id > this.getSelectedFatawa.id : b.id < this.getSelectedFatawa.id);

        if (item)
          this.setFatawa(item);
      },

      setFatawa(fatawa) {
        this.scrollToTop();
        this.$store.commit('SET_SELECTED_FATAWA', fatawa);
        this.$router.push({path: this.$route.path, query: {id: fatawa.id}});
        this.loadData();
      },

      scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
      },

      pageChanged(page) {
        this.scrollToTop();
        this.loadData(page);
      },

      loadData(page = 1) {
        let id = this.getSelectedFatawa.id;
        let sort = this.sort ? (this.sort == 1 ? 'latest': 'views'): '';
        this.$store.dispatch('fetchFatawas', {id, page, sort});
      },

      sortChange(value) {
        this.sort = value;
        this.loadData();
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
      let url = "https://ibn-mahmoud.com/fatawa";

      return {
        title: this.$t('menu.fatawa')+ " - " +title,
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
  line-height: 1;
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
