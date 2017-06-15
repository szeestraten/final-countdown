<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p class="lead" v-html="$t('home.lead')"></p>
    <p class="lead">
    <router-link to="/timer"><a href="#" class="btn btn-lg btn-success">{{ $t('home.button') }}</a></router-link>
    </p>
  </div>
</template>

<script>
</script>

<style>
</style>