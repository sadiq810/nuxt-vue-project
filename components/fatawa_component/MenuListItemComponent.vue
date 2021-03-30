<template>
  <li :class="{current: fatawa.id == selectedIndex.id, active: (fatawa.id == selectedIndex.parent || fatawa.id == selectedIndex.id)}">
    <div class="ml-item">
      <i class="ico-file ml-item-ico" v-if="fatawa.childs && fatawa.childs.length == 0"></i>
      <span v-else class="mlItem-expand" @click="$emit('onToggle', $event)"><i class="ico-plus"></i></span>
      <a href="javascript: void(0)" v-if="fatawa.childs && fatawa.childs.length > 0">{{ $stripTags(fatawa.title) }}</a>
      <a href="javascript: void(0)" v-else @click="setIndex(fatawa)">{{ $stripTags(fatawa.title) }}</a>
    </div>
    <ul v-if="fatawa.childs && fatawa.childs.length > 0" :style="{display: (fatawa.id == selectedIndex.parent) ? 'block':''}">
      <li v-for="child in fatawa.childs" :key="child.id" :class="{current: child.id == selectedIndex.id, active: child.id == selectedIndex.parent}">
        <div class="ml-item">
          <i class="ico-file ml-item-ico"></i>
          <a href="javascript: void(0)" @click="setIndex(child)">{{ $stripTags(child.title) }}</a>
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: "MenuListItemComponent",
  props: {fatawa: Object, selectedIndex: Object},
  methods: {
    setIndex(index) {
      this.$emit('selectIndex', index);
    }
  }
}
</script>
