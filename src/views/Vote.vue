<template>
  <section id="current-election">
    <div class="candidates">
      <candidate-card @candidate-selected="pushCandidate" v-for="(candidate, index) in shuffledCandidates" :candidate="candidate" :key="index">
      </candidate-card>
      <button @click.prevent="castVote">Cast Vote</button>
    </div>
  </section>
</template>
<script>
import gql from 'graphql-tag';
import CandidateCard from '../components/CandidateCard.vue';

export default {
  name: 'vote',
  components: { CandidateCard },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      candidates: [],
      selectedCandidates: [],
      castedVote: {}
    };
  },
  computed: {
    shuffledCandidates() {
      return this.shuffle(this.candidates);
    }
  },
  apollo: {
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
    pushCandidate(candidate) {
      this.selectedCandidates.push(candidate.id);
    },
    async castVote() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($candidates: [ID]!) {
              castVote(candidates: $candidates) {
                userId
                candidates {
                  id
                }
                election {
                  possibleVotes
                  id
                }
                arrayIndex
              }
            }
          `,
          // Parameters
          variables: {
            candidates: this.selectedCandidates
          }
        })
        .then(data => {
          this.castedVote = data;
        })
        .catch(error => {
          console.error(error);
          console.log(error.message);
        });
    },
    shuffle(array) {
      const copy = [...array];
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = copy[currentIndex];
        copy[currentIndex] = copy[randomIndex];
        copy[randomIndex] = temporaryValue;
      }
      return copy;
    }
  }
};
</script>

<style>
#current-election {
  padding: 2rem;
}

.candidates {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>