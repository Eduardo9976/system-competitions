<template>
  <div id="nav">
    <!--
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
  <Footer />
</template>
<script>
import Footer from './components/Footer'

export default {
  components: { Footer },
  setup () {
    return { Footer }
  }
}
</script>
