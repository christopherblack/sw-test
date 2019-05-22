<template lang="pug">
  b-container(fluid).home-page
    h1.title Star Wars characters list
    b-row
      b-col(v-for="(error, index) in errors")
        b-alert.d-inline-block.float-right(:key="index" variant="danger" show dismissible fade) {{ error }}
    b-row.content
      b-col(v-for="character in characters" :key="character.id")
        b-card(
          tag="article"
          style="max-width: 20rem;"
          class="m-2"
        )
          b-card-sub-title
            h4 {{ character.name }}
              b-badge.float-right(v-if="character.starships.length" variant="info")
                span.icon.icon-starship-w.small {{ character.starships.length }}
          ImageLoader(
            type="card"
            :src="character.name | getImageUrl"
            :alt="character.name"
            :width="240"
            :height="240"
          )
          b-card-text
            small.created Создан {{character.created | formatDate}}
          b-button.mt-3(:to="`/details/${character.name}`" variant="primary") Подробнее
    b-row
      b-col.text-center(v-if="isLoading && characters.length === 0")
        .spinner-wrapper.min-heigth
          b-spinner
    b-row(v-if="pagination.totalRecords")
      b-col.text-center
        b-pagination.justify-content-center.mt-4(v-model="paginationCurrentPage" :total-rows="pagination.totalRecords" :perPage="pagination.perPage")
</template>

<script>
import { mapGetters } from 'vuex'
import ImageLoader from '../components/ImageLoader'
export default {
  name: 'Home',
  components: { ImageLoader },
  computed: {
    ...mapGetters({ characters: 'getCharacters', isLoading: 'isCharactersDataSyncing', errors: 'getSyncErrors', pagination: 'getPaginationSettings' }),
    paginationCurrentPage: {
      get: function () { return this.$store.getters.getPaginationSetting('currentPage') },
      set: function (value) { return this.$store.dispatch('setPagination', { currentPage: value }) }
    }
  }
}
</script>

<style scoped>

</style>
