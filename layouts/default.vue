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
<style lang="scss">
$breakpoint-tablet: 768px;
@font-face {
  font-family: 'Agipo';
  font-weight: 400;
  src: url('/fonts/agipo_regular.woff') format('woff');
}
@font-face {
  font-family: 'Agipo Bold';
  font-weight: bold;
  src: url('/fonts/agipo_bold.woff') format('woff');
}
.content {
  padding: 30px 0 0 0;
}
html {
  font-family: 'Agipo';
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
  @media (max-width: $breakpoint-tablet) {
    padding: 30px 0 0 0;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
