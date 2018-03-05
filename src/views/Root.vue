<template>
  <div class="main"> 
      <section id="hero" class="washed-blue">
          <div class="hero__item">
            <h1 class="f1 black">Vota por Mexico</h1>
          </div>
          <div class="hero__item--controls"> 
            <a @click="login" class="no-underline white bg-animate bg-green hover-bg-white hover-green ba b--green tc pa2">
              <span class="f6">Login</span>
            </a>
           <a @click="login" class="no-underline white bg-animate bg-green hover-bg-white hover-green ba b--green tc pa2"> 
              <span class="f6">Registrate</span>
            </a>
          </div>
      </section>
  </div>
</template>

<script>
import flag from '../assets/Flag_of_Mexico.svg';
import auth from '../auth';

export default {
  name: 'root',
  data() {
    return {
      flag
    };
  },
  methods: {
    login() {
      auth.login();
    }
  }
};
</script>

<style scoped>
.main {
  display: grid;
  padding: 6em;
  grid-template-columns: 500px;
  justify-items: center;
  justify-content: center;
  grid-gap: 1em;
  min-height: 80vh;
}

#hero {
  display: grid;
  grid-gap: 1em;
}

.hero__item {
  display: grid;
}

.hero__item h1 {
  font-size: 6rem;
  padding: 10px;
  text-transform: uppercase;
  margin: 0px;
}

.hero__item--signup {
  display: grid;
  padding: 2em;
}

.hero__item--controls {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1em;
  align-self: end;
}
</style>
