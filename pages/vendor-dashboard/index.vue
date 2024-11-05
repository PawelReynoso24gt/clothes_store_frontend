<template>
    <div>
        <!-- Banner Area -->
        <section id="common_banner_one">
            <div class="container ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="common_banner_text">
                            <h2>{{ this.title }}</h2>
                            <b-breadcrumb :items="breadcrumbItems" class="bg-transparent"></b-breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- My Account-Area -->
        <section id="vendor_area" class="ptb-100">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-3 col-lg-3">
                        <!-- Nav tabs -->
                        <div class="dashboard_tab_button">
                            <b-navbar-nav>
                                <!-- Solamente mostrar Envío Client -->
                                <b-nav-item to="/vendor-dashboard/orderClient">
                                    <i class="fas fa-shopping-bag"></i> PEDIDOS
                                </b-nav-item>
                            </b-navbar-nav>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-9 col-lg-9">
                        <!-- Contenido relacionado con el dashboard de Vendor -->
                        <div class="dashboard_content">
                            <div id="vendor_dashboard">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'VendorDashboard',
    data() {
        return {
            title: 'Vendor',

            // Breadcrumb Items Data
            breadcrumbItems: [
                {
                    text: 'Home',
                    to: '/'
                },
                {
                    text: 'Vendor',
                }
            ],
            options: {
                chart: {
                    id: 'linechart'
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series1: [
                {
                    name: 'Total Revenue',
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                },
                {
                    name: 'Point movments',
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                },
                {
                    name: 'Revenue',
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                }
            ],
        };
    },
    mounted() {
        // For scroll page top for every Route
        window.scrollTo(0, 0);
    },
    // Page head() Title, description for SEO
    head() {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Vendor Dashboard - AndShop Ecommerce Vue js, Nuxt js Template'
                }
            ]
        };
    }
};
</script>
