<template>
  <div id="app">
    <columns msg="Este será o jogo Columns"/>
  </div>
</template>

<script>
import Columns from './components/Columns.vue'
import tetris from './components/tetris.js'

export default {
  name: 'app',
  components: {
    Columns,
    tetris
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
