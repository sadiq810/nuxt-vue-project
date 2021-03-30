<template>
  <li class="swiper-slide">
    <div class="thumb-head thumb-head-borderd">
      <a data-fancybox="" :href="video.file_name" class="item-link-overlay"></a>
      <div class="thumb-over thumb-over-inners">
        <div class="thumb-over-center-mid">
          <div class="thumb-over-center-mid-inner">
            <div style="width: 80px; display: inline-block">
              <img src="/uploads/play-ico.svg">
            </div>
          </div>
        </div>
        <div class="thumb-over-corner-tr p-2">
          <IconSocialComponent :title="video.title" :url="localePath('/videos/'+video.id)"/>
        </div>
        <div class="thumb-over-corner-br p-2">
<!--          <span class="badge badge-pill badge-light">12:54</span>-->
          <h3 class="h4 strong6 mt-3 text_white">{{ video.title }}</h3>
        </div>
      </div> <!-- Thumb Over inner -->
      <div class="">
        <img :src="imagePlaceHolder" alt="">
      </div>
    </div><!--thumb-head-->
  </li>
</template>

<script>
  import placeHolderImage  from '~/assets/images/placeholder.jpg'
  import IconSocialComponent from "@/components/IconSocialComponent";
  export default {
    name: "VideoSliderComponent",
    components: {IconSocialComponent},
    props: {
      video: {
        type: Object,
        default: () => {}
      }
    },
    computed:{
      imagePlaceHolder(){
        return this.video.image ? this.video.image : placeHolderImage
      }
    }
  }
</script>
