<template>
  <section class="">
    <div class="MainBanner MainBanner-inner banner " style="background-image: url('/uploads/bg-1.jpg');">
      <div class="breadcrumb-wrap">

        <div class="sec-container">
          <nav aria-label="breadcrumb">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <nuxt-link :to="localePath('/')">{{ $t('menu.home') }}</nuxt-link>
              </li>
              <li class="breadcrumb-item" v-if="innerPage">
                <nuxt-link :to="localePath(innerSlug)">{{ innerPage }}</nuxt-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ title }}</li>
            </ul>
          </nav>
        </div>
      </div>
      <h1 class="strong6">{{ heading }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: "BreadCrumbComponent",
  props:{title: String, heading: String, innerPage: String, innerSlug: String}
}
</script>
