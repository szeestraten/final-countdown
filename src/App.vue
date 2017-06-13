<template>
  <div class="site-wrapper">
    <div class="site-wrapper-inner">
      <div class="cover-container">

        <div class="inner cover">
          <div>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>

          <div class="footer inner">
            <p>{{ appFooterVueText }} <a :href="appFooterVueLink">Vue.js</a>, {{ appFooterProjectText }} <a :href="appFooterProjectLink">@szeestraten</a>.</p>
          </div>
        </div>

      </div> <!-- cover-container -->
    </div> <!-- site-wrapper-inner -->
  </div> <!-- site-wrapper -->
</template>

<script>
export default {
  data: function () {
    return {
      // text
      appFooterVueText: 'Created with',
      appFooterVueLink: 'https://vuejs.org',
      appFooterProjectLink: 'https://github.com/szeestraten',
      appFooterProjectText: 'by',
    }
  }
}
</script>

<style>
</style>
