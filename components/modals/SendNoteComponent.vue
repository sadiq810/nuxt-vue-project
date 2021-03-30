<template>
  <div>
    <div class="modal show fade in" tabindex="-1" role="dialog" id="sendNoteModal" data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog modal-lg" role="document">
        <div class="box modal-content">
          <div class="col-sm-12" style="padding: 0 !important;">
            <div class="box p-4">
              <h1 class="mb-4 MainText strong6">{{ $t('send_note') }}:</h1>
              <form class="" @submit.prevent="processForm">
                <div class="form-group">
                  <label class="control-label" for="original">{{ $t('original_text_reference') }}</label>
                  <input type="text" class="form-control" id="original" :placeholder="$t('original_text_reference')" :value="url" readonly />
                </div>
                <div class="form-group">
                  <label class="control-label" for="f-name">{{ $t('name') }} *</label>
                  <input type="text" class="form-control" id="f-name" :placeholder="$t('name')" v-model="name" required="required">
                </div>
                <div class="form-group">
                  <label class="control-label" for="f-email">{{  $t('email') }} * </label>
                  <input type="email" class="form-control" id="f-email" :placeholder="$t('email')" v-model="email" required="required">
                </div>
                <div class="form-group">
                  <label class="control-label" for="msg-title">{{ $t('message') }} *</label>
                  <input type="text" class="form-control" id="msg-title" :placeholder="$t('message')"  v-model="message" required="required">
                </div>

                <div class="form-group">
                  <label class="control-label" for="contact-message"> {{ $t('suggest_text') }} *</label>
                  <textarea id="contact-message" class="form-control" rows="4"  v-model="pmessage"></textarea>
                </div>

                <button type="submit" class="btn-solid strong6 btn-green"  :disabled="isDisabled">{{ $t('send') }}</button>
                <img src="/assets/img/loader.gif" v-if="isDisabled" :alt="$t('email_sending')" style="margin: 6px 34px;">
              </form>
            </div>
          </div>

          <div class="fly-buttons">
            <a data-dismiss="modal" href="#" class="thumb thumb-xxs thumb-round thumb-dark dark30"><i class="ico-close"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SendNoteComponent',
    data() {
      return {
        name: '',
        email: '',
        message: '',
        pmessage: '',
        isDisabled: false
      }
    },

    methods: {
      async processForm(e) {
        e.preventDefault();

        if (this.name == '' || this.email == '' || this.message == '') {
          this.$toast.open({message: "Please fill all the required fields.", type: 'error', position: 'bottom-right'});
          return false;
        }//.... end if() .....//

        this.isDisabled = true;
        let message = this.message;

        if (this.pmessage)
          message += '<br/> <h3>Proposed Text</h3><br/>'+ this.pmessage;

        message += '<br/> Original Content Reference:<br/>'+this.url+'<br/>';
        message += `<a href="${this.url}">Visit Original Content</a>`

        try {
          await this.$axios.$post(`/contact-us`, {name: this.name, email: this.email, subject: "إبلاغ عن خطأ", message: message});
          this.$toast.open({message: this.$t('report_sent'), type: 'success', position: 'bottom-left'});
          this.clearForm();
        } catch(err) {
          this.$toast.open({message: "Internal server error occurred. please try later.", type: 'error', position: 'bottom-left'});
        }//..... end of try-catch() .....//

        this.isDisabled = false;
      },

      clearForm() {
        $('#sendNoteModal').modal('hide');
        this.name = '';
        this.email = '';
        this.pmessage = '';
        this.message = '';
        this.isDisabled = false;
      }
    },

    computed: {
      url() {
        return process.client ? window.location.href : null;
      },
    }
  }
</script>
