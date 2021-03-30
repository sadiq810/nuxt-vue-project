<template>
  <header class="PcHeader">
    <div class="PcHeader-center ">
      <div class="sec-container">
        <nav class="d-flex align-items-center justify-content-between">
          <div class="main-brand">
            <div class="MobHeader-ico">
              <a href="#" class="mainMenuTrigger toggle MobHeader-link">
                <i class="ico-Menu"></i>
              </a>
            </div>

            <nLink :to="localePath('/')" class="main-logo" >
              <img src="/uploads/main-logo.svg" alt="" class="logo-dark">
              <img src="/uploads/main-logo.svg" alt="" class="logo-light">
            </nLink>
          </div>

         <NavigationComponent />

          <div class=" d-flex align-items-center HeadSocials">
            <ul class="socials socials-xs socials-round HideInPhone">
              <li v-for="social in getSettings.social" :key="social.id">
                <a :href="social.title == 'email'? 'mailto:'+social.link : social.link" :class="social.title" target="_blank">
                  <svg v-if="social.s_class === 'telegram'" width="40px" height="40px" viewBox="0 0 512 446" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Fill-1">
                        <path
                          d="M165.323,234.3428 L395.89,92.3358 C400.034,89.7918 404.298,95.3948 400.739,98.6958 L210.454,275.5738 C203.765,281.7998 199.451,290.1318 198.229,299.1758 L191.747,347.2118 C190.889,353.6248 181.879,354.2618 180.11,348.0548 L155.18,260.4598 C152.325,250.4688 156.486,239.7968 165.323,234.3428 M9.043,213.7498 L127.018,257.7818 L172.682,404.6358 C175.604,414.0408 187.105,417.5178 194.739,411.2768 L260.5,357.6668 C267.393,352.0498 277.212,351.7698 284.416,356.9988 L403.026,443.1128 C411.192,449.0478 422.761,444.5728 424.809,434.7048 L511.698,16.7588 C513.933,5.9788 503.342,-3.0132 493.078,0.9558 L8.905,187.7358 C-3.043,192.3428 -2.939,209.2598 9.043,213.7498"></path>
                      </g>
                    </g>
                  </svg>
                  <i v-else :class="social.s_class"></i>
                </a>
              </li>
            </ul>

            <div class="nav-item PcSearch-Toggle">
              <a href="#"><i class="ico-search2"></i></a>
            </div>

            <!--<div class="nav-item d-none">
              <a class="dropdown-toggle header-pup"><span class="strong6">English</span></a>
            </div>-->

          </div>
        </nav>
      </div>
    </div>

    <SearchComponent />
  </header>
</template>

<script>
import NavigationComponent from "./NavigationComponent";
import SearchComponent from "@/components/SearchComponent";
import {mapGetters} from "vuex";

export default {
  name: "HeaderComponent",
  components: {SearchComponent, NavigationComponent},
  computed:{
    ...mapGetters(['getSettings']),
  },
}
</script>
