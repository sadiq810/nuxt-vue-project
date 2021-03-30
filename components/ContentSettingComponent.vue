<template>
  <div class="content-setting">
    <a v-if="bookThumb" href="#" class="showBookCats thumb thumb-xs thumb-round">
      <i class="ico-menu-alt"></i>
    </a>
    <a href="javascript:;" class="fullscreen-book thumb thumb-xs thumb-round" @click="toggleBookView()">
      <i class="ico-fullscreen"></i>
    </a>
    <div class="dropdown inline-block">
      <a href="#" class="thumb thumb-xs thumb-round dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="ico-smallcap"></i>
      </a>
      <div class="dropdown-menu bookfont-dropdown-menu dropdown-menu-full">
        <div class="p-3 text-center book-font-sizes">
          <a href="javascript:;" class="thumb thumb-xs thumb-round thumb-borderd increaseFont" @click="increaseFont()">
            <i class="ico-plus"></i>
          </a>
          <span style="line-height: 38px; padding: 0 10px; ">{{ $t('font_size') }}</span>
          <a href="javascript:;" class="thumb thumb-xs thumb-round thumb-borderd decreaseFont" @click="decreaseFont()">
            <i class="ico-minus"></i>
          </a>
        </div>
        <div class="book-fonts">
          <div class="checkbox">
            <input class="css-radio book-font-type" type="radio" name="gridRadios" id="fontDubai" value="naskh" v-model="font" checked>
            <label for="fontDubai" class="css-radioLabel">{{ $t('naskh') }}</label>
          </div>
          <div class="checkbox">
            <input class="css-radio book-font-type" type="radio" name="gridRadios" id="fontHelvetica" v-model="font" value="dubai">
            <label for="fontHelvetica" class="css-radioLabel">{{ $t('dubai') }}</label>
          </div>
          <div class="checkbox">
            <input class="css-radio book-font-type" type="radio" name="gridRadios" id="fontVerdana" v-model="font" value="adwa">
            <label for="fontVerdana" class="css-radioLabel">{{ $t('adwa') }}</label>
          </div>
          <div class="checkbox">
            <input class="css-radio book-font-type" type="radio" name="gridRadios" id="fontTahoma" v-model="font" value="Tahoma">
            <label for="fontTahoma" class="css-radioLabel">{{ $t('tahoma') }}</label>
          </div>
        </div>
        <div class="p-3 book-bgs text-center">
          <a href="javascript: void(0)" @click="$emit('onBgColorChange', 'white')" :class="[bgColor == 'white' ? 'active' : ''] + ' thumb thumb-sm thumb-round thumb-borderd'" style="background: #fff"></a>
          <a href="javascript: void(0)" @click="$emit('onBgColorChange', 'light')" :class="[bgColor == 'light' ? 'active' : ''] + ' thumb thumb-sm thumb-round thumb-borderd'" style="background: #f9f4ea"></a>
          <a href="javascript: void(0)" @click="$emit('onBgColorChange', 'dark')" :class="[bgColor == 'dark' ? 'active' : ''] + ' thumb thumb-sm thumb-round thumb-borderd'" style="background: #444444"></a>
          <a href="javascript: void(0)" @click="$emit('onBgColorChange', 'darker')" :class="[bgColor == 'darker' ? 'active' : ''] + ' thumb thumb-sm thumb-round thumb-borderd'" style="background: #222222"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentSettingComponent",
  props: {
    bgColor: String,
    bookThumb: {
      type: Boolean,
      default: false
    },
    applyOnClass: { type: Boolean, default: false}
  },

  data() {
    return {
      font: '',
      bookView: false,
      increaseCount:0
    }
  },

  mounted() {
    this.font = 'naskh';
  },

  watch: {
    font(val) {
    /*  if (this.applyOnClass) {
        let ele = document.getElementsByClassName("bookViewContent");
        ele.forEach(e => e.style.fontFamily = val)
        //return .style.fontFamily = val;
      } else {
        let ele = document.getElementById("bookViewContent");
        if (ele)
          return ele.style.fontFamily = val;
      }*/

      $(".bookViewContent, .bookViewContent *, bookViewContent-inner").css('font-family', val);
    },

    bookView(val) {
      return val ? document.getElementById("body").classList.add("bookView") : document.getElementById("body").classList.remove("bookView");
    }
  },

  methods: {
    toggleBookView() {
      this.bookView = !this.bookView
    },
    increaseFont(){
      if(this.increaseCount === 5){ return; }
        this.changeFont(5)
        this.increaseCount ++

    },
    decreaseFont(){
      if(this.increaseCount === 0){ return; }
        this.changeFont(-5)
        this.increaseCount --

    },
    changeFont(amount){
      const baseFontSize = parseInt($('.bookViewContent,.bookViewContent p,bookViewContent title1,.bookViewContent title2').css('font-size'),10);
      const baseLineHeight = parseInt($('.bookViewContent,.bookViewContent p,bookViewContent title1,.bookViewContent title2').css('line-height'), 10);
      $('.bookViewContent,.bookViewContent *,.bookViewContent title1,.bookViewContent title2').css('font-size', (baseFontSize + amount) +'px')
      $('bookViewContent,.bookViewContent *,.bookViewContent title1,.bookViewContent title2').css('line-height', (baseLineHeight + amount) +'px')
    }
  }
}
</script>

<style scoped>
.content-setting {
  display: inherit;
}
</style>
