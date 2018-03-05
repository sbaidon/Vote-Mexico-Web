<template>
  <section id="current-election">
    <election-card :election="currentElection">
      </election-card>
  </section>
</template>
<script>
import gql from 'graphql-tag';
import ElectionCard from '../components/ElectionCard.vue';

export default {
  name: 'current-election',
  components: { ElectionCard },
  data() {
    return {
      currentElection: {},
      elections: [],
      candidates: []
    };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
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