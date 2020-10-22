<template>
  <div>
    <Header />
    <Nuxt class="content" />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
<style>
.content {
  padding: 30px 0 0 0;
}
html {
  font-family:
    serif,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  padding: 30px 0 0 55px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
