<template>
  <div>
    <transition name="fade" mode="out-in">
      <!-- Display title-->
      <h1 v-if="!timerActive" key="title">Set a timer</h1>

      <!-- Display timer -->
      <h1 :class="{ blink: timerFinished }" id="timerDisplay" v-else key="display">{{ displayRemaining }}</h1>
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
      <button class="btn btn-lg btn-danger" :disabled="!timerActive" @click="resetTimer">Reset</button>
    </div>

  </div>
</template>

<script>
// Import numeral for handling time formats
var numeral = require('numeral');
// Import timer-stopwatch for timing
var stopwatch = require('timer-stopwatch');

export default {
  data: function () {
    return {
      timerObject: null,
      timerSound: null,
      timerDuration: 0,
      timerActive: false,
      timerPaused: false,
      timerFinished: false,
      timerSelected: '15:00',
      options: [
        { text: '5m', value: '5:00'},
        { text: '10m', value: '10:00'},
        { text: '15m', value: '15:00'},
        { text: '20m', value: '20:00'},
        { text: '25m', value: '25:00'},
        { text: '30m', value: '30:00'},
        { text: '35m', value: '35:00'},
        { text: '40m', value: '40:00'},
        { text: '45m', value: '45:00'}
      ],

    }
  },
  computed: {
    displayRemaining: function () {
      return numeral(this.getTimeInSeconds()).format('00:00:00');
    },
    calculateProgress: function () {
      return numeral(this.getTimeInSeconds() / this.timerDuration).format('0%');
    },
    toggleTimerText: function() {
      return !(this.timerActive || this.timerPaused) 
        ? 'Start' : this.timerPaused ? 'Resume' : 'Pause';
    },
    toggleTimerClass: function() {
      return !(this.timerActive || this.timerPaused) 
        ? 'btn-success' : this.timerPaused ? 'btn-warning' : 'btn-info';
    },

  },
  methods: {
    resetInput: function () {
    },
    toggleTimer: function() {
      if(this.timerPaused || !this.timerActive) {
        this.startTimer();
      } else {
        this.pauseTimer();
      }
    },
    startTimer: function () {
      if (this.timerPaused) {
        // Start paused timer
        this.timerPaused = false;
        this.timerObject.start()
      } else {
        // Get the selected duration
        this.timerDuration = numeral(this.timerSelected).value();

        // Setup stopwatch object
        this.timerObject = new stopwatch(this.timerDuration * 1000, { refreshRateMS: 1000 });
        // Need this for closures
        var self = this;
        // Call when done
        this.timerObject.onDone(function() {
          self.timerFinished = true;
          self.timerSound.play();
        });

        // Start the clock
        this.timerObject.start();
        this.timerActive = true;
      }
    },
    pauseTimer: function () {
      this.timerPaused = true;
      this.timerObject.stop();
    },
    resetTimer: function () {
      this.timerActive = false;
      this.timerPaused = false;
      this.timerFinished = false;
      this.timerObject.stop();
      this.timerObject = null;
    },

    // Helper functions
    getTimeInSeconds: function () {
      return Math.round(this.timerObject.ms/1000);
    },
    getTimeInMilliseconds: function () {
      return Math.round(this.timerObject.ms);
    },

  },
  mounted: function () {
    // Load audio for alarm sound
    this.timerSound = new Audio('assets/media/bell.mp3');
    this.timerSound.volume = 0.3;
  },
}
</script>
