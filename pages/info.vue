<template>
  <div class="info">
    <prismic-rich-text :field="info.paragraphe"/>
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
  }
}
</script>

<style lang="scss">
.info {
  display: block;
  font-size: 14px;
  p {
    font-family: serif;
    a {
      color: #003300;
      text-decoration: none;
    }
  }
}
</style>
