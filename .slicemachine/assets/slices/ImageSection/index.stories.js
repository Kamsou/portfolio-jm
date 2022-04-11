import MyComponent from '../../../../slices/ImageSection';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ImageSection'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","name":"Default","slice_type":"image_section","items":[],"primary":{"title":[{"type":"heading1","text":"Brand cross-platform infrastructures","spans":[]}],"description":[{"type":"paragraph","text":"Eu cupidatat qui ut sint non ut dolor aute reprehenderit ipsum irure ea. Adipisicing reprehenderit eu enim pariatur ullamco veniam aliqua aute enim ut ut laborum laboris.","spans":[]}]},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
