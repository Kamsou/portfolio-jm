<template>
  <div v-show="visibleSlide === index" class="carousel">
    <slot />
  </div>
</template>

<script>
export default {
  props: ['visibleSlide', 'index']
}
</script>

<style lang="scss" scoped>

</style>
