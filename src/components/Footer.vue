<template>
  <footer>
    <Logo />
    <a
      href="https://github.com/Seong-Jun1525"
      target="_blank">
      &copy; {{ new Date().getFullYear }} Seong Jun
    </a>
  </footer>
</template>

<script>
import Logo from '~/components/Logo'

export default {
    components: {
        Logo
    }
}
</script>

<style lang="scss" scoped>
footer {
    padding: 70px 0;
    text-align: center;
    opacity: 0.7;
    .logo {
        display: block;
        margin-bottom: 4px;
    }
}
</style>