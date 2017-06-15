import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en-US.json'
import nl from './nl-NL.json'

Vue.use(VueI18n)

export function createI18n () {
  return new VueI18n({
    locale: 'en-US',
    messages: {
      'en-US': en,
      'nl-NL': nl
    }
  })
}
