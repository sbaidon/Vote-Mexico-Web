
<template>
 <div id="login">
          <button
            class="btn btn-primary btn-margin"
            v-if="!auth.authenticated"
            @click="login()">
              Log In
          </button>

          <button class="btn btn-primary btn-margin" v-if="auth.authenticated" @click="logout()"> 
            Log Out
          </button>
  </div>
</template>

<script>
import auth from '../auth';

export default {
  name: 'app',
  data() {
    return {
      auth
    };
  },
  methods: {
    login() {
      auth.login();
    },
    logout() {
      auth.logout();
    }
  }
};
</script>

<style>

</style>
