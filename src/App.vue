<template>
  <div id="app">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Pauta Página 12</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav  v-if="currentUser">
            <b-nav-item to="/home" >Pauta</b-nav-item>
            <b-nav-item to="/clients">Clientes</b-nav-item>
            <b-nav-item to="/addClient">Nuevo cliente</b-nav-item>
            <b-nav-item to="/addOrder">Nueva orden</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" >
            <b-nav-item-dropdown right v-if="currentUser">
              <template #button-content>
                <em>
                  <font-awesome-icon icon="user" /> {{ currentUser.username }}
                </em>
              </template>
              <b-dropdown-item  to="/profile" href="#">Perfil</b-dropdown-item>
              <b-dropdown-item href @click.prevent="logOut"><font-awesome-icon icon="sign-out-alt" />LogOut</b-dropdown-item>
            </b-nav-item-dropdown>
            <div v-if="!currentUser">
              <b-nav-item to="/login"><font-awesome-icon icon="sign-in-alt" />Login</b-nav-item>
              <b-nav-item to="/register"><font-awesome-icon icon="user-plus" />Sign Up</b-nav-item>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};

</script>
