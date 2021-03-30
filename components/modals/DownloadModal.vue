<template>
  <div class="modal fade" tabindex="-1" role="dialog" id="DownloadModal">
    <div class="modal-dialog" role="document">
      <div class="box modal-content">
        <div class="mainProduct thumbnail-item">
          <div class="thumb-head text-center">
            <div class="book-thumb mt-4">
              <div class="book-cover">
                <img :src="getBookForModal.image" :alt="getBookForModal.title">
              </div>
            </div>
          </div>

          <div class="p-3">
            <div class="thumb-body-inner">

              <h2 class="TwoLines h3 strong5 mt-2 AltText">{{ getBookForModal.title }}</h2>
              <p>{{ getBookForModal.short_summary }}</p>

              <ul class="icons-boxs mt-3">

                <li v-if="getBookForModal.pdf_file">
                  <a :href="getBookForModal.pdf_file" :download="getBookForModal.pdf_file" target="_blank" @click="$store.dispatch('bookDownloaded', {id: getBookForModal.id, type: 'pdf'})">
                    <img src="/uploads/icons/pdf-file.svg">
                    <span>{{ $t('download_pdf') }}</span>
                  </a>
                </li>
                <li v-if="getBookForModal.doc_file">
                  <a :href="getBookForModal.doc_file" :download="getBookForModal.doc_file" target="_blank" @click="$store.dispatch('bookDownloaded', {id: getBookForModal.id, type: 'doc'})">
                    <img src="/uploads/icons/ms-word.svg">
                    <span>{{ $t('download_doc') }}</span>
                  </a>
                </li>
                <li v-if="getBookForModal.bok_file">
                  <a :href="getBookForModal.bok_file" :download="getBookForModal.bok_file" target="_blank" @click="$store.dispatch('bookDownloaded', {id: getBookForModal.id, type: 'bok'})">
                    <img src="/uploads/icons/bok-file.svg">
                    <span>{{ $t("download_bok") }}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="mt-3">
              <div class="row tight-row">
                <div class="col-8">
                  <button class="btn-solid btn-block  strong6" @click="browseBook"> {{ $t("browse_book") }} <i class="ico-download"></i> </button>
                </div>
                <div class="col-4">
                  <button data-dismiss="modal" class="btn-solid btn-lighter btn-block">{{ $t('cancellation') }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fly-buttons">
          <a data-dismiss="modal" href="#" class="thumb thumb-xxs thumb-round thumb-dark dark30"><i class="ico-close"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "DownloadModal",
  computed: {
      ...mapGetters(['getBookForModal'])
  },

  methods: {
    browseBook() {
      $("#DownloadModal").modal('hide');
      this.$router.push(this.localePath('/books/'+this.getBookForModal.id))
    }
  }
}
</script>
