<template>
  <footer id="PcFooter" class="DarkBg WText">
    <div class="MainBg pt-3 pb-3">
      <div class="sec-container">
        <div class="d-flex d-block-sm d-flex-sides align-items-center">
          <div class="pt-2 pb-2">
            <h1 class="strong5 mb-3 pt-2">{{ $t('app_store_title') }}</h1>
            <p class="strong6">{{ $t('app_store_sentence') }}</p>
          </div>
          <div class="pt-2 pb-2">
            <a :href="footerData.footerdescription.app_store_url" class="p-1 d-inline-block" target="_blank">
              <img src="/uploads/App_Store.svg" alt="Ios app store" height="45">
            </a>
            <a :href="footerData.footerdescription.play_store_url"  class="p-1 d-inline-block" target="_blank">
              <img src="/uploads/play_Store.svg" alt="Google play store" height="45">
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5 pb-5">
      <div class="text-center">
        <ul class="nav nav-md MainNav foot-menu">
          <li :class="[currentPath == '/' ? 'nav-item active' : 'nav-item']">
            <nuxt-link :to="localePath('/')"> {{ $t('menu.home') }} </nuxt-link>
          </li>
          <li :class="[currentPath.includes('/biography') ? 'nav-item active' : 'nav-item']">
            <nuxt-link :to="localePath('/biography')"> {{ $t('menu.sheikh_biography') }} </nuxt-link>
          </li>
          <li :class="[currentPath.includes('/cards') ? 'nav-item active' : 'nav-item']">
            <nuxt-link :to="localePath('/cards')">{{ $t('menu.cards') }}</nuxt-link>
          </li>
          <li :class="[currentPath.includes('/books') ? 'nav-item active' : 'nav-item']">
            <nuxt-link :to="localePath('/books')">  {{ $t('menu.books') }} </nuxt-link>
          </li>
          <li :class="[currentPath.includes('/fatawa')  ? 'nav-item active' : 'nav-item']">
            <nuxt-link :to="localePath('/fatawa')">{{ $t('menu.fatawa') }}</nuxt-link>
          </li>
          <li :class="[currentPath.includes('/posts') ? 'nav-item active' : 'nav-item']">
            <nuxt-link :to="localePath('/posts')"> {{ $t('menu.posts') }} </nuxt-link>
          </li>
          <li :class="[(currentPath.includes('/videos') || currentPath.includes('/sounds')) ? 'nav-item active dropdown MenuHover' : 'nav-item dropdown MenuHover']">
            <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown"> {{ $t('menu.media') }} </a>
            <div class="dropdown-menu ">
              <ul class="links-lists p-main">
                <li><nuxt-link :to="localePath('/sounds')">{{ $t('menu.sounds') }}</nuxt-link></li>
                <li><nuxt-link :to="localePath('/videos')">{{ $t('menu.videos') }}</nuxt-link></li>
                <li><nuxt-link :to="localePath('/mini-clip')">{{ $t('menu.mini_clips') }}</nuxt-link></li>
                <li><nuxt-link :to="localePath('/mini-videos')">{{ $t('menu.mini_videos') }}</nuxt-link></li>
              </ul>
            </div>
          </li>
          <li :class="[currentPath.includes('/contact-us')  ? 'nav-item active' : 'nav-item']">
            <nuxt-link :to="localePath('/contact-us')">  {{ $t('menu.contact_us') }} </nuxt-link>
          </li>
        </ul>

        <div class="footer-text">
          <div class="mb-4">
            <img src="/uploads/foot-logo.svg" alt="" width="320">
          </div>
          <p class="mb-4 LighterText" v-html="footerData.footerdescription.footer_description"/>
        </div>

        <ul class="socials socials-md socials-colors">
          <li v-for="social in footerData.social" :key="social.id">
            <a :href="social.title == 'email'? 'mailto:'+social.link : social.link" :class="social.title" target="_blank">
              <svg v-if="social.s_class === 'telegram'" width="40px" height="40px" viewBox="0 0 512 446" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Fill-1">
                    <path
                      d="M165.323,234.3428 L395.89,92.3358 C400.034,89.7918 404.298,95.3948 400.739,98.6958 L210.454,275.5738 C203.765,281.7998 199.451,290.1318 198.229,299.1758 L191.747,347.2118 C190.889,353.6248 181.879,354.2618 180.11,348.0548 L155.18,260.4598 C152.325,250.4688 156.486,239.7968 165.323,234.3428 M9.043,213.7498 L127.018,257.7818 L172.682,404.6358 C175.604,414.0408 187.105,417.5178 194.739,411.2768 L260.5,357.6668 C267.393,352.0498 277.212,351.7698 284.416,356.9988 L403.026,443.1128 C411.192,449.0478 422.761,444.5728 424.809,434.7048 L511.698,16.7588 C513.933,5.9788 503.342,-3.0132 493.078,0.9558 L8.905,187.7358 C-3.043,192.3428 -2.939,209.2598 9.043,213.7498"></path>
                  </g>
                </g>
              </svg>
              <i v-else :class="social.s_class"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom pb-50">
      <div class="sec-container mob-padding">
        <div class="text-center pb-4 pt-4">
          <div class="">
            <p class="small text-uppercase">
              <span>{{ $t('footer_copy_right') }}</span>
              <nuxt-link  v-for="page in footerData.pages" :key="page.id" :to="`/pages/${page.slug}`"  class="link mr-2 ml-2 LighterText">
                {{ page.title }}
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  props: {
    footerData: {
      type: Object,
      default: {}
    }
  },
  computed: {
    currentPath() {
      return this.$route.path;
    }
  }
}
</script>

<style scoped>
.socials li {
  padding: 0 2px 0 2px;
}
</style>
