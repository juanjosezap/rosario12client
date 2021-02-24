<template>
    <b-modal v-model="value" title="Seleccione un cliente" hide-footer>
        <b-form-group>
            <b-input-group prepend="Nombre" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input id="inline-form-input-client" placeholder="Cliente" v-model="nombre"></b-form-input>
              <b-button @click="searchClient">Buscar</b-button>
            </b-input-group>
        </b-form-group>
        <b-form-group>
            <b-list-group>
                <b-list-group-item  v-for="(client, index) in clients"
                    :key="index"
                    @click="selectClient(client)"
                    >
                    {{ client.nombre }}
                </b-list-group-item>
            </b-list-group>
        </b-form-group>
    </b-modal>
</template>

<script>
import ClientDataService from "../services/ClientDataService";
    
export default {
    name: 'ModalSearchClient',
    data() {
        return {
            clients: [],
            currentClient: null,
            nombre: ""
        }
    },
    props: {
        value: {
            required: true
        }
    },
    methods: {
        close() {
            this.$emit("input", !this.value);
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
        },
        selectClient(client) {
            console.log(client)
            this.$emit("select-client", client);
            this.close();
        }       
    }
};
</script>

<style lang="css"></style>