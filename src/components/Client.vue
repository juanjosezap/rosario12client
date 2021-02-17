<template>
  <div v-if="currentClient" class="edit-form">
    <sui-form>
      <sui-header dividing>Editar Cliente</sui-header>
      <sui-form-field>
        <label>Nombre</label>
        <input placeholder="Nombre" type="text" 
          required
          v-model="currentClient.nombre" />
      </sui-form-field>

      <sui-form-field>
        <label>CUIT</label>
        <input placeholder="CUIT" type="text" 
          required
          v-model="currentClient.cuit" />
      </sui-form-field>

      <sui-form-field>
        <sui-checkbox label="Sujeto exento" required toggle v-model="currentClient.sujetoExento" />
      </sui-form-field>

      <sui-form-field>
        <label>Direccion</label>
        <input placeholder="Direccion" type="text" 
          required
          v-model="currentClient.dir" />
      </sui-form-field>

      <sui-form-field>
        <label>Telefono</label>
        <input placeholder="Telefono" type="text" 
          required
          v-model="currentClient.tel" />
      </sui-form-field>

      <sui-form-field>
        <label>Mail</label>
        <input placeholder="Mail" type="text" 
          required
          v-model="currentClient.mail" />
      </sui-form-field>
    </sui-form>
    <sui-divider />
    <sui-button  content="Borrar"  @click="deleteClient" />
    
    <sui-button  content="Actualizar"  @click="updateClient" />
    
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Client...</p>
  </div>
</template>

<script>
import ClientDataService from "../services/ClientDataService";

export default {
  name: "client",
  data() {
    return {
      currentClient: null,
      message: ''
    };
  },
  methods: {
    getClient(id) {
      ClientDataService.get(id)
        .then(response => {
          this.currentClient = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateClient() {
      ClientDataService.update(this.currentClient._id, this.currentClient)
        .then(response => {
          console.log(response.data);
          this.message = 'The client was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteClient() {
      ClientDataService.delete(this.currentClient._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "clients" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getClient(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
