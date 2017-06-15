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
            <p>
              <span v-html="$t('footer')"></span>
              {{ $t('locales.language') }}:
              <a class="locale" href="javascript:void(0);"
                v-for="locale in locales"
                :class="{ active: $i18n.locale === locale }"
                @click="$i18n.locale = locale">{{ $t('locales.' + locale) }}</a>
            </p>
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
      locales: ['en-US', 'nl-NL']
    }
  }
}
</script>

<style>
</style>
