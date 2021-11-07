<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="3"
        :z-index="9"
        fixed />
    <!--
        - fixed
        따로 true값을 지정하지 않고 fixed라고 작성만해도 true값이 전달 됨.
        작성하지 않으면 false임.
      -->
    </template>
    <div
      v-else
      class="movie-details">
      <div
        :style="{ backgroundImage: `url(${requsetDiffSizeImage(theMovie.Poster)})`} "
        class="poster">
        <Loader
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <!-- :title은 html의 전역속성을 의미 -->
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`"
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'
export default {
  components: {
      Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    ...mapState('movie', [
      'loading',
      'theMovie'
    ])
    // theMovie() {
    //   return this.$store.state.movie.theMovie
    // },
    // loading() {
    //   return this.$store.state.movie.loading
    // }
  },
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/해당영화Id
      id: this.$route.params.id
    })
      // this.searchMovieWithId({
      //   id: this.$route.params.id
      // })
  },
  methods: {
    // Action을 실행하기 위해서는 store의 dispatch라는 함수를 동작시키고
    // dispatch는 함수처럼 사용하는 것이기 때문에 mapAction이라는 Helper같은 경우에는
    // methods 부분에 전개연산자로 등록을 해준다
    // ...mapActions('movie', [
    //   'searchMovieWithId'
    // ]),
    // searchMovieWithId() {
    //   this.$store.dispatch('movie/searchMovieWithId', {
    //     id: this.$route.params.id
    //   })
    // },
    requsetDiffSizeImage(url, size = 700) {
      // return url.replace('SX300', `SX${size}`)
      // await 키워드를 사용하여 크기가 변경된 src를 return하면 로딩이 끝나고 나서야
      // src라는 이미지 주소가 반환되는 문제가 발생한다.
      // 그래서 이런 경우 async await를 사용하지 않고 then을 사용하여 비동기를 처리한다.
      
      // 예외 처리

      if (!url || url === 'N/A') {
        this.imageLoading = false
        return ''
      }

      const src = url.replace('SX300', `SX${size}`)
      this.$loadImage(src)
        .then(() => {
          this.imageLoading = false
        })
      return src
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30px;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * (3 * 0.5);
    margin-right: 70px;
  }
  .specs {
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    flex-shrink: 0; // 감소 너비 0
    width: 500px;
    height: 500px * (3 * 0.5);
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .specs {
    flex-grow: 1; // 증가 너비
    .title {
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &:after {
          content: '\00b7';
          margin: 0 6px;
        }
        &:last-child:after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
    }
  }

  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
    }
  }

  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }

  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>