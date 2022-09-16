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

  h1 {
    margin: 0 0 24px;
    font-size: 22px;
    font-weight: 500;
  }

  fieldset {
    padding: 0;
    margin: 0;
    border: none;
  }

  select,
  textarea,
  input[type=date],
  input[type=text] {
    box-sizing: border-box;
    padding: 13px 16px;
    width: 100%;
    font: inherit;
    background: #FFFFFF;
    border: 1px solid #DFE3E7;
    border-radius: 4px;
  }

  textarea {
    height: 140px;
    resize: none;
  }

  button {
    padding: 0;
    background: transparent;
    border: none;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 13px 14px;
    font: inherit;
    line-height: 1;
    background: white;
    border: 1px solid #DFE3E7;
    border-radius: 6px;
  }
  .btn + .btn {
    margin-left: 10px;
  }
  .btn-primary {
    color: #FFFFFF;
    background: #106EDC;
  }
  .btn-shadow {
    box-shadow: 0px 2px 14px rgba(204, 214, 221, 0.5);
  }
  .btn-separator {
    margin: 0 30px;
    min-height: 40px;
    border-left: 1px solid #BBC0C5;
  }
  .btn img {
    margin-right: 13px;
  }

  .container {
    margin: 0 auto;
    padding: 78px 50px 0 60px;
    max-width: 1170px;
  }
</style>
