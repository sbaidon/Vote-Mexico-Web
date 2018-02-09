
<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Auth0 - Vue</a>

          <router-link :to="'/'"
            class="btn btn-primary btn-margin">
              Home
          </router-link>

          <button
            class="btn btn-primary btn-margin"
            v-if="!auth.authenticated"
            @click="login()">
              Log In
          </button>

          <button
            class="btn btn-primary btn-margin"
            v-if="auth.authenticated"
            @click="logout()">
              Log Out
          </button>

        </div>
      </div>
    </nav>

    <div class="container">
    </div>
  </div>
</template>

<script>
import AuthService from '../auth';

const auth = new AuthService();
const { login, logout, authNotifier } = auth;

export default {
  name: 'app',
  data() {
    return {
      auth
    };
  },
  created() {
    authNotifier.on('authChange', ({ authenticated }) => {
      if (authenticated) this.$router.push('/home');
    });
  },
  methods: {
    login,
    logout
  }
};
</script>

<style>

</style>
