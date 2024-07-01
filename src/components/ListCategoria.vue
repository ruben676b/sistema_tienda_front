<template>
    <div class="content">
        <div class="page-header">
          <div class="row">
            <div class="col-sm-12">
              <h3 class="page-title">Lista de categoría de productos</h3>
            </div>
          </div>
        </div>

        <div class="ag-format-container">
        <div class="ag-courses_box">
            <div v-for="categoria in categorias" :key="categoria.id" class="ag-courses_item">
            <a href="#" class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div>
                <div class="ag-courses-item_title">{{ categoria.nombre }}</div>
            </a>
            </div>
        </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        categorias: []
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const res = await fetch("http://localhost:3000/api/v1/categorias");
          const data = await res.json();
          this.categorias = data.categorias;
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .ag-format-container {
    width: 1020px;
    margin: 0 auto;
  }
  .ag-courses_box {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 50px 0;
  }
  .ag-courses_item {
    flex-basis: calc(25% - 30px);
    margin: 0 15px 30px;
    overflow: hidden;
    border-radius: 28px;
  }
  .ag-courses-item_link {
    display: block;
    padding: 30px 20px;
    background-color: #121212;
    overflow: hidden;
    position: relative;
  }
  .ag-courses-item_link:hover,
  .ag-courses-item_link:hover .ag-courses-item_date {
    text-decoration: none;
    color: #FFF;
  }
  .ag-courses-item_link:hover .ag-courses-item_bg {
    transform: scale(10);
  }
  .ag-courses-item_title {
    min-height: 87px;
    margin: 0 0 25px;
    overflow: hidden;
    font-weight: bold;
    font-size: 30px;
    color: #FFF;
    z-index: 2;
    position: relative;
  }
  .ag-courses-item_bg {
    height: 128px;
    width: 128px;
    background-color: #f9b234;
    z-index: 1;
    position: absolute;
    top: -75px;
    right: -75px;
    border-radius: 50%;
    transition: all .5s ease;
  }
  .ag-courses_item:nth-child(2n) .ag-courses-item_bg {
    background-color: #3ecd5e;
  }
  .ag-courses_item:nth-child(3n) .ag-courses-item_bg {
    background-color: #e44002;
  }
  .ag-courses_item:nth-child(4n) .ag-courses-item_bg {
    background-color: #952aff;
  }
  .ag-courses_item:nth-child(5n) .ag-courses-item_bg {
    background-color: #cd3e94;
  }
  .ag-courses_item:nth-child(6n) .ag-courses-item_bg {
    background-color: #4c49ea;
  }
  
  @media only screen and (max-width: 979px) {
    .ag-courses_item {
      flex-basis: calc(50% - 30px);
    }
    .ag-courses-item_title {
      font-size: 24px;
    }
  }
  
  @media only screen and (max-width: 767px) {
    .ag-format-container {
      width: 96%;
    }
  }
  
  @media only screen and (max-width: 639px) {
    .ag-courses_item {
      flex-basis: 100%;
    }
    .ag-courses-item_title {
      min-height: 72px;
      line-height: 1;
      font-size: 24px;
    }
    .ag-courses-item_link {
      padding: 22px 40px;
    }
    .ag-courses-item_date-box {
      font-size: 16px;
    }
  }
  </style>
  