<template>
  <ShareNetwork :class="[icon ? 'twitter': 'dropdown-item']" network="Twitter" :url="url" :title="title">
    <i v-if="icon" class="ico-twitter"></i>
    <span v-else>
      <span class="thumb thumb-xs thumb-round  twitter ml-2">
      <i class="ico-twitter"></i>
    </span> {{ $t('twitter') }}
    </span>
  </ShareNetwork>
</template>

<script>
export default {
  name: "TwitterComponent",

  props: {
    title: { type: String, default: null },
    url: { type: String, default: null },
    icon: Boolean
  }
}
</script>
