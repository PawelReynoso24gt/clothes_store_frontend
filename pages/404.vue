<template>
  <div>
    <h1>Cerrando Sesión...</h1>
    <p>Por favor, espera mientras redirigimos al inicio de sesión.</p>
  </div>
</template>

<script>
export default {
  name: "LogoutPage",
  mounted() {
    // Lógica de cierre de sesión
    this.logout();
  },
  methods: {
    logout() {
      // Eliminar todos los datos del localStorage
      localStorage.clear();

      // Redirigir al login
      this.$router.push("/login");

      console.log("Sesión cerrada. Redirigiendo al login...");
    },
  },
};
</script>

<style scoped>
div {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #ff4d4f;
}
p {
  color: #555;
}
</style>