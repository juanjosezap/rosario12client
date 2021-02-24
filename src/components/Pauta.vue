<template>
  <div>
    <b-form-group>
        <b-input-group prepend="Fecha" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="inline-form-input-fecha-pauta" type="date" v-model="date"></b-form-input>
            <b-button @click="getPauta">Buscar</b-button>
        </b-input-group>
    </b-form-group>
    <hr/>
    <b-table 
        :items='items' 
        :fields="fields" 
        selectable
        :select-mode="selectMode"
        @row-selected="onRowSelected"></b-table>
  </div>
</template>


<script>
import OrderDataService from "../services/OrderDataService";

export default {
    name: "pauta",
    data() {
        return {
            date: new Date().toISOString().slice(0,10),
            items: [],
            fields: [{
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
                }
            ],
            selectMode: 'single'
        }
    },
    mounted() {
        this.getPauta()

    },
    methods: {
        onRowSelected(items) {
            var id_order = items[0]._id;
            this.$router.push({ path: `/EditOrder/${id_order}` })
        },
        getPauta() {
            OrderDataService.getPauta(this.date)
                .then(response => {
                this.items = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
    }
}
</script>