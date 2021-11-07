<template>
  <div
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex
    }"
    :class="{ absolute, fixed }"
    class="spinner-border text-primary"></div>
</template>
<script>
export default {
    props: {
        size: {
            type: Number,
            default: 2
        },
        absolute: {
            type: Boolean,
            dufault: false
        },
        fixed: {
            type: Boolean,
            default: false
        },
        zIndex: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>
.spinner-border {
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // 위의 코드는 가운데 배치를 해주는 코드이다.
    // 하지만 가운데 배치를 하기 위해서는 position 값이 absolute나 fixed이어야 하는데
    // 그것을 해당하는 spinner-border 부분에 absolute와 fixed의 클래스가 붙어있는
    // 각각의 경우에만 position의 값이 해당 클래스의 값으로 적용된다.
    // 즉, spinner-border는 가운데 배치를 해주는 속성들을 가지고는 있지만
    // absolute나 fixed의 상태가 아닌 상태로 시작한다.
    &.absolute {
        position: absolute; // 부모 요소 기준에 가운데 배치
    }
    &.fixed {
        position: fixed; // 뷰포트 기준에 가운데 배치
    }
}
</style>