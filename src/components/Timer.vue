<template>
  <div>
    <transition name="fade" mode="out-in">
      <!-- Display title-->
      <h1 v-if="!timerActive" key="title">{{ $t('timer.title') }}</h1>

      <!-- Display 1 minute warning -->
      <h1 v-else-if="oneMinuteWarning"
        :class="{ blink: oneMinuteWarning}"
        id="timerOneMinuteWarning"
        class="text-danger"
        key="oneMinuteWarning">{{ $t('timer.oneMinuteWarning') }}</h1>

      <!-- Display timer -->
      <h1 v-else
        :class="{ blink: timerFinished }"
        id="timerDisplay"
        key="display">{{ displayRemaining }}</h1>
    </transition>

    <transition name="fade" mode="out-in">
      <!-- Select timer -->
      <div class="form-group" id="timerSelectForm" v-if="!timerActive" key="timerSelect">
        <label for="select" class="control-label"></label>
        <div>
          <select class="form-control" id="timerSelect" v-model="timerSelected" :disabled="timerActive">
            <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
          </select>
        </div>
      </div>  

      <!-- Display progress bar -->
      <div class="progress progress-striped" :class="{ active: !timerPaused }" id="timerBar" v-else key="timerBar">
        <div class="progress-bar progress-bar-info" :style="{ width: calculateProgress }"></div>
      </div>
    </transition>

    <div>
      <button class="btn btn-lg" :class="toggleTimerClass" @click="toggleTimer">{{ toggleTimerText }}</button>
      <button class="btn btn-lg btn-danger" :disabled="!timerActive" @click="resetTimer">{{ $t('timer.button.reset') }}</button>
    </div>

  </div>
</template>

<script>
// Import numeral for handling time formats
var numeral = require('numeral')
// Import timer-stopwatch for timing
var stopwatch = require('timer-stopwatch')

export default {
  data: function () {
    return {
      sleepVideo: null,
      timerObject: null,
      timerSound: null,
      timerDuration: 0,
      timerActive: false,
      timerPaused: false,
      timerFinished: false,
      timerSelected: '15:00',
      options: [
        { text: '5m', value: '5:00' },
        { text: '10m', value: '10:00' },
        { text: '15m', value: '15:00' },
        { text: '20m', value: '20:00' },
        { text: '25m', value: '25:00' },
        { text: '30m', value: '30:00' },
        { text: '35m', value: '35:00' },
        { text: '40m', value: '40:00' },
        { text: '45m', value: '45:00' }
      ]

    }
  },
  computed: {
    displayRemaining: function () {
      return numeral(this.getTimeInSeconds()).format('00:00:00')
    },
    oneMinuteWarning: function () {
      // Return true for 5 seconds at 1 minute warning
      return (this.getTimeInSeconds() >= 56 && this.getTimeInSeconds() <= 60)
    },
    calculateProgress: function () {
      return numeral(this.getTimeInSeconds() / this.timerDuration).format('0%')
    },
    toggleTimerText: function () {
      return !(this.timerActive || this.timerPaused)
        ? this.$t('timer.button.start') : this.timerPaused ? this.$t('timer.button.resume') : this.$t('timer.button.pause')
    },
    toggleTimerClass: function () {
      return !(this.timerActive || this.timerPaused)
        ? 'btn-success' : this.timerPaused ? 'btn-warning' : 'btn-info'
    }

  },
  methods: {
    toggleTimer: function () {
      if (this.timerPaused || !this.timerActive) {
        this.startTimer()
      } else {
        this.pauseTimer()
      }
    },
    startTimer: function () {
      // Resume timer if paused
      if (this.timerPaused) {
        // Start paused timer
        this.timerPaused = false
        this.timerObject.start()
        this.preventSleep()

      // If not paused, setup new timer
      } else {
        // Get the selected duration
        this.timerDuration = numeral(this.timerSelected).value()

        // Setup stopwatch object
        this.timerObject = new stopwatch(this.timerDuration * 1000, { refreshRateMS: 1000, almostDoneMS: 60000 })
        // Need this for closures
        var self = this
        // Call when done
        this.timerObject.onDone(function () {
          self.timerFinished = true
          self.timerSound.play()
        })
        // Call on 1 minute warning
        this.timerObject.onAlmostDone(function () {
        })

        // Start the clock
        this.timerObject.start()
        this.timerActive = true

        // Prevent sleep when counting down
        this.preventSleep()
      }
    },
    pauseTimer: function () {
      this.timerPaused = true
      this.timerObject.stop()

      // Disable sleep prevention
      this.allowSleep()
    },
    resetTimer: function () {
      // Reset timers and variables
      this.timerActive = false
      this.timerPaused = false
      this.timerFinished = false
      this.timerObject.stop()
      this.timerObject = null

      // Disable sleep prevention
      this.allowSleep()
    },

    // Helper functions
    getTimeInSeconds: function () {
      return Math.round(this.timerObject.ms / 1000)
    },
    getTimeInMilliseconds: function () {
      return Math.round(this.timerObject.ms)
    },

    // Avoid sleep hack when timer is active
    preventSleep: function () {
      if (!this.sleepVideo) this._initSleepPrevention()
      this.sleepVideo.setAttribute('loop', 'loop')
      this.sleepVideo.play()
    },
    allowSleep: function () {
      if (!this.sleepVideo) this._initSleepPrevention()
      this.sleepVideo.removeAttribute('loop')
      this.sleepVideo.pause()
    },
    _initSleepPrevention: function () {
      // Setup video element
      this.sleepVideo = window.document.createElement('video')
      this.sleepVideo.setAttribute('width', '10')
      this.sleepVideo.setAttribute('height', '10')
      this.sleepVideo.style.position = 'absolute'
      this.sleepVideo.style.top = '-10px'
      this.sleepVideo.style.left = '-10px'

      // Create video source elements
      var sourceMp4 = window.document.createElement('source')
      sourceMp4.setAttribute('src', 'assets/media/muted-blank.mp4')
      sourceMp4.setAttribute('type', 'video/mp4')
      this.sleepVideo.appendChild(sourceMp4)

      var sourceOgg = window.document.createElement('source')
      sourceOgg.setAttribute('src', 'assets/media/muted-blank.ogv')
      sourceOgg.setAttribute('type', 'video/ogg')
      this.sleepVideo.appendChild(sourceOgg)

      // Add elements to DOM
      window.document.body.appendChild(this.sleepVideo)
    }
  },
  mounted: function () {
    // Load audio for alarm sound
    this.timerSound = new Audio('assets/media/bell.mp3')
    this.timerSound.volume = 0.4
  }
}
</script>
