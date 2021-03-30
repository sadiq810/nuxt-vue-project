<template>
  <ul class="socials socials-xs socials-round socials-colors">
    <li class="sm-none"><span class="LightText">{{ $t('share') }} : </span></li>
    <li><FacebookComponent :title="title" :url="url" icon/></li>
    <li><TwitterComponent :title="title" :url="url" icon/></li>
    <li><WhatsappComponent :title="title" :url="url" icon/></li>
    <li><TelegramComponent :title="title" :url="url" icon/></li>
    <li><EmailComponent :title="title" :url="url" icon/></li>
  </ul>
</template>

<script>
import FacebookComponent from "@/components/social_component/FacebookComponent";
import TwitterComponent from "@/components/social_component/TwitterComponent";
import WhatsappComponent from "@/components/social_component/WhatsappComponent";
import TelegramComponent from "@/components/social_component/TelegramComponent";
import EmailComponent from "@/components/social_component/EmailComponent";
export default {
name: "IconSocialComponent",
  components: {EmailComponent, TelegramComponent, WhatsappComponent, TwitterComponent, FacebookComponent},
  props: {title: String, url: String}
}
</script>
