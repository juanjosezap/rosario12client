<template>
    <div>
        <b-form @submit.prevent="saveOrder" v-if="!submitted">
            <b-form-group>
                <h4>Editar Orden Nro. : {{ order.nro }}</h4>
            </b-form-group>
            <b-form-group
                id="input-group-1"
                label-for="input-1"
                label="Nombre">
                <b-form-input
                    id="input-1"
                    required
                    v-model="order.nombre" />
            </b-form-group>
            <b-form-group 
                id="input-group-2"
                label-for="input-2"
                label="Tarifa">
                <b-form-input
                    id="input-2"
                    required
                    v-model="order.tarifa" />
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label-for="input-3"
                label="Columnas">
                <b-form-input   
                    id="input-3"
                    required
                    v-model="order.col" />
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label-for="input-4"
                label="Alto">
                <b-form-input
                    id="input-4"
                    required
                    v-model="order.alto" />
            </b-form-group>
            <b-form-group
                id="input-group-5"
                label-for="input-5"
                label="Color">
                <b-form-checkbox 
                    id="input-5"
                    v-model="order.color"
                    value="true"
                    unchecked-value="false" />
            </b-form-group>
            <b-form-group
                id="input-group-6"
                label-for="input-6"
                label="Nota">
                <b-form-textarea 
                    rows="3"
                    id="input-6"
                    v-model="order.nota" />
            </b-form-group>
            <hr/>
            <b-card bg-variant="light" title="Cliente">
                
                    <b-form-group
                        label="Nombre:"
                        label-for="nested-client"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                        <b-form-input 
                            id="nested-client" 
                            disabled
                            required
                            v-model="client.nombre"></b-form-input>
                    </b-form-group>      
                    <b-form-group
                        label="CUIT:"
                        label-for="nested-client-cuit"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                        <b-form-input 
                            id="nested-client-cuit" 
                            disabled
                            v-model="client.cuit"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Telefono:"
                        label-for="nested-client-tel"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                        <b-form-input 
                            id="nested-client-tel" 
                            disabled
                            v-model="client.tel"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Mail:"
                        label-for="nested-client-mail"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                        <b-form-input 
                            id="nested-client-mail" 
                            disabled
                            v-model="client.mail"></b-form-input>
                    </b-form-group>
                
                <b-form-group
                    label-cols-sm="3"
                    label-align-sm="right"
                >
                    <b-button @click="openModal">Seleccionar</b-button>  
                </b-form-group>          
            </b-card>
            <hr/>
            <b-card title="Avisos" bg-variant="light">
                <b-form-group
                    label-for="aviso-fecha"
                    label="Fecha"
                >
                    <b-form-input
                        id="aviso-fecha" 
                        type="date"
                        v-model="currentAviso.fecha" />
                </b-form-group>
                <b-form-group
                    label-for="aviso-pagina"
                    label="Pagina"
                >
                    <b-form-input
                        id=aviso-pagina
                        type="number"
                        v-model="currentAviso.pagina"  />
                </b-form-group>
                <b-form-group v-if="currentAviso.index === -1">
                    <b-button @click="addAviso" >Agregar</b-button>  
                </b-form-group>
                <b-form-group v-else>
                    <b-button-group>
                        <b-button @click="editAviso" >Editar</b-button> 
                        <b-button @click="deleteAviso" >Eliminar</b-button> 
                        <b-button @click="cancelAviso" >Cancelar</b-button> 
                    </b-button-group>
                </b-form-group>
                <b-table :items='order.avisos' :fields="this.fields" class='table-sm table-hover' @row-clicked="myRowClickHandler"></b-table>
            </b-card>
            <hr/>
            <b-button-group>
                <b-button type="submit" variant="primary">Guardar</b-button>
                <b-button  variant="danger" @click="deleteOrder">Borrar</b-button>
            </b-button-group>
        </b-form>
        
        <div v-else>
            <h4>Orden editada correctamente!</h4>
            <b-button  @click="goback">Volver</b-button >
        </div>
        <ModalSearchClient v-model="modalOpen" v-on:select-client='selectClient'></ModalSearchClient>

    </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";
import ModalSearchClient from './ModalSearchClient';
export default {
    components: {
        ModalSearchClient
    },
    name: "edit-order",
    data() {
        return {
            order: null,
            client: null,
            currentAviso: {
                fecha: '',
                pagina: null,
                index: -1
            },
            fields: ['fecha', 'pagina'],
            submitted: false,
            modalOpen: false
        }
    },
    methods: {
        getOrder(id) {
            OrderDataService.get(id).then(response => {
                this.order = response.data;
                this.client = response.data.client
                this.order.avisos.forEach(element => {
                    element.fecha = element.fecha.substring(0, 10)
                });
            })
            .catch(e => {
                console.log(e)
            })
        },
        
        openModal(e) {
            e.preventDefault();
            this.modalOpen = !this.modalOpen;
        },

        selectClient(client) {
            this.client = client;
        },

        myRowClickHandler(record, index) {
            console.log(index)
            this.currentAviso.fecha = record.fecha;
            this.currentAviso.pagina = record.pagina;
            this.currentAviso.index = index;
        },
        addAviso(e) {
            e.preventDefault();
            this.order.avisos.push({
                fecha: this.currentAviso.fecha,
                pagina: this.currentAviso.pagina
            });
        },

        cancelAviso(e) {
            e.preventDefault();
            this.currentAviso.fecha = ""
            this.currentAviso.pagina = ""
            this.currentAviso.index = -1;
        },

        editAviso(e) {
            e.preventDefault();
            this.order.avisos[this.currentAviso.index].fecha = this.currentAviso.fecha;
            this.order.avisos[this.currentAviso.index].pagina = this.currentAviso.pagina;
            this.currentAviso.fecha = ""
            this.currentAviso.pagina = ""
            this.currentAviso.index = -1;
        },

        deleteAviso(e) {
            e.preventDefault();
            this.order.avisos.splice(this.currentAviso.index, 1);
            this.currentAviso.fecha = ""
            this.currentAviso.pagina = ""
            this.currentAviso.index = -1;
        },

        saveOrder() {
            this.order.client = this.client
            OrderDataService.update(this.order._id, this.order)
                .then(response => {
                    console.log(response)
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteOrder() {
            OrderDataService.delete(this.order._id)
                .then(response => {
                    console.log(response)
                    this.$router.push('/home');
                })
                .catch(e => {
                    console.log(e);
                });
        },
        goback() {
            this.$router.push('/home');
        }
    },
    mounted() {
        this.getOrder(this.$route.params.id);
    }
}
</script>
