<template>
  <div class="page-article" v-if="articles.length !== 0">
      <article class="article" v-for="a in articles" :key="a.id">
        <img :src="a.data.image_de_l_article.url" class="album-image" alt="">
        <prismic-rich-text class="paragraphe" :field="a.data.paragraphe_de_l_article"/>
      </article>
  </div>
</template>

<script>
export default {
  async asyncData ({ $prismic, error }) {
    try {
      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'article'),
        { orderings: '[document.first_publication_date]' }
      )
      return {
        articles: blogPosts.results
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
.page-article {
  article {
    padding-bottom: 50px;
    width: 600px;
    @media (max-width: $breakpoint-tablet) {
      margin-left: 5%;
      width: 95%;
    }
    img {
      width: 100%;
      margin-bottom: 20px;
    }
    .paragraphe {
      a {
        color: #000;
        text-decoration: underline;
        text-underline-position: under;
      }
    }
  }
}
</style>
