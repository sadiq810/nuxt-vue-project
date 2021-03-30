<template>
  <ShareNetwork :class="[icon ? 'facebook': 'dropdown-item']" network="facebook" :url="url" :title="title" :description="title" :quote="title" hashtags="ibnmehmood">
    <i v-if="icon" class="ico-facebook"></i>
    <span v-else>
      <span class="thumb thumb-xs thumb-round  facebook ml-2">
      <i class="ico-facebook"></i>
    </span> {{ $t('facebook') }}
    </span>
  </ShareNetwork>
</template>

<script>
export default {
  name: "FacebookComponent",
  props: {
    title: { type: String, default: null },
    url: { type: String, default: null },
    icon: Boolean
  }
}
</script>
