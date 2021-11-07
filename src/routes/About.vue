<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ github }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
// import { computed } from '@vue/reactivity'
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
    // Vue에서 mapState라는 Helper를 가지고 와서
    // 첫 번째 인수로는 'about'이라는 모듈의 이름을 명시를 해주고
    // 두번째 인수로는 배열 데이터를 추가해서
    // 그 배열의 각각의 아이템부분에 문자 데이터로 내가 가지고 올 mapState이니깐
    // 상태들의 이름을 명시를 해준다. 이 상태들을 가지고 오면
    // mapState라는 함수가 실행된 결과를 통해서 직접 명시된 내용들이 반환이 되는 것이고
    // 그 내용들이 객체데이터로 반환이 되고 객체데이터를 전개연산자로 전개해서
    // computed라는 계산된 데이터에 등록을 한다.
    ...mapState('about', [
      'image',
      'name',
      'email',
      'github',
      'phone'
    ])
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
    // email() {
    //   return this.$store.state.about.email
    // },
    // github() {
    //   return this.$store.state.about.github
    // },
    // phone() {
    //   return this.$store.state.about.phone
    // }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>