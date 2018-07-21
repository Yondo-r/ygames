<template>
  <div>
    <button @click="oi()">clique aqui</button>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import tetris from './tetris.js'
export default {
  name: 'Columns',
  props: {
    msg: String
  },
  methods: {
    oi(){
      console.log("oi, eu sou o goku!")
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
