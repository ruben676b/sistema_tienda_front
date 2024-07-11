<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-sm-6 col-12 d-flex">
        <div class="dash-count">
          <div class="dash-counts">
            <h4>{{ dashboardData ? dashboardData.totalClientes : "0" }}</h4>
            <h5>Clientes</h5>
          </div>
          <div class="dash-imgs">
            <i data-feather="user"></i>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 d-flex">
        <div class="dash-count das1">
          <div class="dash-counts">
            <h4>{{ dashboardData ? dashboardData.totalProveedores : "0" }}</h4>
            <h5>Proveedores</h5>
          </div>
          <div class="dash-imgs">
            <i data-feather="user-check"></i>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-sm-6 col-12 d-flex">
        <div class="dash-count das3">
          <div class="dash-counts">
            <h4>
              {{ dashboardData ? dashboardData.totalFacturasVenta : "0" }}
            </h4>
            <h5>Facturas de ventas</h5>
          </div>
          <div class="dash-imgs">
            <i data-feather="file"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-7 col-sm-12 col-12 d-flex">
        <div class="card flex-fill">
          <div
            class="card-header pb-0 d-flex justify-content-between align-items-center"
          >
            <h5 class="card-title mb-0">Gráfico de top Ventas de hoy dia</h5>
          </div>
          <div class="card-body">
            <canvas id="sales_charts"></canvas>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-sm-12 col-12 d-flex">
        <div class="card flex-fill">
          <div
            class="card-header pb-0 d-flex justify-content-between align-items-center"
          >
            <h4 class="card-title mb-0">Productos recientemente añadidos</h4>
            <div class="dropdown">
              <a
                href="javascript:void(0);"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                class="dropset"
              >
                <i class="fa fa-ellipsis-v"></i>
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a href="productlist.html" class="dropdown-item"
                    >Lista de Productos</a
                  >
                </li>
                <li>
                  <a href="addproduct.html" class="dropdown-item"
                    >Añadir Producto</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive dataview">
              <table class="table datatable">
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Producto</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      producto, index
                    ) in dashboardData?.productosRecientes || []"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td class="productimgname">
                      <a href="productlist.html" class="product-img">
                        <img
                          :src="
                            'http://localhost:3000/api/v1/uploads/productos/' +
                            producto.RutaImagen
                          "
                          alt="product"
                        />
                      </a>
                      <a href="productlist.html">{{ producto.Nombre }}</a>
                    </td>
                    <td>s/.{{ producto.PrecioCompra }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-0">
      <div class="card-body">
        <h4 class="card-title">Productos Expirados</h4>
        <div class="table-responsive dataview">
          <table class="table datatable">
            <thead>
              <tr>
                <th>SNo</th>
                <th>Nombre del producto</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Fecha de expiración</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(producto, index) in dashboardData?.productosExpirados ||
                []"
                :key="index"
              >
                <td>{{ index + 1 }}</td>

                <td class="productimgname">
                  <a class="product-img" href="productlist.html">
                    <img
                      :src="
                        'http://localhost:3000/api/v1/uploads/productos/' +
                        producto.RutaImagen
                      "
                      alt="product"
                    />
                  </a>
                  <a href="productlist.html">{{ producto.Nombre }}</a>
                </td>
                <td>{{ producto.Marca }}</td>
                <td>{{ producto.Categoria }}</td>
                <td>
                  {{ new Date(producto.FechaVencimiento).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "Estadisticas",
  data() {
    return {
      dashboardData: null,
      chart: null,
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/dashboardData/dashboard"
        );
        const data = await response.json();
        if (data.success) {
          this.dashboardData = data.data;
          this.createChart();
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
    createChart() {
      const ctx = document.getElementById("sales_charts");
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.dashboardData.topVentasHoy.map(
            (_, index) => `${index + 1}`
          ),
          datasets: [
            {
              label: "Ventas",
              data: this.dashboardData.topVentasHoy,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: false, // Oculta el eje X
            },
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false, // Oculta la leyenda
            },
          },
        },
      });
    },
  },
};
</script>
