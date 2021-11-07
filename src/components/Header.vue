<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <!-- user를 click했을 때 about으로 넘어가는 방법 -->

    <!-- 방법1 -->
    <!--
      <Router-link
        to="/about"
        class="user">
        <img
          :src="image"
          :alt="name" />
      </Router-link>
    -->

    <!-- 방법2 -->
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'

export default {
    components: {
        Logo
    },
    data() {
        return {
            navigations: [
                {
                    name:'Search',
                    href: '/'
                },
                {
                    name: 'Movie',
                    href: '/movie/tt4520988',
                    path: /^\/movie/ // /movie
                },
                {
                    name: 'About',
                    href: '/about'
                }
            ]
        }
    },
    computed: {
      ...mapState('about', [
        'image',
        'name'
      ]),
      // 모듈의 이름이 변경되면 mapState 함수를 한번 더 동작시킨다라고 생각하면 됨
      // ...mapState('movie', [
      //   'movies',
      //   'loading',
      //   'message',
      //   'theMovie'
      // ])
      // image() {
      //   return this.$store.state.about.image
      // },
      // name() {
      //   return this.$store.state.about.name
      // }
    },
    methods: {
      isMatch(path) {
        // mapState에 등록된 데이터들은 기존에 사용하던 것처럼
        // this라는 키워드를 사용해서 접근할 수 있다
        // mapState를 사용하기는 했지만
        // 결국 computed라는 계산된 데이터로 등록이 되는 것이기 때문이다
        // this.image
        // this.name
        // this.movies
        // this.loading
        if(!path) return false
        return path.test(this.$route.fullPath)
      },
      toAbout() {
        this.$router.push('/about')
      }
    }
}
</script>

<style lang="scss" scoped>
header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
        margin-right: 40px;
    }
    .user {
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 40px;
      margin: auto;
      transition: 0.4s;
      &:hover {
        background-color: darken($gray-200, 10%);
      }
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    @include media-breakpoint-down(sm) {
      .nav {
        display: none;
      }
    }
}
</style>