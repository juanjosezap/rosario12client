<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by nombre"
          v-model="nombre"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de clientes</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(client, index) in clients"
          :key="index"
          @click="setActiveClient(client, index)"
        >
          {{ client.nombre }}
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllClients">
        Remove All
      </button> -->
    </div>
    <div class="col-md-6">
      <div v-if="currentClient">
        <h4>Client</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentClient.nombre }}
        </div>
        <div>
          <label><strong>CUIT:</strong></label> {{ currentClient.cuit }}
        </div>
        <div>
          <label><strong>Sujeto Exento:</strong></label> {{ currentClient.sujetoExento ? "Si" : "No" }}
        </div>
        <div>
          <label><strong>Direcci'on:</strong></label> {{ currentClient.dir }}
        </div>
        <div>
          <label><strong>Tel'efono:</strong></label> {{ currentClient.tel }}
        </div>
        <div>
          <label><strong>Mail:</strong></label> {{ currentClient.mail }}
        </div>

        <a class="badge badge-warning"
          :href="'/clients/' + currentClient._id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Client...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ClientDataService from "../services/ClientDataService";

export default {
  name: "clients-list",
  data() {
    return {
      clients: [],
      currentClient: null,
      currentIndex: -1,
      nombre: ""
    };
  },
  methods: {
    retrieveClients() {
      ClientDataService.getAll()
        .then(response => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveClients();
      this.currentClient = null;
      this.currentIndex = -1;
    },

    setActiveClient(client, index) {
      this.currentClient = client;
      this.currentIndex = index;
    },

    removeAllClients() {
      ClientDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      ClientDataService.findByNombre(this.nombre)
        .then(response => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveClients();
  }
};
</script>

<style>
.list {
  text-align: left;
  /* max-width: 750px; */
  margin: auto;
}
</style>
