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
          <img :src="removeCompress(slide.picture)">
          <div class="clickable-area left" @click="left" />
          <div class="clickable-area right" @click="next" />
          <div class="elements-carousel">
            <div class="pagination-left">
              <div class="element-number">
                <span>{{ index + 1 }} - {{ slidesLen }}</span>
              </div>

              <div class="element-pagination">
                <a class="prev" @click="left">
                  <p>&lt;</p>
                </a>

                <a class="next" @click="next">
                  <p>></p>
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
.fit {
  position: relative;
}

.clickable-area {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  cursor: pointer;
}

.clickable-area.left {
  left: 0;
}

.clickable-area.right {
  right: 0;
}

$breakpoint-tablet: 768px;
img {
  width: auto;
  height: 40vw;
  @media (max-width: $breakpoint-tablet) {
    height: 70vw;
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
  margin-top: 15px;

  @media (max-width: $breakpoint-tablet) {
    margin-top: 22px;
  }
  .element-number {
    span {
      display: block;
      font-size: 10px;
      margin-left: 5px;
    }
  }
  .element-pagination {
    padding-left: 30px;
    display: flex;
    gap: 15px;
    font-size: 10px;

    @media (max-width: $breakpoint-tablet) {
      padding-left: 15px;
      width: 90px;
    }

    .prev
    .next {
      width: 0.6vw;
      height: 1.278vw;
      cursor: pointer;
      display: flex;
      align-items: center;

      @media (max-width: $breakpoint-tablet) {
        width: 8.389vw;
        height: 8.278vw;

        p {
          font-size: 20px;
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

.title {
  font-size: 13px;
  padding-left: 20px;

  @media (max-width: $breakpoint-tablet) {
    width: 60%;
    padding-left: 0;
  }
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
  align-items: center;

  @media (max-width: $breakpoint-tablet) {
    width: 40%;
  }
}

</style>
