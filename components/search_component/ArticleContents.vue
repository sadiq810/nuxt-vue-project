<template>
  <div class="tab-pane fade  show active">
    <div class="sec-title spaceLR-main mb-4">
      <div class="secTitleL">
        <h1 class="h3">
          <a href="javascript: void(0)" class="showBookCats thumb thumb-xs thumb-round">
            <i class="ico-menu-alt"></i>
          </a>
          <span class="strong6">{{ $t('post_search_result') }}</span>
          <img src="/assets/img/loader.gif" v-if="isSearching" :alt="$t('searching')" style="margin: 6px 34px;">
        </h1>

      </div>
    </div>

    <ul class="fatawa-list">
      <li v-for="item in getSearchResult" :key="item._id">
        <nuxt-link :to="localePath({name: 'posts-id', params: {id: item.id}, query: {term: getSearchStr}})" class="side-thumbnail-item mb-4 box box-inner">
          <div class="thumb-head" style="min-width: 200px">
            <div class="thumbnail-img thumb-h4">
              <img :src="item.image_name ? item.image_name : '/uploads/thumb-1.jpeg'" :alt="item.title">
            </div>
          </div>

          <div class="thumb-body">
            <div class="thumb-body-inner">
              <h2 class="strong6 MainText mb-3" v-html="item.title"></h2>
              <div class="LightText" v-html="item.short_content"></div>
            </div>
          </div>
        </nuxt-link>
      </li>

      <li v-if="!isSearching && getSearchResult.length == 0" class="mb-3">
        <div class="box box-inner-big">
          <h2 class="h3 text-danger">{{ $t('no_records') }}</h2>
        </div>
      </li>
    </ul>

    <PaginationComponent :searchMeta="getSearchMeta" @onPageChange="loadData"/>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import PaginationComponent from "@/components/PaginationComponent";

export default {
  name: "ArticleContents",
  components: {PaginationComponent},
  computed: {
    ...mapGetters(['getSearchResult', 'getSearchMeta', 'getSearchStr', 'isSearching']),
  },

  mounted() {
    this.loadData(1);
  },

  methods: {
    loadData(page) {
      this.$store.dispatch('performSearch', {keyword: this.getSearchStr, pageNo: page, type: 'article'});
    }
  }
}
</script>
