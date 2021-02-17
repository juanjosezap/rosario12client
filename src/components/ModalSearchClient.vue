<template>
    <b-modal v-model="value">
        <h4>Select a Client</h4>
            <sui-modal-description>
                <sui-input placeholder="Search..." icon="search" v-model="nombre" /> 
                <sui-button @click="searchClient">Buscar</sui-button>
                <sui-divider />
                <ul class="list-group">
                    <li class="list-group-item"
                    v-for="(client, index) in clients"
                    :key="index"
                    @click="selectClient(client)"
                    >
                    {{ client.nombre }}
                    </li>
                </ul>
            </sui-modal-description>
        <sui-modal-actions>
            <sui-button @click.native="close">Cancelar</sui-button>
        </sui-modal-actions>
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