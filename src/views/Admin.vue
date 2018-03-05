<template>
  <section id="admin">
      <form id="create-candidate">
          <h1>Create candidate</h1>
          <label for="email">Email
            <input v-model="email" id="email" type="email" name="email" />
          </label>
          <label for="name">Name
            <input v-model="name" id="name" type="name" name="name" />
          </label>
          <label for="image">Image
            <input v-model="image" id="image" type="text" name="image" />
          </label>
          <label for="parties">
              Parties
          <select v-model="selectedParties" multiple name="parties">
              <option v-for="(party, index) in parties" :key="index" :value="party">{{ party }}</option>
          </select>
          </label>
          <label for="create">
              <button name="create" @click.prevent="createCandidate">Create candidate</button>
          </label>
      </form>
  </section>
</template>

<script>
// @ is an alias to /src
import gql from 'graphql-tag';

export default {
  name: 'admin',
  data() {
    return {
      image: '',
      name: '',
      selectedParties: [],
      email: '',
      parties: [
        'PAN',
        'PRI',
        'PRD',
        'Morena',
        'Movimiento Ciudadano',
        'PT',
        'Partido Verde',
        'Nueva Alianza',
        'Partido Encuentro Social',
        'Independiente'
      ]
    };
  },
  methods: {
    async createElection() {},
    async createCandidate() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $name: String!
              $parties: [String!]!
              $email: String!
              $image: String
            ) {
              createCandidate(
                name: $name
                parties: $parties
                email: $email
                image: $image
              ) {
                email
                id
                parties
                name
                image
              }
            }
          `,
          // Parameters
          variables: {
            name: this.name,
            email: this.email,
            image: this.image,
            parties: this.selectedParties
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
#admin {
  padding: 4em;
}

#create-candidate {
  display: grid;
  grid-gap: 20px;
}
</style>