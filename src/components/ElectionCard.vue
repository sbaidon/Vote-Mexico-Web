<template>
    <div class="election-card">
        <p>Possible votes: {{ election.possibleVotes }}</p>
        <p>Started on: {{ startDate }}</p>
        <p>Will finish on: {{ finishDate }}</p>
        <div class="vote" @click="goToVote">Vote</div>
    </div>
</template>

<script>
export default {
  name: 'election-card',
  props: {
    election: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    startDate() {
      return new Date(this.election.started);
    },
    finishDate() {
      return new Date(this.election.finished);
    }
  },
  methods: {
    goToVote() {
      const { id } = this.election;
      this.$router.push({ name: 'vote' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.election-card {
  border: 1px solid salmon;
  padding: 1rem;
  display: flex;
}

.election-card * {
  flex: 1 0 25%;
}

.vote {
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: salmon;
}
</style>
