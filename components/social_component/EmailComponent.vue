<template>
  <ShareNetwork :class="[icon ? 'email' : 'dropdown-item']" network="Email" :url="url" :title="title" :description="title">
    <i v-if="icon" class="ico-email"></i>
    <span v-else>
      <span class="thumb thumb-xs thumb-round email ml-2">
       <i class="ico-email"></i>
      </span> {{ $t('email') }}
    </span>
  </ShareNetwork>
</template>

<script>

export default {
  name: "EmailComponent",
  props: {
    title: { type: String, default: null },
    url: { type: String, default: null },
    icon: Boolean
  }
}
</script>
