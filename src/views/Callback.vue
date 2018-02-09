<template>
  <div class="spinner">
    loading...
  </div>
</template>

<script>
import AuthService from '../auth';

export default {
  name: 'callback',
  data() {
    return {
      auth: new AuthService()
    };
  },
  mounted() {
    this.auth.handleAuthentication();
    this.auth.authNotifier.on('authChange', ({ authenticated }) => {
      if (authenticated) this.$router.push('/');
    });
  }
};
</script>
