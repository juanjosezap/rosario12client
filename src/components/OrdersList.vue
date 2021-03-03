<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h4>Listado de Ordenes</h4>
                    <hr/>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm>
                    <b-form-group
                        label-for="form-input-nro"
                    >
                        <b-input-group prepend="Nro.">
                            <b-form-input id="form-input-nro" type="number" min="0" v-model="filters.nro" v-on:change="resetGrid" />
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col sm>
                    <b-form-group
                        label-for="form-input-fecha-desde"
                    >
                        <b-input-group prepend="Desde">
                            <b-form-input id="form-input-fecha-desde" type="date" v-model="filters.desde" v-on:change="resetGrid"/>
                        </b-input-group>                                                
                    </b-form-group>                    
                </b-col>
                <b-col sm>
                    <b-form-group
                        label-for="form-input-fecha-hasta"
                    >
                        <b-input-group prepend="Hasta">
                            <b-form-input id="form-input-fecha-hasta" type="date" v-model="filters.hasta" v-on:change="resetGrid"/>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="8">
                    <b-form-group>
                        <b-input-group prepend="Nombre">
                            <b-form-input id="form-input-nombre" type="text" v-model="filters.nombre" v-on:change="resetGrid"/>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col sm="4">
                    <b-form-group
                        id="input-group-medio"
                        label-for="input-medio"
                        >
                        <b-form-select
                            id="input-medio"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            :options="[{ text: '', value: '' }, { text: 'Rosario 12', value: 'Rosario 12' }, { text: 'Pagina 12', value: 'Pagina 12' }]"
                            :value="''"
                            v-model="filters.medio"
                            v-on:change="resetGrid"
                            ></b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row align-v="center">
                <b-col sm="8" align-self="start">
                    <b-input-group class="mt-3">
                        <b-input-group-append>
                            <b-button @click="openModal">Seleccionar Cliente</b-button>
                        </b-input-group-append>
                        <b-form-input id="form-input-cliente" disabled v-model="filters.cliente.nombre" />
                        <b-input-group-append v-if="displayClearClient">
                            <b-button @click="clearClient">Limpiar</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
                <b-col sm="4" align-self="end">
                    <b-button block @click="search" :disabled="!canSearch">Buscar</b-button>
                </b-col>
            </b-row>
        </b-container>
        <hr />
        <b-table 
        :items='items' 
        :fields="fields" 
        selectable
        :select-mode="selectMode"
        @row-selected="onRowSelected"
        fixed
        small
        head-variant="light"
        hover
        outlined/>
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
    name: "orders-list",
    data() {
        return {
            items: [],
            fields: [
                {
                    key: 'nombre',
                    label: 'Nombre'
                },
                {
                    key: 'nro',
                    label: 'Nro'
                },
                {
                    key: 'client.nombre',
                    label: 'Cliente'
                },
                {
                    key: 'medio',
                    label: 'Medio'
                },
                {
                    key: 'col',
                    label: 'Columnas'
                },
                {
                    key: 'alto',
                    label: 'Alto'
                },
                {
                    key: 'tarifa',
                    label: 'Tarifa'
                },
                {
                    key: 'notas',
                    label: 'Notas'
                },
                {
                    key: 'createdBy.username',
                    label: 'Creado por'
                },
                {
                    key: 'createdAt',
                    label: 'Fecha'
                },
                {
                    key: 'updatedBy.username',
                    label: 'Actualizado'
                },
                {
                    key: 'updatedAt',
                    label: 'Fecha'
                }
            ],
            filters: {
                nro: '',
                desde: '',
                hasta: '',
                nombre: '',
                medio: '',
                cliente: {}
            },
            selectMode: 'single',
            modalOpen: false
        }
    },
    computed: {
        displayClearClient: function () {
            return Object.keys(this.filters.cliente).length !== 0;
        },
        formatedFilters: function () {
            return {
                nro: this.filters.nro,
                desde: this.filters.desde,
                hasta: this.filters.hasta,
                nombre: this.filters.nombre,
                medio: this.filters.medio,
                client: this.displayClearClient ? this.filters.cliente._id : ''
            }
        },
        canSearch: function () {
            return this.filters.nro !== "" || 
                    this.filters.desde !== "" || 
                    this.filters.hasta !== "" || 
                    this.filters.nombre !== "" || 
                    this.filters.medio !== "" || 
                    this.displayClearClient
        }
    },
    methods: {
        openModal(e) {
            e.preventDefault();
            this.modalOpen = !this.modalOpen;
        },

        selectClient(client) {
            this.filters.cliente = client;
            this.resetGrid();
        },

        clearClient(){
            this.filters.cliente = {};
            this.resetGrid();
        },

        search() {
            OrderDataService.getorders(this.formatedFilters)
                .then(response => {
                this.items = response.data.map(function(order) {
                    order.nombre = order.nombre.substring(0, 35);
                    order.notas = order.notas.substring(0, 22);
                    order.createdAt = new Date(order.createdAt).toLocaleDateString();
                    order.updatedAt = new Date(order.updatedAt).toLocaleDateString();
                    order.client.nombre = order.client.nombre.substring(0, 35);
                    return order;
                });
            })
            .catch(e => {
                console.log(e);
            });
        },
        resetGrid() {
            this.items = [];
        },
        onRowSelected(items) {
            var id_order = items[0]._id;
            this.$router.push({ path: `/EditOrder/${id_order}` })
        }
    }
}
</script>
