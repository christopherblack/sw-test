<template lang="pug">
  b-container.details-page
    b-row
      b-col(:cols="12")
        h1
          span Информация о {{ data.name }}
      b-col(:cols="12")
        router-link(to="/") < Назад
      b-col(:cols="12")
        .img
          ImageLoader(
            type="img"
            :src="data.name | getImageUrl"
            :alt="data.name"
            :width="400"
            :height="400"
          )
        .content
          h3 {{ data.name }}
          p Родился в {{ data.birth_year }} году
          p Пол {{ data.gender | getGender }}
          h4(v-if="data.starships.length > 0") Корабли персонажа
            b-spinner.starships-loader(v-if="!data.starshipsData" small)
            ul.starships(v-else)
              li.icon.icon-starship(v-for="starship in data.starshipsData")
                span.name {{ starship.name }}
                span.model
                  b-badge {{ starship.model }}
</template>

<script>
import ImageLoader from '../components/ImageLoader'
export default {
  name: 'Details',
  filters: {
    getGender: value => value === 'male' ? 'мужской' : 'женский'
  },
  components: { ImageLoader },
  data () {
    return {
      // starships: []
    }
  },
  computed: {
    data () { return this.$store.getters.getSingleCharacter(this.$route.params.name) }
  }
}
</script>

<style scoped>
  .img {
    float: left;
  }
</style>
