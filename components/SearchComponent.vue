<template>
  <form id="mainSearch" class="mainSearch ">
    <div class="form-control-icon">
      <span class="input-icon"><i class="ico-search2"></i></span>
      <input id="search-pc" class="form-control-round form-control" :placeholder="$t('what_are_you_looking_for')" aria-label="Search" v-model="search">
      <span class="input-icon" id="close--icon" v-if="search" @click="search=''" style="left: 9.4rem !important;"><i class="ico-close"></i></span>
    </div>
    <a data-toggle="modal" data-target="#AdvancedSearch" class="btn-solid btn-light btn-round AdvancedSearch-btn">
      {{ $t('advance_search') }}
      <i class="ico-angle-down"></i>
    </a>
    <div class="backFromSearch">
      <a href="javascript: void(0)" class="MobHeader-link">
        <i class="ico-arrow-right"></i>
        <span>{{ $t('cancellation') }}</span>
      </a>
    </div>
  </form>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  name: "SearchComponent",
  computed: {
    ...mapGetters(['getSearchStr']),
    search: {
      get: function() {
        return this.getSearchStr;
      },

      set: function(str) {
        let s = str.trim();
        if (s.length >= 3) {
          if ( !this.$route.path.includes('search'))
            this.$router.push({path: this.localePath('/search'), query: {search: s}});
          else
            this.$router.push({path: this.$route.path, query: {search: s}})

          this.$store.dispatch('performSearch', {keyword: s});
        }//.... end if() .....//

        this.$store.commit('SET_SEARCH_KEYWORD', s);
      }
    }
  },

  mounted() {
    if (this.$route.query.search && this.$route.query.search.length > 0) {
      this.$store.commit('SET_SEARCH_KEYWORD', this.$route.query.search);
      this.$store.dispatch('performSearch', {keyword: this.$route.query.search});
    }//..... end if() .....//
  }
}
</script>
