<template lang="pug">
  .img
    .spinner-wrapper(v-show="!isLoaded" :style="{ width: `${width}px`, height: `${height}px` }")
        b-spinner
    component(
      :is="type === 'card' ? 'b-card-img' : 'b-img'"
      v-show="isLoaded"
      :src="`${src}?size=${width}x${height}`"
      :alt="alt"
      :style="{ width: `${width}px`, height: `${height}px` }"
      bottom
      thumbnail
      @load="isLoaded = true"
    )
</template>

<script>
export default {
  name: 'ImageLoader',
  props: {
    type: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      isLoaded: false
    }
  }
}
</script>

<style scoped>

</style>
