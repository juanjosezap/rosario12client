<template>
    <b-container>
        <b-row>
            <b-col>
                <b-input-group prepend="Cliente" class="mt-3">
                    <b-form-input placeholder="Buscar por nombre" trim v-model="nombre"></b-form-input>
                    <b-input-group-append>
                    <b-button variant="info" @click="searchClient">Buscar</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <hr/>
        </b-row>
        <b-row>
            <b-col>
                <b-table 
                    hover 
                    :items="clients" 
                    :fields="fields" 
                    head-variant="light" 
                    responsive="sm"
                    selectable
                    :select-mode="selectMode"
                    @row-selected="onRowSelected"
                    ></b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ClientDataService from "../services/ClientDataService";
export default {
  name: "clients-list",
  data() {
    return {
        fields: ['nombre', 'cuit', 'tel', 'mail'],
        clients: [],
        currentClient: null,
        currentIndex: -1,
        selectMode: 'single',
        nombre: ""
    };
  },
  methods: {
    onRowSelected(items) {
        var id_client = items[0]._id;
        this.$router.push({ path: `/clients/${id_client}` })
    },
    retrieveClients() {
      ClientDataService.getAll()
        .then(response => {
          this.clients = response.data;
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
    
    searchClient() {
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
