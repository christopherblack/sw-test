<template lang="pug">
  b-container(fluid).home-page.m-3
    b-row
      b-col
        h1 Star Wars characters list
    b-row
      b-col.text-center(v-if="characters.length === 0")
        .spinner-wrapper.min-heigth
          b-spinner
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
        b-card-text Добавлен {{character.created | formatDate}}
        b-button(:to="`/details/${character.id}`") Подробнее
</template>

<script>
import { mapGetters } from 'vuex'
import ImageLoader from '../components/ImageLoader'
export default {
  name: 'Home',
  components: { ImageLoader },
  computed: {
    ...mapGetters({ characters: 'getCharacters' })
  }
}
</script>

<style scoped>

</style>
