<template>
  <div class="tab-pane fade active show" id="Search-Videos">
    <div class="sec-title spaceLR-main mb-3">
      <div class="secTitleL">
        <h1 class="h3">
          <a href="javascript: void(0)" class="showBookCats thumb thumb-xs thumb-round">
            <i class="ico-menu-alt"></i>
          </a>
          <span class="strong6">{{ $t('video_search_result') }}</span>
          <img src="/assets/img/loader.gif" v-if="isSearching" :alt="$t('searching')" style="margin: 6px 34px;">
        </h1>
      </div>
    </div>

    <ul id="MainListing" class="listItems thumbnail-items thumbnail-items-cols thumbnail-items-3cols">
      <VideoComponent v-for="video in getSearchResult" :key="video.id" :video="video"/>

      <li v-if="!isSearching && getSearchResult.length == 0" class="mb-3" style="max-width: 100%;">
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
import VideoComponent from "@/components/video_components/VideoComponent";
import PaginationComponent from "@/components/PaginationComponent";

export default {
  name: "VideoContents",
  components: {PaginationComponent, VideoComponent},
  computed: {
    ...mapGetters(['getSearchResult', 'getSearchMeta', 'getSearchStr', 'isSearching']),
  },

  mounted() {
    this.loadData(1);
  },

  methods: {
    loadData(page) {
      this.$store.dispatch('performSearch', {keyword: this.getSearchStr, pageNo: page, type: 'video'});
    }
  }
}
</script>
