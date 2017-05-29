<template>
  <div class="wrapper">
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
  </div>
</template>

<script>
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
