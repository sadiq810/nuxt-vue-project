<template>
  <div class="secTitleR d-flex">
    <!--<a class="btn-solid btn-light FilterTrigger ml-3">
      <span>
        <i class="ico-menu"></i> {{ $t('classifications') }}
      </span>
    </a>-->
    <div class="dropdown dropdown-MobBottom">
      <a class="dropdown-toggle btn-solid btn-light" data-toggle="dropdown">
        <i class="ico-sort sm-text"></i>
      </a>
      <div class="dropdown-menu list-items ">
        <div class="">
          <h5 class="space-main mt-2">{{ $t('sort_by') }}</h5>
          <form>
            <div class="checkbox">
              <input class="css-radio" type="radio" name="SortByForm" id="SortBy_New"  value="1" v-model="sort">
              <label for="SortBy_New" class="css-radioLabel">{{  $t('most_recent') }}</label>
            </div>
            <div class="checkbox">
              <input class="css-radio" type="radio" name="SortByForm" id="SortBy_Discount"  value="2" v-model="sort">
              <label for="SortBy_Discount" class="css-radioLabel">{{ $t('most_watched') }}</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortComponent",
  props: {value: String},
  computed: {
  sort: {
    set: function(val) {
      this.$emit('sortChange', val);
    },
    get: function() {
      return this.value;
    }
  }
  }
}
</script>
