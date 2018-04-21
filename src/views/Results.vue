<template>
  <section id="results">
    <div v-for="(result, index) in results" :key="index">
      <button @click="nextStep">Nex step</button> 
    </div>
  </section>
</template>
<script>
import gql from 'graphql-tag';
import Candidate from '../components/Candidate.vue';

export default {
  name: 'results',
  data() {
    return {
      latestElectionVotes: [],
      votes: [],
      step: 0,
      history: [],
      loosers: [],
      winner: null,
    };
  },
  watch: {
    latestElectionVotes(value) {
      this.votes = [...value];
    },
  },
  components: { Candidate },
  computed: {
    totalVotes() {
      return this.votes.length;
    },
    results() {
      const groupedByCandidate = this.votes.reduce((_, votes) => {
        return votes.candidates.reduce((obj, candidate, arrayIndex) => {
          if (!obj.hasOwnProperty(candidate.id)) {
            obj[candidate.id] = {
              votes: [],
              candidate,
              election: votes.election,
            };
          }
          obj[candidate.id].votes.push({ arrayIndex });
          return obj;
        }, _);
      }, {});

      return Object.values(groupedByCandidate);
    },
  },
  apollo: {
    latestElectionVotes: gql`
      {
        latestElectionVotes {
          id
          userId
          candidates {
            id
            name
            email
            image
          }
          election {
            id
          }
        }
      }
    `,
  },
  methods: {
    getCandidate(candidate, prop) {
      return this.groupedByCandidate[candidate];
    },
    nextStep() {
      if (this.winner) return;

      this.history.push({ votes: [...this.votes], results: [...this.results] });
      // Get winner if there is any
      const [winner] = this.getWinner(this.step);
      if (winner) {
        this.winner = winner;
        console.log('winner', this.winner);
        return;
      }
      // Get the looser
      const looser = this.getLooser();
      this.loosers.push(looser.id);
      // Get next choice votes from looser
      const lostVotes = this.retrieveVotes(looser);
      const newVotes = this.getFollowingVotes(lostVotes);
      this.votes = this.calculateVotes(this.votes, newVotes);
    },
    calculateVotes(prevVotes, newVotes) {
      return prevVotes.map(votes => {
        const newVote = newVotes.find(vote => vote.id === votes.id);
        if (!newVote) return votes;
        return newVote;
      });
    },
    getFollowingVotes(lostVotes) {
      const loosers = [...this.loosers];
      return lostVotes.map(votes => {
        const copy = [...votes.candidates];
        let [next] = copy;
        /* Remaining votes could go to a candidate who lost already */
        while (loosers.includes(next.id)) {
          copy.shift();
          [next] = copy;
          if (!next) break;
        }
        const candidates = [...copy];
        const newVotes = { ...votes, candidates };
        return newVotes;
      });
    },
    getWinner() {
      return this.results
        .filter(result => {
          const votes = this.getVotes(result.votes);
          return this.isMajority(this.totalVotes, votes);
        })
        .map(result => result.candidate);
    },
    getLooser() {
      return this.results.reduce((prev, current) => {
        if (this.loosers.includes(prev.candidate.id)) return current;
        if (this.loosers.includes(current.candidate.id)) return prev;

        const prevVotes = this.getVotes(prev.votes);
        const currVotes = this.getVotes(current.votes);
        // Get the lowest voted candidate
        return prevVotes < currVotes ? prev : current;
      }).candidate;
    },
    retrieveVotes(candidate) {
      if (!candidate) return [];
      return this.votes.filter(votes => {
        return (
          votes.candidates.length && votes.candidates[0].id === candidate.id
        );
      });
    },
    getVotes(votes) {
      return votes.filter(({ arrayIndex }) => arrayIndex === 0).length;
    },
    isMajority(totalVotes, votes) {
      return votes >= totalVotes / 2;
    },
  },
};
</script>

<style>

</style>