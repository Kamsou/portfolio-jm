<template>
  <div class="page-album" v-if="albums.length !== 0">
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
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website'
    }
  },
  async asyncData ({ $prismic, error }) {
    try {
      // Query to get posts content to preview
      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'album'),
        { orderings: '[document.first_publication_date]' }
      )

      // Returns data to be used in template
      return {
        albums: blogPosts.results
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  mounted () {
    console.log(this.albums, 'alb')
  }
}
</script>

<style lang="scss" scoped>
.page-album {
  display: flex;
  font-size: 0.9vw;
  article {
    display: flex;
    margin-right: 80px;
    a {
      text-align: center;
      text-decoration: none;
      .album-image {
        height: 15vw;
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
