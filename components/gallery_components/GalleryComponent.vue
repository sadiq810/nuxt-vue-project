<template>
  <li class="">
    <div class="thumb-head">
      <div class="thumb-over thumb-over-inners thumb-over-hover thumb-over-hover-in fancy--box">
        <div class="thumb-over-center-top">
          <div class="thumb-over-center-top-inner">
            <h4 class="mt-2 text-white">{{ card.title}}</h4>
          </div>
        </div>

        <div class="thumb-over-center-mid">
          <div class="thumb-over-center-mid-inner">
            <nLink class="thumb thumb-md thumb-round thumb-dark MainBg card--view-btn" :to="localePath(`/cards/${card.slug}`)">
              <i class="ico-search2"></i>
            </nLink>

            <a class="thumb thumb-md thumb-round WBg download--btn" :href="card.file_name" :download="card.file_name ? card.file_name.split('/').pop() : ''" target="_blank">
              <i class="ico-download"></i>
            </a>
          </div>
        </div>

        <div class="thumb-over-center-bottom">
          <div class="thumb-over-center-top-inner">
            <IconSocialComponent :title="card.title" :url="url"/>
          </div>
        </div>
      </div> <!-- Thumb Over inner -->
      <div :href="`${card.file_name}`" data-fancybox="GallImages" class="fancybox__trigger"></div>
      <div class="">
        <img :src="card.file_name" :alt="card.title">
      </div>
    </div>
  </li>
</template>

<script>

import IconSocialComponent from "@/components/IconSocialComponent";

export default {
  name: "GalleryComponent",
  components: {IconSocialComponent},
  props:{ card: Object },

  mounted() {
    $("body").on('click', '.fancy--box, .download--btn, .card--view-btn', function(event) {
      event.stopPropagation();
      if (! ($(event.currentTarget).hasClass('download--btn') || $(event.currentTarget).hasClass('card--view-btn')))
        $(this).nextAll('.fancybox__trigger:first').trigger('click');
    });

    $('[data-fancybox="GallImages"]').fancybox();
  },

  computed: {
    url() {
      return process.client ? window.location.href+"/"+this.card.id : "";
    },
  }
}
</script>
