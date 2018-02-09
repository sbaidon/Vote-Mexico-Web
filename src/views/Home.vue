<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>{{ user }}</div>
    <img :src="user.picture" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import gql from 'graphql-tag';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
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
