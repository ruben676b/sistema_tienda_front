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
          <option value="productos">Productos</option>
          <option value="clientes">Clientes</option>
          <option value="categorias">Categorías</option>
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
        <option value="dia">Últimos 7 días</option>
        <option value="semana">Últimas 4 semanas</option>
        <option value="mes">Este mes</option>
        <option value="anual">Este año</option>
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
Chart.register(...registerables);

export default {
  data() {
    return {
      tipoVisualizacion: "",
      periodoVentas: "dia",
      periodoVendedores: "dia",
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
    actualizarGraficos() {
      let datos;
      switch (this.tipoVisualizacion) {
        case "ventas":
          datos = this.getDatosVentas();
          break;
        case "productos":
          datos = this.getDatosProductos();
          break;
        case "clientes":
          datos = this.getDatosClientes();
          break;
        case "categorias":
          datos = this.getDatosCategorias();
          break;
        case "devoluciones":
          datos = this.getDatosDevoluciones();
          break;
        case "vendedores":
          datos = this.getDatosVendedores();
          break;
        default:
          datos = this.getDatosVentas();
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
    },
    getDatosVentas() {
      // Simulación de datos de ventas
      switch (this.periodoVentas) {
        case "dia":
          return {
            labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
            datasets: [
              {
                label: "Ventas por Día",
                data: [1200, 1900, 3000, 5000, 2000, 3000, 1000],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          };
        case "mes":
          return {
            labels: [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ],
            datasets: [
              {
                label: "Ventas por Mes",
                data: [
                  65000, 59000, 80000, 81000, 56000, 55000, 40000, 45000, 70000,
                  75000, 60000, 85000,
                ],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          };
        case "anio":
          return {
            labels: ["2020", "2021", "2022", "2023", "2024"],
            datasets: [
              {
                label: "Ventas por Año",
                data: [500000, 650000, 750000, 800000, 900000],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          };
      }
    },
    getDatosProductos() {
      // Simulación de datos de productos más vendidos
      return {
        labels: ["Leche", "Pan", "Galletas", "Cereal", "Arroz"],
        datasets: [
          {
            label: "Unidades Vendidas",
            data: [500, 300, 400, 200, 600],
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    getDatosClientes() {
      // Simulación de datos de tipos de clientes
      return {
        labels: ["Natural", "Jurídico", "Público"],
        datasets: [
          {
            label: "Número de Clientes",
            data: [30, 15, 5],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    getDatosCategorias() {
      // Simulación de datos de categorías de productos
      return {
        labels: [
          "LACTEOS",
          "JUGUETES",
          "REFRESCOS",
          "COMIDA",
          "SOYA",
          "AGUA",
          "MAIZ",
          "CAFE",
        ],
        datasets: [
          {
            label: "Número de Productos",
            data: [10, 5, 8, 15, 3, 6, 4, 7],
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    getDatosDevoluciones() {
      // Simulación de datos de devoluciones
      return {
        labels: [
          "Producto en mal estado",
          "Error en la entrega",
          "Cambio de opinión",
          "Producto defectuoso",
        ],
        datasets: [
          {
            label: "Número de Devoluciones",
            data: [5, 3, 2, 4],
            backgroundColor: "rgba(201, 203, 207, 0.2)",
            borderColor: "rgba(201, 203, 207, 1)",
            borderWidth: 1,
          },
        ],
      };
    },
    getDatosVendedores() {
      // Simulación de datos
      const generarDatosAleatorios = (meses) => {
        return Array.from({ length: meses }, () => ({
          ventas: Math.floor(Math.random() * 500) + 100,
          total: Math.floor(Math.random() * 50000) + 10000,
        }));
      };

      const vendedores = [
        { nombre: "Vendedor1", datos: generarDatosAleatorios(12) },
        { nombre: "Vendedor2", datos: generarDatosAleatorios(12) },
        { nombre: "Vendedor3", datos: generarDatosAleatorios(12) },
        { nombre: "Vendedor4", datos: generarDatosAleatorios(12) },
        { nombre: "Vendedor5", datos: generarDatosAleatorios(12) },
      ];

      let labels, datos;
      switch (this.periodoVendedores) {
        case "dia":
          labels = Array.from({ length: 7 }, (_, i) => `Día ${i + 1}`);
          datos = vendedores.map((v) => ({
            nombre: v.nombre,
            ventas: v.datos.slice(0, 7).map((d) => d.ventas),
          }));
          break;
        case "semana":
          labels = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];
          datos = vendedores.map((v) => ({
            nombre: v.nombre,
            ventas: v.datos.slice(0, 4).map((d) => d.ventas),
          }));
          break;
        case "mes":
          labels = ["Este mes"];
          datos = vendedores.map((v) => ({
            nombre: v.nombre,
            ventas: [v.datos[0].ventas],
          }));
          break;
        case "anual":
          labels = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
          ];
          datos = vendedores.map((v) => ({
            nombre: v.nombre,
            ventas: v.datos.map((d) => d.ventas),
          }));
          break;
      }

      return {
        labels: labels,
        datasets: vendedores.map((v, index) => ({
          label: v.nombre,
          data: datos.find((d) => d.nombre === v.nombre).ventas,
          backgroundColor: `rgba(${index * 50}, ${
            255 - index * 50
          }, ${150}, 0.2)`,
          borderColor: `rgba(${index * 50}, ${255 - index * 50}, ${150}, 1)`,
          borderWidth: 1,
          fill: false,
        })),
      };
    },
    convertirDatosParaCircular(datos) {
      if (!datos || !datos.datasets || !datos.datasets[0]) {
        console.error("Invalid data structure for circular chart");
        return {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
          ],
        };
      }

      const colors = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(201, 203, 207, 0.2)",
        "rgba(255, 99, 132, 0.2)",
      ];

      return {
        labels: datos.labels,
        datasets: [
          {
            data: datos.datasets[0].data,
            backgroundColor: colors.slice(0, datos.labels.length),
            borderColor: colors
              .slice(0, datos.labels.length)
              .map((color) => color.replace("0.2", "1")),
            borderWidth: 1,
          },
        ],
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.actualizarGraficos();
    });
  },
};
</script>

<style>
.h-300 {
  height: 300px;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-4 {
  margin-top: 1rem;
}
</style>
