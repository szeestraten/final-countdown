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
              <a class="locale"
                href="javascript:void(0);"
                v-for="locale in locales"
                :class="isLocaleActive(locale)"
                @click="setLocale(locale)">{{ $t('locales.' + locale) }}</a>
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
  },
  mounted: function () {
    // Set locale if set in local storage
    var locale = this.$ls.get('locale')
    if (locale) this.setLocale(locale)
  },
  methods: {
    // Set locale of current session in Vue and in local storage
    setLocale: function (locale) {
      this.$i18n.locale = locale
      this.$ls.set('locale', locale)
    },
    // Returns an dict to render if the checked locale is active
    isLocaleActive: function (locale) {
      return { active: this.$i18n.locale === locale }
    }
  }
}
</script>

<style>
</style>
