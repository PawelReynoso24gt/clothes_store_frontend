<template>
  <div>
    <component :is="selectedHeader" />
    <transition name="fade" mode="out-in">
      <Nuxt />
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import HeaderA from "@/components/HeaderA.vue";

export default {
  data() {
    return {
      selectedHeader: Header // Header por defecto para usuarios regulares
    };
  },
  created() {
    this.setHeader();
  },
  watch: {
    '$route': 'setHeader' // Para asegurarnos que se actualice el header cuando la ruta cambie
  },
  methods: {
    setHeader() {
      // Determinar el header según el rol guardado en localStorage
      const role = localStorage.getItem("role");
      console.log("Role obtenido del localStorage:", role);
      if (Number(role) === 6) { 
        this.selectedHeader = HeaderA;
      } else {
        this.selectedHeader = Header;
      }
    }
  },
  mounted() {
    window.addEventListener("storage", this.setHeader); // Escuchar cambios en el localStorage

    // For Loading
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 3000);
    });
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.setHeader);
  }
};
</script>
