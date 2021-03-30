<template>
  <div class="modal fade modal-full-sm modal-side-md modal-fixed-foot" id="AdvancedSearch" >
    <div class="modal-dialog" role="document">
      <div class="modal-content LighterBg">
        <div class="HeaderTop WBg">
          <div class="d-flex">
            <div class="MobHeader-title">
              <span class="MobHeader-link"> {{ $t('advance_search') }}</span>
            </div>
            <div class="MobHeader-RSide d-flex ">
              <div class="MobHeader-ico">
                <a class=" MobHeader-link " data-dismiss="modal"><i class="ico-arrow-left headerIcosizeFix"></i></a>
              </div>
            </div>
          </div>
        </div>

        <form>
          <div class="modal-content-center" style="margin-top: 55px; margin-bottom: 95px;">
            <div class=" box-inner mb-3" style="position:relative;">
              <input class=" form-control input-lg" :placeholder="$t('what_are_you_looking_for')" v-model="search" style="padding-left: 37px;">
              <span class="input-icon" id="close--icon" v-if="search" @click="search=''" style="left: 2rem !important; top: 35px; position:absolute;"><i class="ico-close"></i></span>
            </div>

            <div class="box box-full box-inner mb-3">
              <h4 class="searchBox-head">{{ $t('search_options') }}</h4>
              <div class="box-content">
                <div class="form-check">
                  <input class="form-check-input custom__radio" type="radio" name="search_option"  id="searchExact" value="exact" v-model="searchType">
                  <label class="form-check-label radio__label strong6 h3" for="searchExact">
                    {{ $t('exact_phrase') }}
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input custom__radio" type="radio" name="search_option"  id="searchToGather" value="together" v-model="searchType">
                  <label class="form-check-label radio__label strong6 h3" for="searchToGather">
                    {{ $t("words_together") }}
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input custom__radio" type="radio" name="search_option"  id="searchWithoutOrder" value="withoutOrder" v-model=searchType>
                  <label class="form-check-label radio__label strong6 h3" for="searchWithoutOrder">
                    {{ $t('words_without_order') }}
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input custom__radio" type="radio" name="search_option"  id="searchAny" value="any" v-model="searchType">
                  <label class="form-check-label radio__label strong6 h3" for="searchAny">
                    {{ $t('any_words') }}
                  </label>
                </div>
              </div>
            </div>

            <div class="box box-full box-inner mb-3">
              <h4 class="searchBox-head">{{ $t('field_research') }}</h4>
              <div class="box-content">
                <div class="checkbox" @click="setFilter('article')">
                  <input type="checkbox" name="search-range-input3" class="css-checkbox" value="article" v-model="getAdvanceSearchFilter"/>
                  <label class="css-label h3 mb-0 strong6"> {{  $t('articles') }} </label>
                </div>
                <div class="checkbox" @click="setFilter('fatawa')">
                  <input type="checkbox" name="search-range-input4" class="css-checkbox" value="fatawa" v-model="getAdvanceSearchFilter"/>
                  <label class="css-label h3 mb-0 strong6">{{ $t('fatawas') }}</label>
                </div>
                <div class="checkbox" @click="setFilter('audio')">
                  <input type="checkbox" name="search-range-input5" class="css-checkbox" value="audio" v-model="getAdvanceSearchFilter"/>
                  <label class="css-label h3 mb-0 strong6">{{ $t('audios') }}</label>
                </div>
                <div class="checkbox" @click="setFilter('video')">
                  <input type="checkbox" name="search-range-input5" class="css-checkbox" value="video" v-model="getAdvanceSearchFilter"/>
                  <label class="css-label h3 mb-0 strong6">{{ $t('videos') }}</label>
                </div>

                <div class="checkbox" @click="setFilter('book')">
                  <input type="checkbox" name="search-range-input2" class="css-checkbox SearchInBooks" value="book" v-model="getAdvanceSearchFilter"/>
                  <label class="css-label h3 mb-0 strong6">{{ $t('books') }}</label>
                </div>

                <div class="box-content SearchInBooks-wrap pr-3" v-if="getAdvanceSearchFilter.includes('book')">
                  <div class="checkbox" v-for="book in getBookList" :key="book.id" @click="setBook(book.id)">
                    <input type="checkbox" name="mwsoaa-input1" class="css-checkbox" :value="book.id" v-model="getAdvanceSearchBooks"/>
                    <label class="css-label">{{ book.title }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class=" modal-footer">
            <div class="tabbar-Inner">
              <button class="btn-solid btn-green btn-big btn-block" @click="performSearch">{{ $t('search') }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "SearchModal",
  computed: {
    ...mapGetters(['getBookList', 'getAdvanceSearchFilter', 'getAdvanceSearchBooks', 'getSearchStr', 'getSelectedTab', 'getSearchType']),

    search: {
      set: function(str) {
        let s = str.trim();
        this.$store.commit('SET_SEARCH_KEYWORD', s);
      },
      get: function() {
        return this.getSearchStr;
      }
    },

    searchType: {
      set: function(type) {
        this.$store.commit('SET_SEARCH_TYPE', type);
      },
      get: function() {
        return this.getSearchType;
      }
    }
  },

  mounted() {
    if (this.getBookList.length == 0) {
      this.$store.dispatch('fetchAllBooks')
    }
  },

  methods: {
    setBook(id) {
      this.$store.commit('SET_ADVANCE_SEARCH_BOOK', id);
    },

    setFilter(item) {
      this.$store.commit('SET_ADVANCE_SEARCH_FILTER', item);
    },

    performSearch() {
      $('#AdvancedSearch').modal('hide');

      if ( !this.$route.path.includes('search'))
        this.$router.push({path: '/search', query: {search: this.getSearchStr}});
      else
        this.$router.push({path: this.$route.path, query: {search: this.getSearchStr}})

      this.$store.dispatch('performSearch', {keyword: this.getSearchStr, type: this.getSelectedTab});
    }
  }
}
</script>
