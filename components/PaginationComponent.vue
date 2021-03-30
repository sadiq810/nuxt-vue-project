<template>
  <nav class="text-center mt-3 mb-4">
    <client-only>
      <pagination :data="$buildLaravelPagination(searchMeta)" class="pagination-main" @pagination-change-page="pageChange" show-disabled :limit="3">
        <span slot="prev-nav">{{ $t('previous') }}</span>
        <span slot="next-nav">{{ $t('next') }}</span>
      </pagination>
    </client-only>
  </nav>
</template>

<script>
export default {
  name: "PaginationComponent",
  props:{searchMeta: {type: Array | Object, default: []}},
  methods: {
    pageChange(page) {
      this.$emit('onPageChange', page);
    }
  }
}
</script>
