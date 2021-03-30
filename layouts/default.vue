<template>
  <div id="MainWrapper">
    <HeaderComponent />
    <MobileNavigationComponent />
    <Nuxt />
    <FooterComponent :footerData="getSettings"/>
    <SearchModal />
    <DownloadModal />
  </div>
</template>
<script>
  import SearchModal from "../components/modals/SearchModal";
  import DownloadModal from "../components/modals/DownloadModal";
  import FooterComponent from "../components/FooterComponent";
  import HeaderComponent from "../components/HeaderComponent";
  import MobileNavigationComponent from "../components/MobileNavigationComponent";
  import 'vue-toast-notification/dist/theme-default.css';
  import {mapGetters} from "vuex";

  export default {
    components: {MobileNavigationComponent, HeaderComponent, FooterComponent, DownloadModal, SearchModal},

    head() {
      return {
        bodyAttrs: {
          class: 'ios PCVer',
          id: 'body'
        },
        htmlAttrs: {
          lang: 'ar',
          dir: 'rtl'
        }
      }
    },
    computed:{
      ...mapGetters(['getSettings']),
    },
    mounted() {
      this.$store.dispatch('fetchSetting');
      $('body').not('.drp--trigger').on('click', function () {
        let el = $('.drp--menu');
        if (el.hasClass('show'))
          el.removeClass('show');
      });
    }
  }
</script>
