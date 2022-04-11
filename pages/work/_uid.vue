<template>
  <article>
    <carousel>
      <carousel-slide
        v-for="(slide, index) in gallery"
        :key="index"
        :index="index"
        :visible-slide="visibleSlide"
      >
        <div class="fit">
          <img :src="removeCompress(slide.picture)" @click="next()">
          <div class="elements-carousel">
            <div class="pagination-left">
              <div class="element-number">
                <span>{{ index + 1 }} - {{ slidesLen }}</span>
              </div>
              <div class="element-pagination">
                <a class="prev" @click="left">
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
                <a class="next" @click="next">
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
            <span class="title">{{ slide.picture.alt }}</span>
          </div>
        </div>
      </carousel-slide>
    </carousel>
  </article>
</template>

<script>
import * as prismicH from '@prismicio/helpers'
import Carousel from '@/components/Carousel.vue'
import CarouselSlide from '@/components/CarouselSlide.vue'
export default {
  components: {
    Carousel,
    CarouselSlide
  },
  async asyncData ({ $prismic, params, error }) {
    try {
      const document = (await $prismic.api.getByUID('album', params.uid)).data
      return {
        doc: document,
        gallery: document.body[0].items
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      visibleSlide: 0
    }
  },
  computed: {
    slidesLen () {
      return this.gallery.length
    }
  },
  mounted () {
    window.addEventListener('keydown', this.keycodeGallery)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.keycodeGallery)
  },
  methods: {
    keycodeGallery (event) {
      if (event.keyCode === 39) {
        this.next()
      } else if (event.keyCode === 37) {
        this.left()
      }
    },
    left () {
      const max = this.visibleSlide > 0
      max ? this.visibleSlide-- : this.visibleSlide = this.slidesLen - 1
    },
    next () {
      const max = this.visibleSlide >= this.slidesLen - 1
      max ? this.visibleSlide = 0 : this.visibleSlide++
    },
    removeCompress (image) {
      return prismicH.asImageSrc(image, { auto: undefined })
    }
  },
  head: {
    title: 'Jean Marquès'
  }
}
</script>

<style lang="scss" scoped>
$breakpoint-tablet: 768px;
img {
  width: auto;
  height: 30vw;
  @media (max-width: $breakpoint-tablet) {
    width: 90vw;
    height: auto;
    display: block;
    margin: 0 auto;
    touch-action: manipulation;
  }
}
.elements-carousel {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: #222222;
  @media (max-width: $breakpoint-tablet) {
    padding-top: 22px;
  }
  .element-number {
    span {
      display: block;
      font-size: 10px;
      margin-top: 12px;
      margin-left: 5px;
    }
  }
  .element-pagination {
    padding-left: 30px;
    padding-top: 5px;
    @media (max-width: $breakpoint-tablet) {
      padding-left: 9px;
      padding-top: 0;
    }
    .prev svg,
    .next svg {
      width: 0.6vw;
      height: 1.278vw;
      cursor: pointer;
      position: relative;
      left: 13%;
      top: 5px;
      @media (max-width: $breakpoint-tablet) {
        width: 8.389vw;
        height: 8.278vw;
      }
    }
  }
}

.title {
  font-size: 12px;
  padding-left: 20px;
}

.fit {
  width: fit-content;
  @media (max-width: $breakpoint-tablet) {
    width: 90vw;
    margin: 0 auto;
  }
}

.pagination-left {
  display: flex;
}

</style>
