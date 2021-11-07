<template>
  <RouterLink
    :to="`/movie/${movie.imdbID}`"
    :style="{backgroundImage: `url(${movie.Poster})`}"
    class="movie">
    <Loader
      v-if="imageLoading"
      :size="1.5"
      absolute />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  components: {
      Loader
  },
  props: {
      movie: {
          type: Object,
          // default: function() { return {} }
          default: () => ({})
      }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  mounted() {
    // movieitem component가 연결이 된 직후에 init 메소드가 동작할 수 있다.
    // created를 사용하지 않은 이유 
    // created는 component가 생성이 된 직후에 동작함.
    // created에서는 실제로 html구조가 연결된 상태가 아니여서
    // html 구조가 연결이 된 직후를 의미하기 위해서 mounted를 life-cycle로 사용.
    this.init()
  },
  methods: {
    async init() { // 초기화
      // // 정리
      // // imageLoading는 true로 시작
      // // init메로드를 실행 후 일단 메모리 상에 img태그를 하나 만듬
      // // img태그에 src 속성에다가 실제 사용할 Poster에 이미지 주소를 삽입
      // // 그렇게 만들어진 이미지 요소가 실제 load가 되면 callback함수 실행
      // // load 후 화면에 출력할 준비가 되면 imageLoading을 false로 변경
      // const img = document.createElement('img')
      // img.src = this.movie.Poster
      
      // img.addEventListener('load', () => {
      //   // 주의
      //   // callback 부분을 화살표 함수로 코딩함.
      //   // this를 사용할 때 화살표 함수가 만들어진는 그 부분에서 this를 참조할 수 있다.
      //   // 여기서의 this는 vue파일 내부에서 this의 여러가지 데이터나 메소드에 접근할 수 있다.
      //   // 만약에 화살표 함수를 사용하지 않고 일반적인 function 키워드를 사용하는 함수로 만들면
      //   // 그 내부에서의 this는 호출되는 위치의 this로 해석이 되기 때문에
      //   // imageloading의 데이터에 접근할 수 없다.
      //   this.imageLoading = false
      // })
      // plugin 만든 후 init을 비동기로 만들어야 하니깐 async를 써줌.
      // 예외 처리
      const poster = this.movie.Poster
      if (!poster || poster === 'N/A') {
        this.imageLoading = false
      }
      else {
        await this.$loadImage(poster)
        this.imageLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.movie {
  $width: 200px;
  position: relative;
  width: $width;
  height: $width * (3 * 0.5);
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 6px solid $primary;
  }
  .info {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      font-size: 14px;
      padding: 14px;
      text-align: center;
      background-color: rgba($black, 0.3);
      backdrop-filter: blur(10px);
      .year {
          color: $primary;
      }
      .title {
          color: $white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
      }
  }
}
</style>