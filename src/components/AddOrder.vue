<template>
  <div class="submit-form">
    <sui-form  v-if="!submitted">
      <sui-header dividing>Nueva Orden</sui-header>
      <sui-form-fields>
        <sui-form-field width="twelve">
          <label>Nombre</label>
          <input placeholder="Nombre" type="text" 
            required
            v-model="order.nombre" />
        </sui-form-field>
        <sui-form-field  width="four">
          <label>Tarifa</label>
          <input placeholder="Tarifa"
            required
            v-model="order.tarifa" />
        </sui-form-field>        
      </sui-form-fields>
      <sui-form-fields inline>
        <sui-form-field width="four">
            <label>Columnas</label>
            <input placeholder="Columnas"
              required
              v-model="order.col" />
        </sui-form-field>
        
        <sui-form-field width="four">
          <label>Alto</label>
          <input placeholder="Alto"
            required
            v-model="order.alto" />
        </sui-form-field>
        <sui-form-field>
          <sui-checkbox label="Color" toggle v-model="order.color" />
        </sui-form-field> 
      </sui-form-fields>
      <sui-form-field>
        <label>Nota</label>
        <textarea placeholder="Nota"
          required rows="3"
          v-model="order.nota" />
      </sui-form-field>
        

      <sui-header dividing>Cliente</sui-header>
       <sui-form-fields inline fields="three">
        <sui-form-field width="twelve">
          <sui-button attached="left" content="Seleccionar"  @click="openModal" />
          <input type="text" placeholder="" disabled v-model="this.order.cliente.nombre" />
        </sui-form-field>
        <sui-form-field >
          <label>CUIT</label>
          <input type="text" placeholder="" disabled v-model="this.order.cliente.cuit"/>
        </sui-form-field>
        <sui-form-field >
          <sui-checkbox label="Sujeto exento" toggle disabled  v-model="this.order.cliente.sujetoExento" />
        </sui-form-field>
      </sui-form-fields>

      <sui-form-fields inline fields="three">
        <sui-form-field width="eleven">
          <label>Direccion</label>
          <input type="text" placeholder="" disabled v-model="this.order.cliente.dir" />
        </sui-form-field>
        <sui-form-field >
          <label>Telefono</label>
          <input type="text" placeholder="" disabled v-model="this.order.cliente.tel" />
        </sui-form-field>
        <sui-form-field >
          <label>Mail</label>
          <input type="text" placeholder="" disabled v-model="this.order.cliente.mail"/>
        </sui-form-field>
      </sui-form-fields>

      <sui-header dividing>Avisos</sui-header>      
      <sui-form-fields fields="three">
        <sui-form-field inline>
          <label>Fecha</label>
          <input placeholder="Fecha" type='date' 
            required
            v-model="currentAviso.fecha" />
        </sui-form-field>
        <sui-form-field inline>
          <label>Pagina</label>
          <input placeholder="Pagina"
            required
            v-model="currentAviso.pagina" />
        </sui-form-field>
        <sui-form-field v-if="currentAviso.index === -1">
          <sui-button @click="addAviso" >Agregar</sui-button>
        </sui-form-field>
        <sui-form-field v-else>
          <sui-button @click="editAviso" >Editar</sui-button>
          <sui-button @click="deleteAviso" >Eliminar</sui-button>
          <sui-button @click="cancelAviso" >Cancelar</sui-button>
        </sui-form-field>
      </sui-form-fields>
      <sui-form-field>
        <b-table :items='order.avisos' :fields="this.fields" class='table-sm table-hover' @row-clicked="myRowClickHandler"></b-table>
      </sui-form-field>
      <sui-button @click="saveOrder" type="submit">Submit</sui-button>
    </sui-form>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newOrder">Add</button>
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
        avisos: [],
        cliente: {}
      },
      currentAviso: {
        fecha: '',
        pagina: null,
        index: -1
      },
      fields: ['fecha', 'pagina'],
      submitted: false,
      modalOpen: false
    };
  },
  methods: {
    saveOrder() {
      var data = {
        nombre: this.order.nombre,
        nro: this.order.nro,
        col: this.order.col,
        alto: this.order.alto,
        tarifa: this.order.tarifa,
        notas: this.order.notas,
        color: this.order.color,
        avisos: this.order.avisos,
        client: this.order.cliente._id
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
      this.currentAviso = {};
      this.order = {};
    },

    addAviso(e) {
      e.preventDefault();
      this.order.avisos.push({
        fecha: this.currentAviso.fecha,
        pagina: this.currentAviso.pagina
      });
    },

    openModal(e) {
      e.preventDefault();
      this.modalOpen = !this.modalOpen;
    },

    selectClient(client) {
      console.log('cliente seleccionado ' + client);
      this.order.cliente = client;
    },
    
    myRowClickHandler(record, index) {
      console.log(index)
      this.currentAviso.fecha = record.fecha;
      this.currentAviso.pagina = record.pagina;
      this.currentAviso.index = index;
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
    }

  }
};
</script>

<style>
.submit-form {
  /* max-width: 300px; */
  margin: auto;
}
</style>
