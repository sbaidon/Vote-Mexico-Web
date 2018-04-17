<template>
    <div class="election">
        <p>Possible votes: {{ election.possibleVotes }}</p>
        <p>Started on: {{ startDate }}</p>
        <p>Will finish on: {{ finishDate }}</p>
        <div v-if="!hasVoted" class="vote" @click="goToVote">Vote</div>
        <div v-else class="results" @click="goToVotes">See my votes</div>
    </div>
</template>

<script>
export default {
  name: 'election',
  props: {
    election: {
      type: Object
    },
    hasVoted: {
      type: Boolean
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
      this.$router.push({ name: 'vote' });
    },
    goToVotes() {
      this.$router.push({ name: 'votes' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.election {
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
