<template>
    <div class="candidate">
        <p>{{ candidate.name }}</p>
        <img :src="candidate.image" />
        <div class="vote" @click="select">Select</div>
    </div>
</template>

<script>
export default {
  name: 'candidate',
  props: {
    candidate: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    select() {
      this.$emit('candidate-selected', this.candidate);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.candidate {
  border: 1px solid salmon;
  padding: 1rem;
  display: grid;
  justify-content: center;
  align-content: center;
}

.candidate img {
  height: 500px;
}

.vote {
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: salmon;
}
</style>
