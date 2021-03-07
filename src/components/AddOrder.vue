<template>
    <div>
        <b-form @submit.prevent="saveOrder" v-if="!submitted">
            <b-form-group>
                <h4>Nueva Orden</h4>
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
                    v-model="order.tarifa"
                    type="number"
                    step="0.01" 
                    min="0"/>
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label-for="input-3"
                label="Columnas">
                <b-form-input   
                    id="input-3"
                    required
                    v-model="order.col" type="number" min="0" />
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label-for="input-4"
                label="Alto">
                <b-form-input
                    id="input-4"
                    required
                    v-model="order.alto" type="number" min="0" />
            </b-form-group>
            <b-form-group>Total: <strong>$ {{ total }}</strong></b-form-group>
            <b-form-group
                id="input-group-5"
                label-for="input-5"                
                >
                <b-form-checkbox 
                    id="input-5"
                    v-model="order.color"
                    value="true"
                    unchecked-value="false" >Color</b-form-checkbox>                
            </b-form-group>
            <b-form-group
                id="input-group-medio"
                label-for="input-medio"
                label="Medio"
                >
                <b-form-select
                    id="input-medio"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="order.medio"
                    :options="[{ text: 'Rosario 12', value: 'Rosario 12' }, { text: 'Pagina 12', value: 'Pagina 12' }]"
                    :value="'Rosario 12'"
                    
                    ></b-form-select>
            </b-form-group>
            <b-form-group
                id="input-group-6"
                label-for="input-6"
                label="Nota">
                <b-form-textarea 
                    rows="3"
                    id="input-6"
                    v-model="order.notas" />
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
                            v-model="this.order.cliente.nombre"></b-form-input>
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
                            v-model="this.order.cliente.cuit"></b-form-input>
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
                            v-model="this.order.cliente.tel"></b-form-input>
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
                            v-model="this.order.cliente.mail"></b-form-input>
                    </b-form-group>
                    
                    <b-form-group
                        label="IVA:"
                        label-for="nested-client-iva"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                        <b-form-input 
                            id="nested-client-iva" 
                            disabled
                            v-model="this.order.cliente.iva"></b-form-input>
                    </b-form-group>
                
                <b-form-group
                    label-cols-sm="3"
                    label-align-sm="right"
                >
                    <b-button @click="openModal">Seleccionar</b-button>  
                </b-form-group>          
            </b-card>
            <hr/>
            <b-card  :title="avisosTitle" bg-variant="light">
                <b-container>
                    <b-row>
                        <b-col>
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
                                v-if="!edicionNacional"
                            >
                                <b-form-input
                                    id=aviso-pagina
                                    type="number"
                                    v-model="currentAviso.pagina"  />
                            </b-form-group>
                            <b-form-group
                                label-for="aviso-nombre"
                                label="Nombre"
                            >
                                <b-form-input
                                    id="aviso-nombre"
                                    v-model="currentAviso.nombre" />
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
                        </b-col>
                        <b-col>
                            <b-table :items='order.avisos' :fields="this.fields" class='table-sm table-hover' @row-clicked="myRowClickHandler"></b-table>
                        </b-col>
                    </b-row>
                </b-container>
            </b-card>
            <hr/>
            <b-button type="submit">Guardar</b-button>
        </b-form>
        
        <div v-else>
            <h4>Orden creada correctamente!</h4>
            <b-button  @click="newOrder">Crear otra</b-button >
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
    name: "add-order",
    data() {
        return {
            order: {
                id: null,
                nombre: '',
                nro: '',
                col: '',
                alto: '',
                tarifa: '',
                notas: '',
                color: false,
                medio: 'Rosario 12',
                avisos: [],
                cliente: {}
            },
            currentAviso: {
                fecha: '',
                pagina: null,
                nombre: '',
                index: -1
            },
            // fields: ['fecha', 'pagina'],
            submitted: false,
            modalOpen: false
        };
    },
    computed: {
        total: function () {
            return this.order.col * this.order.alto * this.order.tarifa;
        },
        avisosTitle: function () {
            return 'Avisos' + (this.edicionNacional ? " - Edicion Nacional" : "");
        },
        edicionNacional: function () {
            return this.order.medio == 'Pagina 12';
        },
        fields: function() {
            return this.edicionNacional ? ['fecha', 'nombre'] : ['fecha', 'pagina', 'nombre']
        }
    },
    methods: {
        saveOrder() {
            const user = JSON.parse(localStorage.getItem('user'));
            var data = {
                nombre: this.order.nombre,
                nro: this.order.nro,
                col: this.order.col,
                alto: this.order.alto,
                tarifa: this.order.tarifa,
                notas: this.order.notas,
                color: this.order.color,
                medio: this.order.medio,
                avisos: this.order.avisos,
                client: this.order.cliente._id,
                createdBy: user.id
            };

            OrderDataService.create(data)
                .then(response => {
                //this.order.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
                })
                .catch(e => {
                console.log(e);
                });
        },
        newOrder() {
            this.submitted = false;
            this.currentAviso = {
                fecha: '',
                pagina: null,
                nombre: '',
                index: -1
            };
            this.order = {
                id: null,
                nombre: '',
                nro: '',
                col: '',
                alto: '',
                tarifa: '',
                notas: '',
                color: false,
                medio: 'Rosario 12',
                avisos: [],
                cliente: {}
            };
        },

        openModal(e) {
            e.preventDefault();
            this.modalOpen = !this.modalOpen;
        },

        selectClient(client) {
            this.order.cliente = client;
        },
        addAviso(e) {
            e.preventDefault();
            if (this.currentAviso.fecha == "") return;
            if (!this.edicionNacional && this.currentAviso.pagina == null) return;

            this.order.avisos.push({
                fecha: this.currentAviso.fecha,
                pagina: this.currentAviso.pagina,
                nombre: this.currentAviso.nombre.trim()
            });
        },
    
        myRowClickHandler(record, index) {
            console.log(index)
            this.currentAviso.fecha = record.fecha;
            this.currentAviso.pagina = record.pagina;
            this.currentAviso.nombre = record.nombre;
            this.currentAviso.index = index;
        },

        cancelAviso(e) {
            e.preventDefault();
            this.currentAviso.fecha = "";
            this.currentAviso.pagina = "";
            this.currentAviso.nombre = "";
            this.currentAviso.index = -1;
        },

        editAviso(e) {
            e.preventDefault();
            this.order.avisos[this.currentAviso.index].fecha = this.currentAviso.fecha;
            this.order.avisos[this.currentAviso.index].pagina = this.currentAviso.pagina;
            this.order.avisos[this.currentAviso.index].nombre = this.currentAviso.nombre;
            this.currentAviso.fecha = "";
            this.currentAviso.pagina = "";
            this.currentAviso.nombre = "";
            this.currentAviso.index = -1;
        },

        deleteAviso(e) {
            e.preventDefault();
            this.order.avisos.splice(this.currentAviso.index, 1);
            this.currentAviso.fecha = "";
            this.currentAviso.pagina = "";
            this.currentAviso.nombre = "";
            this.currentAviso.index = -1;
        }
    }
}
</script>
