<template>
  <div class="MainNav-Wrap">
    <ul class="nav nav-md MainNav mega-menu">

      <li :class="[currentPath == '/' ? 'nav-item active' : 'nav-item']">
        <nuxt-link :to="localePath('/')"> {{ $t('menu.home') }} </nuxt-link>
      </li>

      <li :class="[currentPath.includes('/biography') ? 'nav-item active' : 'nav-item']">
        <nuxt-link :to="localePath('/biography')"> {{ $t('menu.sheikh_biography') }} </nuxt-link>
      </li>

      <li :class="[currentPath.includes('/books') ? 'nav-item active' : 'nav-item']">
        <nuxt-link :to="localePath('/books')"> {{ $t('menu.books') }} </nuxt-link>
      </li>

      <li :class="[currentPath == '/fatawa' ? 'nav-item active' : 'nav-item']">
        <nuxt-link :to="localePath('/fatawa')">{{ $t('menu.fatawa') }}</nuxt-link>
      </li>

      <li :class="[currentPath.includes('/posts') ? 'nav-item active' : 'nav-item']">
        <nuxt-link :to="localePath('/posts')"> {{ $t('menu.posts') }} </nuxt-link>
      </li>

      <li :class="[currentPath.includes('/cards') ? 'nav-item active' : 'nav-item']">
        <nuxt-link :to="localePath('/cards')">{{ $t('menu.cards') }}</nuxt-link>
      </li>

      <li :class="[(currentPath.includes('/videos') || currentPath.includes('/sounds')) ? 'nav-item active dropdown MenuHover' : 'nav-item dropdown MenuHover']">
        <a href="javascript: void(0)" class="dropdown-toggle drp--trigger" data-toggle="dropdown"> {{ $t('menu.media') }} </a>
        <div class="dropdown-menu drp--menu">
          <ul class="links-lists p-main">
            <li><nuxt-link :to="localePath('/sounds')">{{ $t('menu.sounds') }}</nuxt-link></li>
            <li><nuxt-link :to="localePath('/mini-clip')">{{ $t('menu.mini_clips') }}</nuxt-link></li>
            <li><nuxt-link :to="localePath('/videos')">{{ $t('menu.videos') }}</nuxt-link></li>
            <li><nuxt-link :to="localePath('/mini-videos')">{{ $t('menu.mini_videos') }}</nuxt-link></li>
          </ul>
        </div>
      </li>

      <li :class="[currentPath == '/contact-us' ? 'nav-item active' : 'nav-item']">
        <nuxt-link :to="localePath('/contact-us')"> {{ $t('menu.contact_us') }} </nuxt-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: "NavigationComponent",
  computed: {
      currentPath() {
        return this.$route.path;
      }
  }
}
</script>
