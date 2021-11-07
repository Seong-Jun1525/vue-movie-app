import { createStore } from 'vuex'
import movie from './movie.js'
import about from './about.js'

export default createStore ({
    modules: {
        movie, // this.$store.dispatch('movie/searchMovies', {})의 movie
        about
    }
})