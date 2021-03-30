<template>
  <div class="dropdown inline-block">
    <a href="#" class="thumb thumb-xs thumb-round dropdown-toggle WithTooltip" :title="$t('download_book')" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i class="ico-download"></i>
    </a>

    <div class="dropdown-menu text-right">
      <ul>
        <li v-if="book && book.doc_file">
          <a class="dropdown-item strong6 item-done" :href="book.doc_file" :download="book.doc_file" target="_blank" @click="$store.dispatch('bookDownloaded', {id: book.id, type: 'doc'})">
            <span class="thumb thumb-xs thumb-round thumb-dark bg-blue ml-2"><i class="ico-file-word"></i></span>
            {{ $t('doc_ms_word') }}
          </a>
        </li>
        <li v-if="book && book.pdf_file">
          <a class="dropdown-item strong6" :href="book.pdf_file" :download="book.pdf_file" target="_blank" @click="$store.dispatch('bookDownloaded', {id: book.id, type: 'pdf'})">
            <span class="thumb thumb-xs thumb-round thumb-dark bg-red ml-2"><i class="ico-pdf"></i></span>
            {{ $t('pdf_adobe') }}
          </a>
        </li>
        <li v-if="book && book.bok_file">
          <a class="dropdown-item strong6" :href="book.bok_file" :download="book.bok_file" target="_blank" @click="$store.dispatch('bookDownloaded', {id: book.id, type: 'bok'})">
            <span class="thumb thumb-xs thumb-round thumb-dark bg-aqua ml-2"><i class="ico-book"></i></span>
            {{ $t('bok_file') }}
          </a>
        </li>
        <li v-if="book && book.ris_file">
          <a class="dropdown-item strong6" :href="book.ris_file" :download="book.ris_file" target="_blank">
            <span class="thumb thumb-xs thumb-round thumb-dark bg-aqua ml-2"><i class="ico-file"></i></span>
            {{ $t('ris_file') }}
          </a>
        </li>
        <li v-if="book && book.bib_file">
          <a class="dropdown-item strong6" :href="book.bib_file" :download="book.bib_file" target="_blank" @click="$store.dispatch('bookDownloaded', {id: book.id, type: 'bib'})">
            <span class="thumb thumb-xs thumb-round thumb-dark bg-aqua ml-2"><i class="ico-file"></i></span>
            {{ $t('bib_file') }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownloadComponent",
  props: {book: Object | undefined}
}
</script>
