<template>
  <div id="MainContent" class=" player-atBottom">
    <div class="MainContent-Container">

      <BreadCrumbComponent :title="$t('contact_us')" :heading="$t('connect_us')"/>

      <div class="sec-container InnerPage-Box" style="margin-top: -60px;">
        <div class="row">
          <div class="col-sm-8">
            <div class="box p-4 mb-5">
              <h1 class="mb-4 MainText strong6">{{ $t('email_us') }}:</h1>
              <form class="" @submit.prevent="processForm">
                <div class="form-group">
                  <label class="control-label" for="f-name">{{ $t("name") }} *</label>
                  <input type="text" class="form-control" id="f-name" :placeholder="$t('name')" v-model="name" required="required">
                </div>
                <div class="form-group">
                  <label class="control-label" for="f-email">{{ $t('email') }} * </label>
                  <input type="email" class="form-control" id="f-email" :placeholder="$t('email')" v-model="email" required="required">
                </div>
                <div class="form-group">
                  <label class="control-label" for="msg-title">{{ $t("subject") }} *</label>
                  <input type="text" class="form-control" id="msg-title" :placeholder='$t("subject")'  v-model="subject" required="required">
                </div>

                <div class="form-group">
                  <label class="control-label" for="contact-message"> {{ $t('message') }} *</label>
                  <textarea id="contact-message" class="form-control" rows="4"  v-model="message"></textarea>
                </div>

                <button type="submit" class="btn-solid strong6 btn-green"  :disabled="isDisabled">{{ $t('send') }}</button>
                <img src="/assets/img/loader.gif" v-if="isDisabled" :alt="$t('email_sending')" style="margin: 6px 34px;">
              </form>
            </div>
          </div>

          <div class="col-sm-4">
            <div class="box mb-3">
              <h1 class="p-3 h3 border-bottom MainText strong6">{{ $t('who_we') }}:</h1>
              <div class="box-inner">
                <p>{{ $t('who_we_intro') }}</p>
              </div>
            </div>
            <div class="box mb-5">
              <h1 class="p-3 h3 border-bottom MainText strong6">{{ $t('contact_us_on') }} </h1>
              <ul>
                <li v-for="social in getSettings.social" :key="social.id">
                  <a :href="social.title == 'email'? 'mailto:'+social.link : social.link" class="dropdown-item" target="_blank">
                  <span class="thumb thumb-xs thumb-round  facebook ml-2">
                     <svg v-if="social.s_class === 'telegram'" width="40px" height="40px" viewBox="0 0 512 446" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Fill-1">
                          <path d="M165.323,234.3428 L395.89,92.3358 C400.034,89.7918 404.298,95.3948 400.739,98.6958 L210.454,275.5738 C203.765,281.7998 199.451,290.1318 198.229,299.1758 L191.747,347.2118 C190.889,353.6248 181.879,354.2618 180.11,348.0548 L155.18,260.4598 C152.325,250.4688 156.486,239.7968 165.323,234.3428 M9.043,213.7498 L127.018,257.7818 L172.682,404.6358 C175.604,414.0408 187.105,417.5178 194.739,411.2768 L260.5,357.6668 C267.393,352.0498 277.212,351.7698 284.416,356.9988 L403.026,443.1128 C411.192,449.0478 422.761,444.5728 424.809,434.7048 L511.698,16.7588 C513.933,5.9788 503.342,-3.0132 493.078,0.9558 L8.905,187.7358 C-3.043,192.3428 -2.939,209.2598 9.043,213.7498"></path>
                        </g>
                      </g>
                    </svg>
                    <i v-else :class="social.s_class"></i>
                  </span>
                  {{ social.title == 'gplus' ? $t('googlePlus') : $t(social.title) }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import BreadCrumbComponent from "@/components/BreadCrumbComponent";
    import {mapGetters} from "vuex";

    export default {
      name: "contact-us",
      components: {BreadCrumbComponent},

      data() {
        return {
          name: '',
          email: '',
          subject: '',
          message: '',
          isDisabled: false
        }
      },

      computed:{
        ...mapGetters(['getSettings', 'getSiteDirection', 'getBreadcrumbs']),
      },
      methods: {
        async processForm(e) {
          e.preventDefault();

          if (this.name == '' || this.email == '' || this.message == '') {
            this.$toast.open({message: this.$t('fill_required_fields'), type: 'error', position: 'bottom-left'});
            return false;
          }//.... end if() .....//

          this.isDisabled = true;

          try {
            await this.$axios.$post(`/contact-us`, {name: this.name, email: this.email, subject: this.subject, message: this.message});
            this.$toast.open({message: this.$t('email_sent_successfully'), type: 'success', position: 'bottom-left'});
            this.clearForm();
          } catch(err) {
            this.$toast.open({message: this.$t('internal_server_error'), type: 'error', position: 'bottom-left'});
          }//..... end of try-catch() .....//

          this.isDisabled = false;
        },

        clearForm() {
          this.name = '';
          this.email = '';
          this.subject = '';
          this.message = '';
          this.isDisabled = false;
        }
      },

      jsonld() {
        return this.getBreadcrumbs;
      },

      head() {
        const i18nSeo = this.$nuxtI18nHead({ addSeoAttributes: true });
        let title = this.$t('meta.title');
        let keywords = this.$t('meta.keywords');
        let description = this.$t('meta.description');
        let url = "https://ibn-mahmoud.com/contact-us";

        return {
          title: this.$t('menu.contact_us')+ " - " + title,
          htmlAttrs: {
            ...i18nSeo.htmlAttrs,
            dir: this.getSiteDirection
          },
          bodyAttrs: {
            class: ""
          },
          meta: [
            {name: 'keywords', content: keywords},
            {hid: 'og-title', property: 'og:title', content: '' + title + ''},
            {hid: 'og:description', content: '' + description + '', property: 'og:description'},
            {hid: 'og:site_name', property: 'og:site_name', content: '' + title + ''},
            {hid: 'meta-title', name: 'title', content: '' + title + ''},
            {hid: 'description', name: 'description', content: '' + description + ''},
            {hid: 'twitter:title', name: 'twitter:title', content: '' + title + ''},
            {hid: 'twitter:description', name: 'twitter:description', content: '' + description + '' },
            {hid: 'og:url', content: '' + url + '', property: 'og:url'},
            {hid: 'twitter:url',name: "twitter:url", content: '' + url + ''},
            ...i18nSeo.meta
          ],
          link: [
            ...i18nSeo.link
          ]
        }
      }
    }
</script>

<style scoped>
  .dropdown-item{
    text-transform: capitalize;
  }
</style>
