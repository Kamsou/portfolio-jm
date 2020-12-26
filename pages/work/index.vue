<template>
  <div v-if="albums.length !== 0" class="page-album">
    <article v-for="a in albums" :key="a.id">
      <nuxt-link :to="`/work/${a.uid}`">
        <img :src="a.data.image.url" class="album-image" alt="">
        <span class="album-title">{{ a.data.title[0].text }}</span>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
export default {
  async asyncData ({ $prismic, error }) {
    try {
      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'album'),
        { orderings: '[document.first_publication_date]' }
      )
      return {
        albums: blogPosts.results
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head () {
    return {
      title: 'Jean Marquès'
    }
  }
}
</script>

<style lang="scss" scoped>
$breakpoint-tablet: 768px;
.page-album {
  display: flex;
  font-size: 0.9vw;
  @media (max-width: $breakpoint-tablet) {
    display: block;
    font-size: 3.9vw;
  }
  article {
    display: flex;
    margin-right: 80px;
    @media (max-width: $breakpoint-tablet) {
      margin-right: 0;
      width: 95%;
      padding-left: 5%;
      margin-bottom: 10%;
    }
    a {
      text-align: center;
      text-decoration: none;
      @media (max-width: $breakpoint-tablet) {
        text-align: inherit;
      }
      .album-image {
        height: 15vw;
        @media (max-width: $breakpoint-tablet) {
          width: 80vw;
          height: auto;
        }
      }
      .album-title {
        display: block;
        color: #000000;
        padding-top: 14px;
      }
    }
  }
}
</style>
