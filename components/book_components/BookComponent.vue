<template>
  <li class="swiper-slide">
    <div class="mainProduct thumbnail-item">

      <nLink class="thumb-head text-center" :to="localePath(`/books/${book.id}`)">
        <div class="book-thumb mt-4">
          <div class="book-cover">
            <img :src="book.image" :alt="book.title">
          </div>
        </div>
      </nLink>

      <div class="thumb-body">
        <div class="thumb-body-inner">
          <nLink :to="localePath(`/books/${book.id}`)">
            <h2 class="TwoLines h3 strong5 mt-2 AltText" :title="book.title" style="min-height: 48px;">{{ book.short_title }}</h2>
            <p :title="book.summary" class="TwoLines" style="min-height: 48px;">{{  book.short_summary }}</p>
          </nLink>
          <ul class="icons-boxs mt-3">
            <li>
              <img src="/uploads/icons/open-book.svg" />
              <span>{{ book.views }}</span>
            </li>
            <li>
              <img src="/uploads/icons/pdf-file.svg" />
              <span>{{ book.pdf_downloads_count }}</span>
            </li>
            <li>
              <img src="/uploads/icons/ms-word.svg" />
              <span>{{ book.doc_downloads_count }}</span>
            </li>
            <li>
              <img src="/uploads/icons/bok-file.svg" />
              <span>{{ book.bok_downloads_count }}</span>
            </li>
          </ul>

          <div class="thumbnail-item-actions mt-3">
            <nLink :to="localePath(`/books/${book.id}`)" class="btn-solid btn-round text_white strong5 ml-1">{{ $t('view_book') }}</nLink>
            <span class="">
              <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class=" thumb thumb-sm thumb-round lighter-bg ml-1 WithTooltip dropdown-toggle" :title="$t('share')">
                <i class="ico-share"></i>
              </a>
              <div class="dropdown-menu ">
                <SocialComponent :item="book" :heading="$t('share')"/>
              </div>
            </span>
            <a @click="showModal(book)" :title="$t('download_book')" class="thumb thumb-sm thumb-round lighter-bg ml-1 WithTooltip" >
              <i class="ico-download"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import SocialComponent from "@/components/SocialComponent";
export default {
  name: "BookComponent",
  components: {SocialComponent},
  props:{ book: Object },

  methods: {
    showModal(book) {
      this.$store.commit('SET_BOOK_FOR_MODAL', book);
      $("#DownloadModal").modal('show');
    }
  }
}
</script>
