<template>
  <section id="current-election">
    <election :election="currentElection" :hasVoted="hasVoted">
      </election>
  </section>
</template>
<script>
import gql from 'graphql-tag';
import Election from '../components/Election.vue';

export default {
  name: 'current-election',
  components: { Election },
  data() {
    return {
      currentElection: {},
      elections: [],
      hasVoted: true
    };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    hasVoted: gql`
      {
        hasVoted
      }
    `,
    candidates: gql`
      {
        candidates {
          email
          id
          parties
          name
          image
        }
      }
    `,
    currentElection: gql`
      {
        currentElection {
          possibleVotes
          id
          votes {
            userId
            candidates {
              email
              id
              parties
              name
              image
            }
            arrayIndex
          }
          started
          finished
        }
      }
    `,
    elections: gql`
      {
        elections {
          possibleVotes
          id
          votes {
            userId
            candidates {
              email
              id
              parties
              name
              image
            }
            arrayIndex
          }
          started
          finished
        }
      }
    `
  },
  methods: {
    async createElection() {}
  }
};
</script>

<style>
#current-election {
  padding: 2rem;
}
</style>