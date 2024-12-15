<template>
  <div v-show="isShow" class="carousel-item fit" @click="$emit('next')">
    <img class="imageCarousel" :src="removeCompress(slide.image)" :alt="slide.image.alt">
    <div class="elements-carousel">
      <prismic-rich-text class="carouselTitle" :field="slide.title" />
    </div>
  </div>
</template>

<script>
import * as prismicH from '@prismicio/helpers'

export default {
  props: {
    slide: {
      type: Object,
      required: true
    },
    currentSlides: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    isShow () {
      return this.currentSlides.find(slide => slide.id === this.id).index === this.index
    }
  },
  methods: {
    removeCompress (image) {
      return prismicH.asImageSrc(image, { auto: undefined })
    }
  }
}
</script>

<style lang="scss" scoped>
$breakpoint-tablet: 768px;
.fit {
  width: fit-content;
  cursor: pointer;

  @media (max-width: $breakpoint-tablet) {
    width: 90vw;
    margin: 0 auto;
  }
}

.carouselTitle {
  font-size: 13px;
}

.elements-carousel {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  color: #222222;
  height: 30px;
  margin-top: 15px;

  @media (max-width: $breakpoint-tablet) {
    margin-top: 0px;
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
      gap: 0px;
      width: 90px;
    }

    .prev ,
    .next  {
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
</style>
