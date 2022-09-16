<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
  body {
    line-height: 1.15;
    font-size: 14px;
    font-family: Geometria, Arial, Helvetica, sans-serif;
    color: #10171E;
  }

  button {
    padding: 0;
    background: transparent;
    border: none;
  }

  .btn {
    padding: 13px 14px;
    font: inherit;
    line-height: 1;
    border: none;
    border-radius: 6px;
  }
  .btn-primary {
    color: #FFFFFF;
    background: #106EDC;
  }
  .btn img {
    margin-right: 8px;
    vertical-align: top;
  }

  .container {
    margin: 0 auto;
    padding: 78px 50px 0 60px;
    max-width: 1170px;
  }
</style>
