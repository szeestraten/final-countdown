<template>
  <div>
    <h1>{{ homeTitleText }}</h1>
    <p class="lead" v-html="homeLeadText"></p>
    <p class="lead">
      <router-link to="/timer"><a href="#" class="btn btn-lg btn-success">{{ homeLeadButton }}</a></router-link>
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // text
      homeTitleText: 'Tired of long meetings?',
      homeLeadText: 'Time management can be hard, especially during meetings. <br>Keep your meetings efficient with a timer.',
      homeLeadButton: 'Set a timer'
    }
  }
}
</script>