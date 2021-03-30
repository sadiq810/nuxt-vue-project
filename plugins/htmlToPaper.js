import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';
const options = {
  styles: [
    '/assets/css/custom.css' // <- inject here
  ]
}
Vue.use(VueHtmlToPaper, options);
