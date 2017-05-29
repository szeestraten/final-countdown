<template>
  <div>
    <h1>Set a timer</h1>
    <div class="form-group">
      <label class="control-label" for="inputLarge"></label>
      <input class="form-control input-lg" 
        id="alarm" 
        type="number" 
        required 
        placeholder="00h 00m 00s"
        v-model="time">
    </div>

    <div>
      <a href="#" class="btn btn-lg btn-success">Start</a>
      <a href="#" class="btn btn-lg btn-warning disabled">Pause</a>
      <a href="#" class="btn btn-lg btn-danger disabled">Reset</a>
    </div>

    <h2>Time: {{ time }}</h2>

  </div>
</template>

<script>
  var data = { time: null }
  export default {
    data: function () {
      return data 
    }
  }
</script>