<template>
  <section class="home">
  </section>
</template>
<script>
// @ is an alias to /src
import gql from 'graphql-tag';

export default {
  name: 'home',
  data() {
    return {
      user: {}
    };
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
  }
};
</script>
<style>
.menu {
  display: flex;
  justify-content: space-around;
  margin: 0px;
  padding: 1rem;
}

.menu > li {
  list-style-type: none;
  padding: 2rem;
  flex: 1;
  text-align: center;
}

.menu > li.active {
  border-bottom: 2px solid #42b983;
}
</style>