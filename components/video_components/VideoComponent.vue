<template>
  <!--section for the video page-->
  <li v-if="showDescription">
    <div class="mainProduct thumbnail-item">
      <a v-if="video.is_youtube" class="thumb-head" data-fancybox="" :href="video.file_name">
        <div class="thumb-over thumb-over-inners">
          <div class="thumb-over-center-mid">
            <div class="thumb-over-center-mid-inner">
              <div class="thumb thumb-lg thumb-round thumb-dark DarkBg">
                <i class="ico-control-play"></i>
              </div>
            </div>
          </div>
        </div> <!-- Thumb Over inner -->
        <div class="">
          <img :src="imagePlaceHolder" :alt="video.title">
        </div>
      </a><!--thumb-head-->
      <video v-else width="100%" height="230" controls>
        <source :src="video.file_name" :type="`video/${fileExtension}`">
      </video>
      <div class="thumb-body">
        <div class="thumb-body-inner">
<!--          <div class="LightBg MainText label-text d-inline-block mb-2">22:45</div>-->
          <h2 class="h4 mb-2 TwoLines strong5" :title="video.title">
            <nuxt-link :to="localePath(`/videos/${video.id}`)">{{ video.title }}</nuxt-link>
          </h2>
          <p class="LightText TwoLines" :title="video.summary">{{ video.short_summary}}</p>
          <div class="d-inline-block">
            <IconSocialComponent :title="video.title" :url="url"/>
          </div>
        </div>
      </div>
    </div>
  </li>
  <!--section for home page-->
  <div v-else class="col-lg-4 col-md-6 mb-4">
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
          <IconSocialComponent :title="video.title" :url="url"/>
        </div>

        <div class="thumb-over-corner-br p-2">
          <span class="badge badge-pill badge-light">12:54</span>
          <h3 class="h4 strong6 mt-3 text_white">{{ video.title }}</h3>
        </div>

      </div> <!-- Thumb Over inner -->

      <div class="">
        <img src="/uploads/thumb-1.jpeg" alt="">
      </div>

    </div><!--thumb-head-->
  </div>
</template>

<script>
  import placeHolderImage  from '~/assets/images/placeholder.jpg';
  import IconSocialComponent from "@/components/IconSocialComponent";

  export default {
    name: "VideoComponent",
    components: {IconSocialComponent},
    props: {
      video: {
        type: Object,
        default: () => {}
      },
      showDescription: {
        type: Boolean,
        default: false
      }
    },
    computed:{
      imagePlaceHolder(){
        return this.video.image ? this.video.image : placeHolderImage
      },
      fileExtension() {
        if (this.video.is_youtube === 0) {
          let file_path = this.video.file_name.split('.')
          return file_path[file_path.length - 1]
        }
      },
      url() {
        return process.client ? window.location.href + '/' + this.video.id : "";
      },
    }
  }
</script>
