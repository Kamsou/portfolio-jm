<template>
  <div v-show="visibleSlide === index" class="carousel">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    visibleSlide: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>
