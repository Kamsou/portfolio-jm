<template>
  <section>
    <div v-for="(item, idx) in page" :key="idx">
      <div v-if="item.slice_type === 'image_description'" class="imageDescription">
        <img
          v-if="item.primary.image"
          :src="removeCompress(item.primary.image)"
          class="image"
          :alt="item.primary.image.alt"
        >

        <prismic-rich-text class="imageDescriptionText" :field="item.primary.label" />
      </div>

      <div v-else class="imageSlider">
        <carousel>
          <carousel-slide
            v-for="(block, index) in item.items"
            :key="index"
            :index="index"
            :visible-slide="visibleSlide"
          >
            <div class="fit" @click="next(item.items)">
              <img class="imageCarousel" :src="removeCompress(block.image)" :alt="block.image.alt">

              <div class="elements-carousel">
                <prismic-rich-text class="carouselTitle" :field="block.title" />
              </div>
            </div>
          </carousel-slide>
        </carousel>
      </div>
    </div>
  </section>
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
  async asyncData ({ $prismic, error }) {
    try {
      const page = (await $prismic.api.getSingle('main_menu')).data.body
      return {
        page
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data () {
    return {
      visibleSlide: 0,
      slicesLength: 0
    }
  },
  methods: {
    removeCompress (image) {
      return prismicH.asImageSrc(image, { auto: undefined })
    },
    keycodeGallery (event) {
      if (event.keyCode === 39) {
        this.next()
      } else if (event.keyCode === 37) {
        this.left()
      }
    },
    left () {
      const max = this.visibleSlide > 0
      max ? this.visibleSlide-- : this.visibleSlide = this.slicesLength - 1
    },
    next (items) {
      this.slicesLength = items.length
      const max = this.visibleSlide >= this.slicesLength - 1
      max ? this.visibleSlide = 0 : this.visibleSlide++
    }
  },
  head: {
    title: 'Jean Marquès'
  }
}
</script>

<style lang="scss">
$breakpoint-tablet: 768px;
.image {
  width: 40vw;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
    margin: 0 auto;
  }
}

.imageCarousel {
  width: 40vw;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
    margin: 0 auto;
    touch-action: manipulation;
  }
}

.imageDescription {
  width: 40vw;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
    margin: 0 auto;
    touch-action: manipulation;
  }
}

.imageDescriptionText {
  text-align: right;
  font-size: 13px;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
  }
}

.imageDescription, .imageSlider {
  padding-bottom: 100px;

  @media (max-width: $breakpoint-tablet) {
    width: 90%;
    margin: 0 auto;
    touch-action: manipulation;
  }
}

.elements-carousel {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  color: #222222;

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

.carouselTitle {
  font-size: 13px;
}

.title {
  font-size: 16px;

  &:hover {
    color: grey;
  }

  @media (max-width: $breakpoint-tablet) {
    width: 60%;
  }
}

.fit {
  width: fit-content;
  cursor: pointer;

  @media (max-width: $breakpoint-tablet) {
    width: 90vw;
    margin: 0 auto;
  }
}

.pagination-left {
  display: flex;

  @media (max-width: $breakpoint-tablet) {
    width: 40%;
  }
}
</style>
