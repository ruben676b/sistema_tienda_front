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
            <h5 class="card-title mb-0">Gráfico de Ventas por Día</h5>
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
                  <router-link to="/dashboard/products">
                    <a class="dropdown-item">Lista de Productos</a>
                  </router-link>
                </li>
                <li>
                  <router-link to="/dashboard/addProduct">
                    <a class="dropdown-item">Añadir Producto</a>
                  </router-link>
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

      // Ordenar las ventas por fecha
      const sortedSales = this.dashboardData.topVentasHoy.sort(
        (a, b) => new Date(a.Fecha) - new Date(b.Fecha)
      );

      // Función para obtener el nombre del día de la semana
      const getDayName = (dateString) => {
        const days = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ];
        const date = new Date(dateString);
        return days[date.getDay()];
      };

      // Preparar los datos para el gráfico
      const labels = sortedSales.map((sale) => getDayName(sale.Fecha));
      const data = sortedSales.map((sale) => parseFloat(sale.TotalVentas));

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Ventas Totales",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Día de la semana",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Total de Ventas (S/.)",
              },
            },
          },
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Ventas: S/. ${context.parsed.y.toFixed(2)}`;
                },
                title: function (tooltipItems) {
                  const date = new Date(
                    sortedSales[tooltipItems[0].dataIndex].Fecha
                  );
                  return `${getDayName(date)} - ${date.toLocaleDateString()}`;
                },
              },
            },
          },
        },
      });
    },
  },
};
</script>
