<template lang="pug">
  b-container(fluid).home-page.m-3
    b-row
      b-col
        h1 Star Wars characters list
    b-row
      b-card(
        v-for="(character, index) in characters"
        :key="character.id"
        :title="character.name"
        tag="article"
        style="max-width: 20rem;"
        class="m-2"
      )
        ImageLoader(
          type="card"
          :src="character.name | getImageUrl"
          :alt="character.name"
          :width="240"
          :height="240"
        )
        b-card-text
          span {{character.created | formatDate}}
          span.ships
            b-badge(v-if="character.starships.length") Кораблей: {{ character.starships.length }}
        b-button(:to="`/details/${character.id}`") Подробнее
    b-row
      b-col.text-center(v-if="isLoading")
        .spinner-wrapper.min-heigth
          b-spinner
</template>

<script>
import { mapGetters } from 'vuex'
import ImageLoader from '../components/ImageLoader'
export default {
  name: 'Home',
  components: { ImageLoader },
  computed: {
    ...mapGetters({ characters: 'getCharacters', isLoading: 'isCharactersDataSyncing' })
  }
}
</script>

<style scoped>

</style>
