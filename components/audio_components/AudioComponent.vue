<template>
  <li v-if="showList">
    <div class="soundtrack list-item item-multi-links" :class="{'active' : activeindex === audio.id}">
      <a href="javascript:;" class="soundtrack-title" @click="$emit('playThis')">
        <div class="list-item-head">
          <div class="thumb thumb-sm thumb-round">
            <i class="ico-volume"></i>
          </div>
        </div>
        <div class="list-item-body">
          <h3 class=" strong6 h5 TwoLines">{{ audio.title }}</h3>
          <p class="TwoLines small LightText">{{ audio.category }}</p>
        </div>
      </a>
      <div class="list-item-side">
<!--        <span class="soundtrack-duration">02:31</span>-->
        <div class="dropdown dropdown-MobBottom ml-2">
          <a class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="thumb thumb-xs"><i class="ico-more-alt"></i></div>
          </a>
          <ul class="dropdown-menu list-items">
            <li>
              <a class="dropdown-item" href="javascript: void(0)" @click="$emit('playNext', (parseInt(audio.id) + 1), audio.id)">
              <span class="thumb thumb-xs ml-1"><i class="ico-control-forward"></i></span>
              {{ $t('play_next') }}
              </a>
            </li>
           <!-- <li>
              <a class="dropdown-item" href="#">
                <span class="thumb thumb-xs ml-1"><i class="ico-list-ol"></i></span>
                {{ $t('add_to_playlist') }}
              </a>
            </li>-->
            <li>
              <a class="dropdown-item strong6 main-color" :href="audio.file_name" :download="audio.file_name" target="_blank" @click="$store.dispatch('bookDownloaded', {id: audio.id, type: 'sound'})">
                <span class="thumb thumb-xs ml-1"><i class="ico-download"></i></span>
                {{ $t('download') }}
<!--                 (35.48 MB)-->
              </a>
            </li>
            <li>
              <nuxt-link :to="localePath(`/sounds/${audio.id}`)+(term? '?term='+term:'')" class="dropdown-item strong6 main-color">
                <span class="thumb thumb-xs ml-1"><i class="ico-link"></i></span>{{ $t('read_more') }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </li>

  <li v-else class="col-md-6">
    <div class="soundtrack list-item item-multi-links" :class="{'active' : activeindex === audio.id || singlePlayIndex === audio.id}">
      <nuxt-link v-if="PlaySingle" :to="`/sounds/${audio.id}`" class="soundtrack-title">
        <div class="list-item-head">
          <div class="thumb thumb-sm thumb-round">
            <i class="ico-volume"></i>
          </div>
        </div>
        <div class="list-item-body">
          <h3 class="h4 TwoLines">{{ audio.title}}</h3>
          <ul class="list-icons">
            <li><i class="ico-eye"></i> {{ audio.views}}</li>
          </ul>
        </div>
      </nuxt-link>
      <a v-else href="javascript:;" class="soundtrack-title" @click="$emit('playThis')">
        <div class="list-item-head">
          <div class="thumb thumb-sm thumb-round">
            <i class="ico-volume"></i>
          </div>
        </div>
        <div class="list-item-body">
          <h3 class="h4 TwoLines">{{ audio.title}}</h3>
          <ul class="list-icons">
            <li style="position: relative; right: 90%;"><i class="ico-eye"></i> {{ audio.views}}</li>
          </ul>
        </div>
      </a>
    </div>
  </li>
</template>

<script>
  export default {
    name: "AudioComponent",
    props: {
      audio: {type: Object, default: () => {}},
      showList: {type: Boolean, default: false},
      PlaySingle: {type: Boolean, default: false},
      activeindex: {type: undefined,},
      singlePlayIndex: {type: undefined,},
      term: {type: String, default: undefined}
    }
  }
</script>
