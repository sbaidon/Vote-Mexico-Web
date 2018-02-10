<template>
  <div class="spinner">
    loading...
  </div>
</template>

<script>
import auth from '../auth';

export default {
  name: 'callback',
  data() {
    return {
      auth
    };
  },
  async mounted() {
    const { authenticated } = await this.auth.handleAuthentication();
    if (authenticated) this.$router.push('/');
  }
};
</script>
