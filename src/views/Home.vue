<template>
  <div class="home">
    <div>{{ user }}</div>
    <img :src="user.picture" />
  </div>
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
