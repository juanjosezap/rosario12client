<template>
    <b-form @submit.prevent="updateClient">
        <h4>Editar cliente</h4>
        <b-form-group
                id="input-group-1"
                label-for="input-1"
                label="Nombre" 
            >
                <b-form-input
                    id="input-1"
                    v-model="client.nombre"
                    placeholder="Nombre"
                    required
                    ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label-for="input-2"
                label="CUIT"
            >
                <b-form-input
                    id="input-2"
                    v-model="client.cuit"
                    placeholder="CUIT"
                    required
                    ></b-form-input>
            </b-form-group>
           <b-form-group
                id="input-group-3"
                label-for="input-3"
                content-cols-sm
            >
                <b-form-checkbox id="input-3" v-model="client.sujetoExento" 
                    value="true"
                    unchecked-value="false"
                    inline
                >Sujeto Exento</b-form-checkbox>
                <b-form-checkbox 
                    id="input-ri" 
                    v-model="client.responsableInscripto"
                    value="true"
                    unchecked-value="false"
                    inline
                    >IVA Responsable Inscripto</b-form-checkbox>
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label-for="input-4"
                label="Direccion"
            >
                <b-form-input
                    id="input-4"
                    v-model="client.dir"
                    required
                    ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-5"
                label-for="input-5"
                label="Telefono"
            >
                <b-form-input 
                    id="input-5"
                    v-model="client.tel"
                    required
                    ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-6"
                label-for="input-6"
                label="Mail"
            >
                <b-form-input
                    type="email"
                    id="input-6"
                    v-model="client.mail"
                    required
                    ></b-form-input>
            </b-form-group>
            <b-button-group>
                <b-button type="submit" variant="primary">Guardar</b-button>
                <b-button  variant="danger" @click="deleteClient">Borrar</b-button>
            </b-button-group>
    </b-form>
</template>

<script>
import ClientDataService from "../services/ClientDataService";
export default {
    name: "client",
    data() {
        return {
            client: null
        }
    },
    methods: {
        getClient(id) {
            ClientDataService.get(id)
            .then(response => {
                this.client = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },

        updateClient() {
            ClientDataService.update(this.client._id, this.client)
                .then(response => {
                    console.log(response)
                    this.$router.push({ name: "clients" });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteClient() {
            ClientDataService.delete(this.client._id)
                .then(response => {
                    console.log(response)
                    this.$router.push({ name: "clients" });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
  mounted() {
    this.getClient(this.$route.params.id);
  }
}
</script>
