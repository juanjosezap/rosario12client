<template>
  <div>
    <b-form-group>
        <b-input-group prepend="Fecha" class="mb-2 mr-sm-2 mb-sm-0" v-on:change="getPauta" >
            <b-form-input id="inline-form-input-fecha-pauta" type="date" v-model="date"></b-form-input>
            <b-button @click="downloadPauta">Descargar</b-button>
        </b-input-group>
        
    </b-form-group>
    <hr/>
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
        outlined></b-table>
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
        downloadPauta () {
            OrderDataService
            .downloadPauta(this.date)
            .then(response => {
                const datePauta = new Date(this.date);
                const fecha = (datePauta.getDate() + 1)  + '-' + (datePauta.getMonth() + 1).toString().padStart(2, '0') + '-' +  datePauta.getFullYear();
                let blob = new Blob([response.data], { type: 'application/pdf' })
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = `PAUTA${fecha}.pdf`
                link.click()
            })
            .catch(e => {
                console.log(e);
            });
        }
    }
}
</script>