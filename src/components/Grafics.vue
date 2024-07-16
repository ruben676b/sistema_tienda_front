<template>
  <div>
    <div class="page-header">
      <div class="row">
        <div class="col-sm-12">
          <h3 class="page-title">Dashboard de Análisis</h3>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="form-group">
        <div class="order-list">
          <div class="orderid">
            <h4 for="tipoVisualizacion">Tipo de Visualización</h4>
          </div>
        </div>
        <select
          class="form-control"
          id="tipoVisualizacion"
          v-model="tipoVisualizacion"
        >
          <option value="">
            Seleccione el tipo de datos que quiere visualizar:
          </option>
          <option value="ventas">Ventas</option>
          <option value="productos">Productos más vendidos</option>
          <option value="clientes">Tipos de Clientes</option>
          <option value="categorias">Productos por Categoría</option>
          <option value="devoluciones">Devoluciones</option>
          <option value="vendedores">Top Vendedores</option>
        </select>
      </div>
    </div>
    <div v-if="tipoVisualizacion === 'ventas'" class="col-6 mt-3">
      <select class="form-control" v-model="periodoVentas">
        <option value="dia">Por Día</option>
        <option value="mes">Por Mes</option>
        <option value="anio">Por Año</option>
      </select>
    </div>
    <div v-if="tipoVisualizacion === 'vendedores'" class="col-6 mt-3">
      <select class="form-control" v-model="periodoVendedores">
        <option value="7dias">Últimos 7 días</option>
        <option value="4semanas">Últimas 4 semanas</option>
        <option value="mesActual">Este mes</option>
        <option value="anioActual">Este año</option>
      </select>
    </div>
    <div class="row mt-4">
      <div
        v-for="(chart, index) in chartConfigs"
        :key="index"
        class="col-md-6 mb-4"
      >
        <div class="card">
          <div class="card-header">
            <div class="card-title">{{ chart.title }}</div>
          </div>
          <div class="card-body">
            <canvas :id="chart.id" class="h-300"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

export default {
  data() {
    return {
      tipoVisualizacion: "",
      periodoVentas: "dia",
      periodoVendedores: "7dias",
      charts: {},
      chartConfigs: [
        { id: "chartBar", title: "Gráfico de Barras", type: "bar" },
        { id: "chartLine", title: "Gráfico de Línea", type: "line" },
        { id: "chartPie", title: "Gráfico Circular", type: "pie" },
        { id: "chartDoughnut", title: "Gráfico de Anillo", type: "doughnut" },
      ],
    };
  },
  watch: {
    tipoVisualizacion() {
      this.actualizarGraficos();
    },
    periodoVentas() {
      if (this.tipoVisualizacion === "ventas") {
        this.actualizarGraficos();
      }
    },
    periodoVendedores() {
      if (this.tipoVisualizacion === "vendedores") {
        this.actualizarGraficos();
      }
    },
  },
  methods: {
    inicializarGrafico(id, tipo, datos) {
      if (this.charts[id]) {
        this.charts[id].destroy();
      }
      const ctx = document.getElementById(id);
      if (ctx) {
        this.charts[id] = new Chart(ctx, {
          type: tipo,
          data: datos,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          },
        });
      }
    },
    async actualizarGraficos() {
      let datos;
      try {
        switch (this.tipoVisualizacion) {
          case "ventas":
            datos = await this.getDatosVentas();
            break;
          case "productos":
            datos = await this.getDatosProductos();
            break;
          case "clientes":
            datos = await this.getDatosClientes();
            break;
          case "categorias":
            datos = await this.getDatosCategorias();
            break;
          case "devoluciones":
            datos = await this.getDatosDevoluciones();
            break;
          case "vendedores":
            datos = await this.getDatosVendedores();
            break;
          default:
            datos = await this.getDatosVentas();
        }

        this.chartConfigs.forEach((config) => {
          if (
            ["pie", "doughnut"].includes(config.type) &&
            this.tipoVisualizacion !== "vendedores"
          ) {
            this.inicializarGrafico(
              config.id,
              config.type,
              this.convertirDatosParaCircular(datos)
            );
          } else {
            this.inicializarGrafico(config.id, config.type, datos);
          }
        });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    },
    async getDatosVentas() {
      const response = await axios.get(
        `http://localhost:3000/api/v1/estadisticas/ventas/${this.periodoVentas}`
      );
      const datos = response.data.datos;

      if (this.periodoVentas === "dia") {
        return {
          labels: datos.map((d) =>
            new Date(d.Fecha).toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })
          ),
          datasets: [
            {
              label: `Ventas por día`,
              data: datos.map((d) => d.TotalVentas),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
      } else if (this.periodoVentas === "mes") {
        return {
          labels: datos.map((d) =>
            new Date(d.Anio, d.Mes - 1).toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
            })
          ),
          datasets: [
            {
              label: `Ventas por mes`,
              data: datos.map((d) => d.TotalVentas),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
      } else if (this.periodoVentas === "anio") {
        return {
          labels: datos.map((d) => d.Anio.toString()),
          datasets: [
            {
              label: `Ventas por año`,
              data: datos.map((d) => d.TotalVentas),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
      }
    },
    async getDatosProductos() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/estadisticas/productos-mas-vendidos"
      );
      const datos = response.data.datos;
      return {
        labels: datos.map((d) => d.Nombre),
        datasets: [
          {
            label: "Unidades Vendidas",
            data: datos.map((d) => d.UnidadesVendidas),
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    async getDatosClientes() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/estadisticas/tipos-clientes"
      );
      const datos = response.data.datos;
      return {
        labels: datos.map((d) => d.TipoCliente),
        datasets: [
          {
            label: "Número de Clientes",
            data: datos.map((d) => d.NumeroClientes),
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    async getDatosCategorias() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/estadisticas/productos-por-categoria"
      );
      const datos = response.data.datos;
      return {
        labels: datos.map((d) => d.Nombre),
        datasets: [
          {
            label: "Número de Productos",
            data: datos.map((d) => d.NumeroProductos),
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    async getDatosDevoluciones() {
      const response = await axios.get(
        "http://localhost:3000/api/v1/estadisticas/devoluciones"
      );
      const datos = response.data.datos;
      return {
        labels: datos.map((d) => d.Fecha),
        datasets: [
          {
            label: "Número de Devoluciones",
            data: datos.map((d) => d.NumeroDevoluciones),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    async getDatosVendedores() {
      const response = await axios.get(
        `http://localhost:3000/api/v1/estadisticas/vendedores-top/${this.periodoVendedores}`
      );
      const datos = response.data.datos;
      return {
        labels: datos.map((d) => d.Nombre),
        datasets: [
          {
            label: "Ventas Totales",
            data: datos.map((d) => d.TotalVentas),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    convertirDatosParaCircular(datos) {
      return {
        labels: datos.labels,
        datasets: [
          {
            data: datos.datasets[0].data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF9F40",
              "#4BC0C0",
              "#9966FF",
              "#FF6384",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF9F40",
              "#4BC0C0",
              "#9966FF",
              "#FF6384",
            ],
          },
        ],
      };
    },
  },
  mounted() {
    this.actualizarGraficos();
  },
};
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
}
.card-title {
  font-size: 1.2rem;
  margin-bottom: 0;
}
.card-body {
  position: relative;
  height: 300px;
}
</style>
