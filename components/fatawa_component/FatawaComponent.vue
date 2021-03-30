<template>
  <li class="swiper-slide">
    <div class="box box-inner-big" style="max-height: 240px; min-height: 240px;">
      <nuxt-link class="thumbnail-item thumbnail-item-full" :to="localePath(`/fatawa/${fatawa.id}`)">
        <div v-html="fatawa.short_content" style="max-height: 175px; overflow: hidden;"></div>
        <span class="MainText">{{  $t('show_more') }}</span>
      </nuxt-link>
    </div>
  </li>
</template>

<script>
export default {
  name: "FatawaComponent",
  props: {fatawa: Object}
}
</script>
