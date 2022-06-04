<template>
  <div v-show="test === index" class="carousel">
    {{ test }}
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    visibleSlide: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    test () {
      return this.visibleSlide[1]
    }
  }
}
</script>
