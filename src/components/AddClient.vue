<template>
  <div class="submit-form">
    <sui-form v-if="!submitted">
      <sui-header dividing>Nuevo Cliente</sui-header>
      <sui-form-field>
        <label>Nombre</label>
        <input placeholder="Nombre" type="text" 
          required
          v-model="client.nombre" />
      </sui-form-field>

      <sui-form-field>
        <label>CUIT</label>
        <input placeholder="CUIT" type="text" 
          required
          v-model="client.cuit" />
      </sui-form-field>

      <sui-form-field>
        <sui-checkbox label="Sujeto exento" required toggle v-model="client.sujetoExento" />
      </sui-form-field>

      <sui-form-field>
        <label>Direccion</label>
        <input placeholder="Direccion" type="text" 
          required
          v-model="client.dir" />
      </sui-form-field>

      <sui-form-field>
        <label>Telefono</label>
        <input placeholder="Telefono" type="text" 
          required
          v-model="client.tel" />
      </sui-form-field>

      <sui-form-field>
        <label>Mail</label>
        <input placeholder="Mail" type="text" 
          required
          v-model="client.mail" />
      </sui-form-field>
<!-- 
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required
          v-model="client.nombre"
          name="nombre"
        />
      </div>

      <div class="form-group">
        <label for="cuit">CUIT</label>
        <input
          class="form-control"
          id="cuit"
          required
          v-model="client.cuit"
          name="cuit"
        />
      </div>

      <div class="form-group">
        <label for="sujetoExento">Sujeto Exento</label>
        <input
          class="form-control"
          id="sujetoExento"
          required
          v-model="client.sujetoExento"
          name="sujetoExento"
          type="checkbox"
        />
        <sui-checkbox label="Sujeto exento" required toggle v-model="this.order.cliente.sujetoExento" /> 
      </div>

      <div class="form-group">
        <label for="dir">Direcci'on</label>
        <input
          class="form-control"
          id="dir"
          required
          v-model="client.dir"
          name="dir"
        />
      </div>

      <div class="form-group">
        <label for="tel">Tel'efono</label>
        <input
          class="form-control"
          id="tel"
          required
          v-model="client.tel"
          name="tel"
        />
      </div>

      <div class="form-group">
        <label for="mail">Mail</label>
        <input
          class="form-control"
          id="mail"
          required
          v-model="client.mail"
          name="mail"
        />
      </div> -->
      <sui-button  content="Guardar"  @click.prevent="saveClient" />
    </sui-form>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <sui-button  content="Crear otro"  @click="newClient" />
    </div>
  </div>
</template>

<script>
import ClientDataService from "../services/ClientDataService";

export default {
  name: "add-client",
  data() {
    return {
      client: {
        id: null,
        nombre: "",
        cuit: "",
        sujetoExento: false,
        dir: "",
        tel: "",
        mail: ""
      },
      submitted: false
    };
  },
  methods: {
    saveClient() {
      var data = {
        nombre: this.client.nombre,
        cuit: this.client.cuit,
        sujetoExento: this.client.sujetoExento,
        dir: this.client.dir,
        tel: this.client.tel,
        mail: this.client.mail
      };
      ClientDataService.create(data)
        .then(response => {
          this.client.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newClient() {
      this.submitted = false;
      this.client = {};
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
