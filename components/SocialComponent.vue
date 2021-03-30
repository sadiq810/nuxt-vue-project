<template>
  <ul>
    <client-only>
      <li class="">
        <h6 class="strong main-color p-3">{{ heading }}</h6>
      </li>
      <li>
        <FacebookComponent :title="customTitle" :url="url"/>
      </li>
      <li>
        <TwitterComponent :title="customTitle" :url="url"/>
      </li>
      <li>
        <TelegramComponent :title="customTitle" :url="url"/>
      </li>
      <li>
        <WhatsappComponent :title="customTitle" :url="url"/>
      </li>
      <li>
        <EmailComponent :title="customTitle" :url="url"/>
      </li>
    </client-only>
  </ul>
</template>

<script>
import FacebookComponent from "@/components/social_component/FacebookComponent";
import TwitterComponent from "@/components/social_component/TwitterComponent";
import TelegramComponent from "@/components/social_component/TelegramComponent";
import WhatsappComponent from "@/components/social_component/WhatsappComponent";
import EmailComponent from "@/components/social_component/EmailComponent";
export default {
  name: "SocialComponent",
  components: {EmailComponent, WhatsappComponent, TelegramComponent, TwitterComponent, FacebookComponent},
  props: {item: Object, heading: String, curl: String},
  computed: {
    url() {
      return this.curl ? this.curl : (process.client ? window.location.origin + '/books/'+ this.item.id : "");
    },

    customTitle() {
      return this.item ? this.$stripTags(this.item.title) : '';
    }
  }
}
</script>
