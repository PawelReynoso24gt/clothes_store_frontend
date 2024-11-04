<template>
    <div>
        <!-- My Account-Area -->
        <section id="vendor_area" class="ptb-100">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-3 col-lg-3">
                        <div class="dashboard_tab_button">
                            <b-navbar-nav>
                                <b-nav-item to="/vendor-dashboard/"><i class="fas fa-tachometer-alt"></i>Dashboard</b-nav-item>
                                <b-nav-item to="/vendor-dashboard/product"><i class="fas fa-shopping-cart"></i>Product</b-nav-item>
                                <b-nav-item to="/vendor-dashboard/order"><i class="fas fa-shopping-bag"></i>Envío</b-nav-item>
                                <b-nav-item to="/vendor-dashboard/orderClient"><i class="fas fa-shopping-bag"></i>Envío CLiente</b-nav-item>
                                <b-nav-item to="/vendor-dashboard/profile"><i class="far fa-id-badge"></i>Profile</b-nav-item>
                                <b-nav-item to="/vendor-dashboard/add-product"><i class="fas fa-cart-plus"></i>Add Product</b-nav-item>
                                <b-nav-item to="/vendor-dashboard/setting"><i class="fas fa-user-cog"></i>Setting</b-nav-item>
                            </b-navbar-nav>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-9 col-lg-9">
                        <div class="dashboard_content">
                            <div id="all_order">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="vendor_order_boxed">
                                            <h4>Envíos</h4>
                                            <div class="table-responsive">
                                                <table class="table pending_table">
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th scope="col">Envío Id</th>
                                                            <th scope="col">Cliente</th>
                                                            <th scope="col">Fecha envío</th>
                                                            <th scope="col">Estado</th>
                                                            <th scope="col">Total</th>
                                                            <th scope="col">Detalles</th>
                                                        </tr> 
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="envio in envios" :key="envio.idEnvio">
                                                            <td>{{ envio.idEnvio }}</td>
                                                            <td>{{ envio.venta.cliente.nombre }}</td>
                                                            <td>{{ envio.fechaEnvio }}</td>
                                                            <td>{{ envio.estado === 1 ? 'Enviado' : 'Devuelto' }}</td>
                                                            <td>{{ envio.venta.total }}</td>
                                                            <td>
                                                                <button @click="verDetalles(envio.idEnvio)" class="btn btn-info">Detalles</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modal para mostrar detalles de los productos -->
                <div v-if="showModal" class="modal" @click.self="cerrarModal">
            <div class="modal-contenido">
                <span class="cerrar" @click="cerrarModal">&times;</span>
                <h2>Detalles del Envío</h2>
                <h4>Productos del Envío</h4>
                <div v-for="producto in productos" :key="producto.nombre">
                    <p><strong>Producto:</strong> {{ producto.nombre }}</p>
                    <p><strong>Descripción:</strong> {{ producto.descripcion }}</p>
                    <p><strong>Precio:</strong> {{ producto.precio }}</p>
                    <p><strong>Cantidad:</strong> {{ producto.cantidad }}</p>
                    <p><strong>Subtotal:</strong> {{ producto.subtotal }}</p>
                    <hr />
                </div>
                <button class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
                <button class="btn btn-primary" @click="devolverProducto">Devolver</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VendorDashboard',
    data() {
        return {
            envios: [],
            showModal: false,
            productos: [], // Datos para almacenar los productos del envío
        };
    },
    mounted() {
        // Fetch envíos from the API when the component is mounted
        axios.get('http://localhost:5000/envios')
            .then(response => {
                this.envios = response.data;
            })
            .catch(error => {
                console.error("Error fetching the envíos:", error);
            });

        // Scroll page top for every route
        window.scrollTo(0, 0);
    },
    methods: {
        // Función para obtener los detalles del envío
        verDetalles(idEnvio) {
            axios.get(`http://localhost:5000/envios/${idEnvio}/productos`)
                .then(response => {
                    this.productos = response.data.productos;
                    this.showModal = true; // Mostrar el modal con los productos
                })
                .catch(error => {
                    console.error(`Error fetching productos for envio ${idEnvio}:`, error);
                });
        },
        cerrarModal() {
            this.showModal = false; // Cerrar el modal
            this.productos = []; // Limpiar los productos al cerrar el modal
        },
        // Función para manejar la devolución de productos
        devolverProducto() {
            const confirmDevolver = confirm("¿Está seguro que desea devolver este envío?");
            if (confirmDevolver) {
                // Aquí puedes agregar la lógica de devolución cuando estés listo.
                console.log("Devolución confirmada. (Pendiente de implementar)");
            } else {
                console.log("Devolución cancelada.");
            }
        }
    }
}
</script>


<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro */
    z-index: 1000; /* Asegúrate de que el modal esté por encima del contenido */
}

.modal-contenido {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%; /* Ajusta el tamaño del modal */
    max-width: 500px; /* Tamaño máximo del modal */
    position: relative;
}

.cerrar {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
}

.btn-secondary {
    margin-top: 20px;
}
</style>
