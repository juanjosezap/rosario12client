<template>
  <div>
      <sui-input placeholder="" icon="search" v-model="date" type="date" /> 
      <sui-button @click="getPauta">Buscar</sui-button>
      <sui-divider />
      <b-table :items='items' :fields="fields" ></b-table>
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
            ]
        }
    },
    mounted() {
        this.getPauta()

    },
    methods: {
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