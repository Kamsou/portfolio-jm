<template>
  <div class="info">
    <prismic-rich-text :field="info.paragraphe" />
  </div>
</template>
<script>
export default {
  async asyncData ({ $prismic, error }) {
    try {
      const document = (await $prismic.api.getSingle('info')).data
      return {
        info: document
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head: {
    title: 'Jean Marquès'
  }
}
</script>

<style lang="scss">
$breakpoint-tablet: 768px;
.info {
  display: block;
  font-size: 14px;
  @media (max-width: $breakpoint-tablet) {
    padding: 5%;
  }
  p {
    a {
      text-decoration: none;
      color: #000;
    }
    img {
      @media (max-width: $breakpoint-tablet) {
        width: 100%;
      }
    }
  }
}
</style>
