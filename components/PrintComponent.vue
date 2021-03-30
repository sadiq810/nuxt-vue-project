<template>
  <a class="dropdown-item strong6 color2" href="javascript: void(0)" @click="print">
    <span class="thumb thumb-xs thumb-round thumb-dark bg-green ml-2">
      <i class="ico-printer1"></i>
    </span>
    {{ $t('print') }}
  </a>
</template>

<script>
export default {
  name: "PrintComponent",
  props: {elementId: String},
  methods: {
    print () {
      this.$htmlToPaper(this.elementId);
    }
  }
}
</script>
