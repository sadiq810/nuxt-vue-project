<template>
  <div class="tab-pane fade show active">
    <div class="sec-title spaceLR-main mb-4">
      <div class="secTitleL">
        <h1 class="h3">
          <a href="javascript: void(0)" class="showBookCats thumb thumb-xs thumb-round">
            <i class="ico-menu-alt"></i>
          </a>
          <span class="strong6">{{ $t('fatawa_search_result') }}</span>
          <img src="/assets/img/loader.gif" v-if="isSearching" :alt="$t('searching')" style="margin: 6px 34px;">
        </h1>
      </div>
    </div>

    <ul class="fatawa-list">
      <li class="mb-3" v-for="item in getSearchResult" :key="item._id">
        <div class="box box-inner-big">
          <nuxt-link class="thumbnail-item thumbnail-item-full" :to="localePath({name: 'fatawa-id', params:{id: item.id}, query: {term: getSearchStr}})">
            <h2 class="strong6 MainText mb-3">{{ item.book_title }}</h2>
            <h5 class="strong6 mb-2" v-html="item.title"></h5>
            <div class="LightText" v-html="item.short_content"></div>
          </nuxt-link>
        </div>
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
  name: "FatawaContents",
  components: {PaginationComponent},
  computed: {
    ...mapGetters(['getSearchResult', 'getSearchMeta', 'getSearchStr', 'isSearching']),
  },

  mounted() {
    this.loadData(1);
  },

  methods: {
    loadData(page) {
      this.$store.dispatch('performSearch', {keyword: this.getSearchStr, pageNo: page, type: 'fatawa'});
    }
  }
}
</script>
