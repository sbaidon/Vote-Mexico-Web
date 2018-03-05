<template>
    <nav id="nav">
      <figure class="user-image">
        <img :src="user.picture" />
        <figcaption>{{ user.nickname }}</figcaption>
      </figure>
      <router-link class="link" v-for="(route, index) in activeRoutes" :key="index" :to="route.path">{{ route.name | capitalize }}</router-link>
    </nav>
</template>

<script>
import gql from 'graphql-tag';
import { capitalize } from '../filters';

export default {
  name: 'Nav',
  data() {
    return {
      user: {}
    };
  },
  computed: {
    activeRoutes() {
      return this.$router.options.routes.filter(route => route.meta.active);
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    user: gql`
      {
        user {
          nickname
          id
          email
          picture
        }
      }
    `
  },
  filters: {
    capitalize
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  display: grid;
  grid-template-columns: 5fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
  align-content: stretch;
  height: 10vh;
  text-align: center;
  grid-gap: 10px;
  padding: 1em;
}

#nav a {
  font-weight: bold;
  display: grid;
  align-content: center;
}

a {
  display: grid;
  color: #2c3e50;
}

.link {
  text-decoration: none;
}

.user-image {
  text-align: left;
  margin: 0px;
}

.user-image img {
  max-height: 100%;
  border-radius: 50%;
}
</style>
