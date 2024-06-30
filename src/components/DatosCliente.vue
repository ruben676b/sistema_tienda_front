<template>
    <div class="order-list">
       <div class="orderid">
          <h4>Datos del cliente</h4>
       </div>
    </div>
    <a href="javascript:void(0);" class="btn btn-adds" @click="openClientModal">
       <i class="fa fa-plus me-2"></i>
       <font>Agregar cliente</font>
    </a>
    <div class="card card-order">
       <div class="card-body">
          <div class="row">
             <div class="select-split">
                <div class="select-group w-100">
                   <select class="select select2-hidden-accessible" data-select2-id="1" tabindex="-1" aria-hidden="true">
                      <option data-select2-id="3">Publico en general</option>
                      <option>Chris Moris</option>
                   </select>
                   <label class="col-form-label">Seleccionar cliente Existente</label>
                   <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" style="width: 100%;">
                      <span class="selection">
                         <span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-y9w0-container">
                            <span class="select2-selection__rendered" id="select2-y9w0-container" role="textbox" aria-readonly="true" title="Walk-in Customer">Cliente sin cita previa</span>
                         </span>
                      </span>
                      <span class="dropdown-wrapper" aria-hidden="true"></span>
                   </span>
                </div>
             </div>
          </div>
       </div>
    </div>
 </template>
 
 <script>
 export default {
    methods: {
       openClientModal() {
          this.$emit('open-client-modal');
       }
    }
 };
 </script>
 
 <style scoped>
 /* Estilos específicos si es necesario */
 </style>
 