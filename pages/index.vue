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
        <div class="carousel">
          <div class="carousel-inner">
            <carousel-item
              v-for="(slide, index) in item.items"
              :id="item.primary.__ob__.dep.id"
              :key="`item-${index}`"
              :slide="slide"
              :current-slides="currentSlides"
              :index="index"
              @next="next(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as prismicH from '@prismicio/helpers'
import CarouselItem from '../components/CarouselItem.vue'

export default {
  components: {
    CarouselItem
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
      currentSlides: null,
      carouselSlices: null
    }
  },
  created () {
    this.carouselSlices = this.page.filter(item => item.slice_type !== 'image_description') || []

    this.currentSlides = this.carouselSlices.map((item, index) => {
      return {
        id: item.primary.__ob__.dep.id,
        index: 0
      }
    })
  },
  methods: {
    removeCompress (image) {
      return prismicH.asImageSrc(image, { auto: undefined })
    },
    next (item) {
      const sliceId = item.primary.__ob__.dep.id
      const currentSlideIndex = this.currentSlides.find(slide => slide.id === sliceId).index
      const newIndex = currentSlideIndex >= item.items.length - 1 ? 0 : currentSlideIndex + 1

      this.currentSlides = this.currentSlides.map(slide => slide.id === sliceId ? { ...slide, index: newIndex } : slide)
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
  align-items: center;

  @media (max-width: $breakpoint-tablet) {
    width: 40%;
  }
}
</style>
