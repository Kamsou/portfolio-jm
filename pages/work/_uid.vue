<template>
  <article>
    <carousel>
      <carousel-slide
        v-for="(slide, index) in doc.photos"
        :key="index"
        :index="index"
        :visibleSlide="visibleSlide"
      >
        <img @click="next()" :src="slide.image1.url" />
        <div class="elements-carousel">
          <div class="element-number">
            <span>{{ index + 1 }} — {{ slidesLen }}</span>
          </div>
          <div class="element-pagination">
            <a class="prev" @click="prev()">
              <svg width="20px" height="40px" viewBox="0 0 50 80" xml:space="preserve">
                <polyline
                  fill="none"
                  stroke="#000000"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  points="45.63,75.8 0.375,38.087 45.63,0.375"
                  />
              </svg>
            </a>
            <a class="next" @click="next()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="20px"
                height="40px"
                viewBox="0 0 50 80"
                xml:space="preserve"
              >
                <polyline
                  fill="none"
                  stroke="#000000"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  points="0.375,0.375 45.63,38.087 0.375,75.8"
                />
              </svg>
            </a>
          </div>
        </div>
      </carousel-slide>
    </carousel>
  </article>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import CarouselSlide from '@/components/CarouselSlide.vue'
export default {
  components: {
    Carousel,
    CarouselSlide
  },
  data () {
    return {
      visibleSlide: 0
    }
  },
  computed: {
    slidesLen () {
      return this.doc.photos.length
    }
  },
  async asyncData ({ $prismic, params, error }) {
    try {
      // Query to get post content
      const document = (await $prismic.api.getByUID('album', params.uid)).data
      return {
        // Set slices as variable
        doc: document
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  mounted () {
    console.log(this.doc.photos, 'slices')
  },
  methods: {
    next () {
      if (this.visibleSlide >= this.slidesLen - 1) {
        this.visibleSlide = 0
      } else {
        this.visibleSlide++
      }
    },
    prev () {
      if (this.visibleSlide <= 0) {
        this.visibleSlide = this.slidesLen - 1
      } else {
        this.visibleSlide--
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: auto;
  height: 30vw;
}
.elements-carousel {
  display: flex;
  align-items: center;
  .element-number {
    span {
      display: block;
      font-size: 10px;
      margin-top: 20px;
      margin-left: 5px;
    }
  }
  .element-pagination {
    padding-left: 30px;
    .prev svg,
    .next svg {
      width: 1.389vw;
      height: 1.278vw;
      margin-top: 20px;
      cursor: pointer;
      position: relative;
      left: 13%;
    }
  }
}

</style>
