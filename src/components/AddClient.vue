<template>
    <div>
        <b-form @submit.prevent="saveClient" v-if="!submitted">
            <b-form-group>
                <h4>Nuevo Cliente</h4>
            </b-form-group>
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
                id="input-group-iva"
                label-for="input-iva"
                v-slot="{ ariaDescribedby }"
                label="Condicion IVA" 
                >
                 <b-form-radio-group 
                  v-model="client.iva" 
                  :aria-describedby="ariaDescribedby" required>
                  <b-form-radio value="Responsable Inscripto">Responsable Inscripto</b-form-radio>
                  <b-form-radio value="Sujeto Exento">Sujeto Exento</b-form-radio>
                </b-form-radio-group>
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
            <b-button type="submit" variant="primary">Guardar</b-button>
        </b-form>
        <div v-else>
            <h4>Cliente guardado correctamente!</h4>
            <b-button type="submit" @click="newClient" variant="primary">Crear otro</b-button>
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
        dir: "",
        tel: "",
        mail: "",
        iva: ""
      },
      submitted: false
    };
  },
  methods: {
    saveClient() {
      var data = {
        nombre: this.client.nombre,
        cuit: this.client.cuit,
        dir: this.client.dir,
        tel: this.client.tel,
        mail: this.client.mail,
        iva: this.client.iva
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

