<template>
   <div>
     <div class="modal fade show" id="create" tabindex="-1" aria-labelledby="create" aria-modal="true" role="dialog"
       style="display: block;">
       <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title">Agregar Cliente Natural</h5>
             <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">×</span>
             </button>
           </div>
           <div class="modal-body">
             <div class="row">
               <div class="col-lg-6 col-sm-12 col-12">
                 <div class="form-group">
                   <label>Nombre del Cliente</label>
                   <input type="text" v-model="cliente.NombreCliente">
                 </div>
               </div>
               <div class="col-lg-6 col-sm-12 col-12">
                 <div class="form-group">
                   <label>Email</label>
                   <input type="text" v-model="cliente.Email">
                 </div>
               </div>
               <div class="col-lg-6 col-sm-12 col-12">
                 <div class="form-group">
                   <label>Teléfono</label>
                   <input type="text" v-model="cliente.Telefono">
                 </div>
               </div>
               <div class="col-lg-6 col-sm-12 col-12">
                 <div class="form-group">
                   <label>Dirección</label>
                   <input type="text" v-model="cliente.DireccionCliente">
                 </div>
               </div>
             </div>
             <div class="col-lg-12">
               <a class="btn btn-submit me-2" @click="agregarClienteNatural">Enviar</a>
               <a class="btn btn-cancel" data-bs-dismiss="modal">Cancelar</a>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 <script>
 import axios from 'axios';
 
 export default {
   data() {
     return {
       cliente: {
         Telefono: '',
         Email: '',
         DireccionCliente: '',
         NombreCliente: '',
       },
     };
   },
   methods: {
     async agregarClienteNatural() {
       try {
         const response = await axios.post('http://localhost:3000/api/v1/clientes-naturales', this.cliente);
         if (response.data.success) {
           Swal.fire('Cliente Natural agregado exitosamente!', '', 'success');
         } else {
           Swal.fire('Error al agregar cliente natural', response.data.message, 'error');
         }
       } catch (error) {
         Swal.fire('Error', 'Hubo un problema al agregar el cliente natural.', 'error');
       }
     },
   },
 };
 </script>
 