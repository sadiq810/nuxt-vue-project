<template>
  <nav id="main-nav" class="main-nav">
    <ul class="MainNav-Head">
      <li class="MainNav-Title">
        <h1 class="h3 text-center">
          <img src="/uploads/logo.svg" width="270" alt="">
        </h1>
      </li>
    </ul>

    <ul class="MainNav-Center">
      <li :class="[currentPath == '/' ? 'AltText strong6' : '']">
        <nuxt-link :to="localePath('/')"> {{ $t('menu.home') }} </nuxt-link>
      </li>

      <li :class="[currentPath.includes('/biography') ? 'nav-item active' : 'nav-item']">
        <nuxt-link :to="localePath('/biography')"> {{ $t('menu.sheikh_biography') }} </nuxt-link>
      </li>

      <li :class="[currentPath.includes('/books') ? 'AltText strong6' : '']">
        <nuxt-link :to="localePath('/books')">  {{ $t('menu.books') }} </nuxt-link>
      </li>

      <li :class="[currentPath == '/fatawa' ? 'AltText strong6' : '']">
        <nuxt-link :to="localePath('/fatawa')">{{ $t('menu.fatawa') }}</nuxt-link>
      </li>

      <li :class="[currentPath.includes('/posts') ? 'AltText strong6' : '']">
        <nuxt-link :to="localePath('/posts')"> {{ $t('menu.posts') }} </nuxt-link>
      </li>

      <li :class="[currentPath.includes('/cards') ? 'AltText strong6' : '']">
        <nuxt-link :to="localePath('/cards')">{{ $t('menu.cards') }}</nuxt-link>
      </li>

      <li :class="[(currentPath.includes('/videos') || currentPath.includes('/sounds')) ? 'AltText strong6' : '']">
        <span>{{ $t('menu.media') }}</span>
        <ul>
          <li><nuxt-link :to="localePath('/sounds')">{{ $t('menu.sounds') }}</nuxt-link></li>
          <li><nuxt-link :to="localePath('/mini-clip')">{{ $t('menu.mini_clips') }}</nuxt-link></li>
          <li><nuxt-link :to="localePath('/videos')">{{ $t('menu.videos') }}</nuxt-link></li>
          <li><nuxt-link :to="localePath('/mini-videos')">{{ $t('menu.mini_videos') }}</nuxt-link></li>
        </ul>
      </li>

      <li :class="[currentPath == '/contact-us' ? 'AltText strong6' : '']">
        <nuxt-link :to="localePath('/contact-us')">  {{ $t('menu.contact_us') }} </nuxt-link>
      </li>

    </ul>

    <!--<ul class="MainNav-bottom list-items list-items-xs">
      <li>
        <a class="list-item">
          <div class="list-item-head">
            <div class="thumb thumb-xs LighterBg"><i class="ico-world"></i></div>
          </div>
          <div class="list-item-body">
            <h3 class="list-item-title h5 OneLine">Language</h3>
          </div>
          <span class="list-item-side MainText"> <span>English</span></span>
        </a>
      </li>
    </ul>-->

    <ul class="MainNav-clear MainNav-inline socials socials-sm socials-round">
      <li v-for="social in getSettings.social" :key="social.id">
        <a :href="social.link" :class="social.title" target="_blank">
          <svg v-if="social.s_class === 'telegram'" width="40px" height="40px" viewBox="0 0 512 446" version="1.1"
               xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavigationComponent",
  computed: {
    ...mapGetters(['getSettings']),
    currentPath() {
      return this.$route.path;
    }
  }
}
</script>
