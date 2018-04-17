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
    };
  },
  watch: {
    latestElectionVotes(value) {
      this.votes = [...value];
    },
  },
  mounted() {
    // We should check if there is any looser already, this means they had 0 votes since the start
  },
  components: { Candidate },
  computed: {
    totalVotes() {
      return this.votes
        .map(vote => vote.candidates)
        .reduce((prev, curr) => [...prev, ...curr]).length;
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
      this.history.push({ votes: [...this.votes], results: [...this.results] });
      // Get winner if there is any
      const winner = this.getWinner(this.step);
      if (winner.length) {
        console.log('winner', winner);
        return;
      }
      // Get the looser
      const looser = this.getLooser(this.step);
      this.loosers.push(looser);
      // Get next choice votes from looser
      const lostVotes = this.retrieveVotes(looser, this.step);
      const newVotes = this.getFollowingVotes(lostVotes);

      console.log('lost votes', lostVotes);

      console.log('new votes', newVotes);

      this.votes = this.votes.map(votes => {
        const newVote = newVotes.find(vote => vote.id === votes.id);
        if (!newVote) return votes;
        return newVote;
      });

      this.step += 1;
    },
    getFollowingVotes(lostVotes) {
      return lostVotes.map(votes => {
        const [lost, ...candidates] = votes.candidates;
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
        const prevVotes = this.getVotes(prev.votes);
        const currVotes = this.getVotes(current.votes);
        // Do not take into account candidates with 0 Votes
        if (prevVotes === 0) return current;
        if (currVotes === 0) return prev;
        // Get the lowest voted candidate
        return prevVotes < currVotes ? prev : current;
      }).candidate;
    },
    retrieveVotes(candidate) {
      return this.votes.filter(votes => {
        return votes.candidates[0].id === candidate.id;
      });
    },
    getVotes(votes) {
      return votes.filter(({ arrayIndex }) => arrayIndex === 0).length;
    },
    getCandidateVotes(id, choice) {
      return this.results.filter(
        result => result.candidate.id === id && result.arrayIndex === choice,
      );
    },
    isMajority(totalVotes, votes) {
      return votes >= totalVotes / 2;
    },
  },
};
</script>

<style>

</style>