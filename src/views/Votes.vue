<template>
  <section id="votes">
    <div class="" v-for="(vote, index) in userVotes" :key="index">
        <h1>{{ vote.election.id }}</h1>
        <candidate v-for="(candidate, index) in vote.candidates" :key="index" :candidate="candidate">
            </candidate>
    </div>
  </section>
</template>
<script>
import gql from 'graphql-tag';
import Candidate from '../components/Candidate.vue';

export default {
  name: 'votes',
  components: { Candidate },
  data() {
    return {
      userVotes: []
    };
  },
  apollo: {
    userVotes: gql`
      {
        userVotes {
          candidates {
            id
            email
            parties
            name
            image
          }
          election {
            id
          }
          arrayIndex
        }
      }
    `
  }
};
</script>

<style>
.candidates {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>