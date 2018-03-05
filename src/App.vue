<template>
  <div id="app">
    <Nav/>
    <router-view class="main-view"/> 
    <footer id="footer">
      This is a cool footer
    </footer>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';

export default {
  components: {
    Nav
  }
};
</script>

<style>
html,
body {
  height: 100%;
  font-size: 14px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
}

#nav a.router-link-exact-active {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}

.main-view {
  min-height: 80vh;
}

#footer {
  grid-template: 'footer';
  border: 2px solid rosybrown;
  height: 10vh;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0px;
  opacity: 0.9;
}
</style>
