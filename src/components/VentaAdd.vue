<template>
   <div>
      <div class="container-fluid">
         <div class="row" style=" padding: 10px;">


            <!-- Cliente -->
            <div class="col-md-4">
             
               <div class="order-list">
                  <div class="orderid">
                     <h4>Datos del cliente</h4>
         
                  </div>

               </div>
               <a href="javascript:void(0);" class="btn btn-adds" data-bs-toggle="modal" data-bs-target="#create">
                  <i class="fa fa-plus me-2"></i>
                  <font>Agregar cliente</font>
               </a>
               <div class="card card-order">
                  <div class="card-body">
                     <div class="row">
                        <!-- Boton para agregar un nuevo cliente -->

                        <!-- Fin de Boton para agregar un nuevo cliente -->

                        <!-- Agregar cliente ya existente -->

                        <div class="select-split">
                           <div class="select-group w-100">
                              <select class="select select2-hidden-accessible" data-select2-id="1" tabindex="-1"
                                 aria-hidden="true">
                                 <option data-select2-id="3">Publico en general</option>
                                 <option>Chris Moris</option>
                              </select>
                              <label class="col-form-label">Seleccionar cliente Existente</label>
                              <span class="select2 select2-container select2-container--default" dir="ltr"
                                 data-select2-id="2" style="width: 100%;">
                                 <span class="selection">
                                    <span class="select2-selection select2-selection--single" role="combobox"
                                       aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false"
                                       aria-labelledby="select2-y9w0-container">
                                       <span class="select2-selection__rendered" id="select2-y9w0-container"
                                          role="textbox" aria-readonly="true" title="Walk-in Customer">Cliente sin
                                          cita previa</span>
                                      
                                    </span>
                                 </span>
                                 <span class="dropdown-wrapper" aria-hidden="true"></span>
                              </span>
                           </div>
                        </div>

                        <!-- Fin Agregar cliente ya existente -->
                     </div>
                  </div>
               </div>
            </div>


            <div class="col-md-4">
               <!-- Informacion de la factura o boleta de la venta -->
               <div class="order-list">
                  <div class="orderid">
                     <h4>Datos de comprobante</h4>
                     <h5>ID de transacción : #65565</h5>
                  </div>

               </div>
               <div>
                  <label class="col-form-label ">Tipo de comprobante</label>
                  <select class="js-example-basic-single select2 select2-hidden-accessible" data-select2-id="18"
                     tabindex="-1" aria-hidden="true">
                     <option selected="selected" data-select2-id="20">Factura</option>
                     <option data-select2-id="99">white</option>
                     <option data-select2-id="100">purple</option>
                  </select><span class="select2 select2-container select2-container--default select2-container--below"
                     dir="ltr" data-select2-id="19" style="width: 66px;"><span class="selection"><span
                           class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                           aria-expanded="false" tabindex="0" aria-disabled="false"
                           aria-labelledby="select2-htm5-container"><span class="select2-selection__rendered"
                              id="select2-htm5-container" role="textbox" aria-readonly="true"
                              title="orange">Factura</span></span></span><span class="dropdown-wrapper"
                        aria-hidden="true"></span></span>
               </div>
         
                  <label class="col-form-label">Serie</label>

                  <input type="text" class="form-control">
           
               <label class="col-form-label">Numero</label>
               <input type="text" class="form-control">
               <!-- Fin Informacion de la factura o boleta de la venta -->
            </div>
            <div class="col-md-4">
               <div class="order-list">
                  <div class="orderid">
                     <h4>Datos de venta</h4>
                     <label class="col-form-label">Fecha</label>
                     <input type="date" class="form-control">
                     <label class="col-form-label">IGV</label>
                     <input type="text" value="18 %" class="form-control" disabled="disabled">
                  </div>

               </div>
            </div>
         </div>



         <!-- PRODUCTOS -->
         <div class="row">
            <div class="col-12">
               <!-- Listado de Productos por categorias -->
               <div class="col-lg-8 col-sm-12 tabs_wrapper">
                  <div class="page-header">
                     <div class="page-title">
                        <h4>Categorías</h4>
                        <h6>Gestiona tus compras</h6>
                     </div>
                  </div>
                  <!-- Listado de Categorias -->
                  <ul class="tabs owl-carousel owl-theme owl-product border-0 owl-loaded">
                     <div class="owl-stage-outer">
                        <div class="owl-stage"
                           style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 1055px;">
                           <div class="owl-item active" style="width: 95.5px; margin-right: 10px;">
                              <li class="active" id="fruits">
                                 <div class="product-details">
                                    <img src="../../public/img/product/product62.png" alt="img">
                                    <h6>Frutas</h6>
                                 </div>
                              </li>
                           </div>
                        </div>
                     </div>
                     <div class="owl-nav">
                        <button type="button" role="presentation" class="owl-prev disabled"><span
                              aria-label="Previous">‹</span></button>
                        <button type="button" role="presentation" class="owl-next"><span
                              aria-label="Next">›</span></button>
                     </div>
                     <div class="owl-dots disabled"></div>
                  </ul>
                  <!-- Fin de listado de Categorias -->

                  <!-- Listado de Productos -->
                  <div class="tabs_container">
                     <div class="tab_content active" data-tab="fruits">
                        <div class="row">
                           <div class="col-lg-3 col-sm-6 d-flex">
                              <div class="productset flex-fill active">
                                 <div class="productsetimg">
                                    <img src="../../public/img/product/product29.jpg" alt="img">
                                    <h6>Cantidad: 5.00</h6>
                                    <div class="check-product">
                                       <i class="fa fa-check"></i>
                                    </div>
                                 </div>
                                 <div class="productsetcontent">
                                    <h5>Frutas</h5>
                                    <h4>Naranja</h4>
                                    <h6>150.00</h6>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- Fin Listado de Productos -->
            </div>
         </div>

         <div class="row">
            <div class="col-md-8">
               <!-- Informacion de los productos Añadidos -->
               <div class="card-body pt-0">
                  <div class="totalitem">
                     <h4>Total de artículos : 4</h4>
                     <a href="javascript:void(0);">Borrar todo</a>
                  </div>
                  <!-- PRODUCTO AÑADIDO -->
                  <div class="product-table">
                     <ul class="product-lists">
                        <li>
                           <div class="productimg">
                              <div class="productimgs">
                                 <img src="../../public/img/product/product31.jpg" alt="img">
                              </div>
                              <div class="productcontet">
                                 <h4>
                                    <font>Fresa</font>
                                    <a href="javascript:void(0);" class="ms-2" data-bs-toggle="modal"
                                       data-bs-target="#edit">
                                       <img src="../../public/img/icons/edit-5.svg" alt="img">
                                    </a>
                                 </h4>
                                 <div class="productlinkset">
                                    <h5>PT001</h5>
                                 </div>
                                 <div class="increment-decrement">
                                    <div class="input-groups">
                                       <input type="button" value="-" class="button-minus dec button">
                                       <input type="text" name="child" value="0" class="quantity-field">
                                       <input type="button" value="+" class="button-plus inc button">
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                        <li>3000.00</li>
                        <li>
                           <a class="confirm-text" href="javascript:void(0);">
                              <img src="../../public/img/icons/delete-2.svg" alt="img">
                           </a>
                        </li>
                     </ul>
                  </div>
                  <!-- FIN DE PRODUCTO AÑADIDO -->
               </div>
               <!-- Fin Informacion de los productos Añadidos -->

               <!-- Boton para escanear producto por codigo de barras -->
               <div class="col-12">
                  <div class="text-end">
                     <a class="btn btn-scanner-set">
                        <img src="../../public/img/icons/scanner1.svg" alt="img" class="me-2">
                        <font>Escanear código de barra</font>
                     </a>
                  </div>
               </div>
               <!-- Fin Boton para escanear producto por codigo de barras -->
            </div>

            <div class="col-md-4">
               <!-- Pago y suma de los productos -->
               <div class="card-body pt-0 pb-2">
                  <!-- Suma de los productos -->
                  <h4>Informacion de venta</h4>
                  <div class="setvalue">
                     <ul>
                        <li>
                           <h5>Subtotal</h5>
                           <h6>55.00$</h6>
                        </li>
                        <li>
                           <h5>Impuesto</h5>
                           <h6>5.00$</h6>
                        </li>
                        <li class="total-value">
                           <h5>Total</h5>
                           <h6>60.00$</h6>
                        </li>
                     </ul>
                  </div>
                  <!-- Fin de Suma de los productos -->

                  <!-- Elegir Forma de pago -->
                  <div class="setvaluecash">
                     <ul>
                        <li>
                           <a href="javascript:void(0);" class="paymentmethod">
                              <img src="../../public/img/icons/cash.svg" alt="img" class="me-2">
                              <font>Efectivo</font>
                           </a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" class="paymentmethod">
                              <img src="../../public/img/icons/debitcard.svg" alt="img" class="me-2">
                              <font>Débito</font>
                           </a>
                        </li>
                        <li>
                           <a href="javascript:void(0);" class="paymentmethod">
                              <img src="../../public/img/icons/scan.svg" alt="img" class="me-2">
                              <font>Escanear</font>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <!-- Fin de Elegir Forma de pago -->

                  <!-- Registrar Pago -->
                  <div class="btn-totallabel">
                     <h5>Caja</h5>
                     <h6>60.00$</h6>
                  </div>
                  <!-- Fin de Registrar Pago -->
               </div>
            </div>
         </div>
      </div>
   </div>
</template>