<template>
  <li :class="{current: book.id == selectedIndex.id, active: (book.id == selectedIndex.parent_id || book.h_one.some(hOne => hOne.id == selectedIndex.parent_id || hOne.h_two.some(hTwo => hTwo.id == selectedIndex.parent_id || hTwo.h_three.some(hThree => hThree.id == selectedIndex.parent_id))))}">
    <div class="ml-item">
      <i class="ico-file ml-item-ico" v-if="book.h_one.length == 0"></i>
      <span v-else class="mlItem-expand" @click="$emit('onToggle', $event)"><i class="ico-plus"></i></span>
      <a href="javascript: void(0)" @click="setIndex(book)">{{ $stripTags(book.title) }}</a>
    </div>
    <ul v-if="book.h_one.length > 0" :style="{display: (book.id == selectedIndex.parent_id  || book.h_one.some(hOne => hOne.id == selectedIndex.parent_id || hOne.h_two.some(hTwo => hTwo.id == selectedIndex.parent_id || hTwo.h_three.some(hThree => hThree.id == selectedIndex.parent_id)))) ? 'block':''}">
      <li v-for="hOne in book.h_one" :key="hOne.id" :class="{current: hOne.id == selectedIndex.id, active: hOne.id == selectedIndex.parent_id}">
        <div class="ml-item">
          <i class="ico-file ml-item-ico" v-if="hOne.h_two.length == 0"></i>
          <span v-else class="mlItem-expand" @click="$emit('onToggle', $event)"><i class="ico-plus"></i></span>
          <a href="javascript: void(0)" @click="setIndex(hOne)">{{ $stripTags(hOne.title) }}</a>
        </div>

        <ul v-if="hOne.h_two.length > 0"  :style="{display: (hOne.id == selectedIndex.parent_id || hOne.h_two.some(hTwo => hTwo.id == selectedIndex.parent_id || hTwo.h_three.some(hThree => hThree.id == selectedIndex.parent_id))) ? 'block':''}">
          <li v-for="hTwo in hOne.h_two" :key="hTwo.id" :class="{current: hTwo.id == selectedIndex.id}">
            <div class="ml-item">
              <i class="ico-file ml-item-ico" v-if="hTwo.h_three.length == 0"></i>
              <span v-else class="mlItem-expand" @click="$emit('onToggle', $event)"><i class="ico-plus"></i></span>
              <a href="javascript: void(0)" @click="setIndex(hTwo)">{{ $stripTags(hTwo.title) }}</a>
            </div>

            <ul v-if="hTwo.h_three.length > 0"  :style="{display: (hTwo.id == selectedIndex.parent_id || hTwo.h_three.some(hThree => hThree.id == selectedIndex.parent_id)) ? 'block':''}">
              <li v-for="hThree in hTwo.h_three" :key="hThree.id" :class="{current: hThree.id == selectedIndex.id}">
                <div class="ml-item">
                  <i class="ico-file ml-item-ico" v-if="hThree.h_four.length == 0"></i>
                  <span v-else class="mlItem-expand" @click="$emit('onToggle', $event)"><i class="ico-plus"></i></span>
                  <a href="javascript: void(0)" @click="setIndex(hThree)">{{ $stripTags(hThree.title) }}</a>
                </div>

                <ul v-if="hThree.h_four.length > 0" :style="{display: hThree.id == selectedIndex.parent_id ? 'block':''}">
                  <li v-for="hFour in hThree.h_four" :key="hFour.id" :class="{current: hFour.id == selectedIndex.id}">
                    <div class="ml-item">
                      <i class="ico-file ml-item-ico"></i>
                      <a href="javascript: void(0)" @click="setIndex(hFour)">{{ $stripTags(hFour.title) }}</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: "MenuListItemComponent",
  props: {book: Object, selectedIndex: Object},
  methods: {
    setIndex(index) {
      this.$emit('selectIndex', index);
    }
  }
}
</script>
