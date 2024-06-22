<template>
    <div>
       <div class="row">
 
 
          <!-- Listado de Productos por categorias -->
          <div class="col-lg-8 col-sm-12 tabs_wrapper">
             <div class="page-header ">
                <div class="page-title">
                   <h4 _msttexthash="180167" _msthash="32">Categorías</h4>
                   <h6 _msttexthash="393432" _msthash="33">Gestiona tus compras</h6>
                </div>
             </div>
             <!-- Listado de Categorias -->
             <ul class="tabs owl-carousel owl-theme owl-product border-0 owl-loaded">
                <div class="owl-stage-outer">
                   <div class="owl-stage"
                      style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 1055px;">
                      <div class="owl-item active" style="width: 95.5px; margin-right: 10px;">
                         <li class="active" id="fruits">
                            <div class="product-details ">
                               <img src="../../public/img/product/product62.png" alt="img" _mstalt="32942" _msthash="34">
                               <h6 _msttexthash="78806" _msthash="35">Frutas</h6>
                            </div>
                         </li>
                      </div>
                   </div>
                </div>
                <div class="owl-nav" _msthidden="2"><button type="button" role="presentation" class="owl-prev disabled"
                      _msthidden="1"><span aria-label="Previous" _msthidden="1" _mstaria-label="119327" _msthash="54"
                         _msttexthash="750659">‹</span></button><button type="button" role="presentation"
                      class="owl-next" _msthidden="1"><span aria-label="Next" _msthidden="1" _mstaria-label="46722"
                         _msthash="55" _msttexthash="750750">›</span></button></div>
                <div class="owl-dots disabled"></div>
             </ul>
             <!-- Fin de listado de Categorias -->
 
             <!-- Listado de Productos -->
             <div class="tabs_container">
                <div class="tab_content active" data-tab="fruits">
                   <div class="row ">
                      <div class="col-lg-3 col-sm-6 d-flex ">
                         <div class="productset flex-fill active">
                            <div class="productsetimg">
                               <img src="../../public/img/product/product29.jpg" alt="img" _mstalt="32942" _msthash="56">
                               <h6 _msttexthash="164931" _msthash="57">Cantidad: 5.00</h6>
                               <div class="check-product">
                                  <i class="fa fa-check"></i>
                               </div>
                            </div>
                            <div class="productsetcontent">
                               <!-- Categoria -->
                               <h5 _msttexthash="78806" _msthash="58">Frutas</h5>
                               <!-- Producto -->
                               <h4 _msttexthash="91793" _msthash="59">Naranja</h4>
                               <!-- Precio -->
                               <h6 _msttexthash="35919" _msthash="60">150.00</h6>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <!-- Fin Listado de Productos -->
 
          <!-- Fin de Listado de Productos por categorias -->
 
          <div class="col-lg-4 col-sm-12 ">
 
             <!-- Informacion de la factura o boleta de la venta -->
             <div class="order-list">
                <div class="orderid">
                   <h4 _msttexthash="257712" _msthash="196">Lista de pedidos</h4>
                   <h5 _msttexthash="433407" _msthash="197">ID de transacción : #65565</h5>
                </div>
             </div>
             <!-- Fin Informacion de la factura o boleta de la venta -->
             <div class="card card-order">
                <div class="card-body">
 
                   <div class="row">
                      <!-- Boton para agregar un nuevo cliente -->
                      <div class="col-12">
                         <a href="javascript:void(0);" class="btn btn-adds" data-bs-toggle="modal"
                            data-bs-target="#create"><i class="fa fa-plus me-2"></i>
                            <font _mstmutation="1" _msttexthash="256113" _msthash="203">Agregar cliente</font>
                         </a>
                      </div>
                      <!-- Fin de Boton para agregar un nuevo cliente -->
 
                      <!-- Agregar cliente ya existente -->
                      <div class="col-lg-12">
                         <div class="select-split ">
                            <div class="select-group w-100">
                               <select class="select select2-hidden-accessible" data-select2-id="1" tabindex="-1"
                                  aria-hidden="true">
                                  <option data-select2-id="3" _msttexthash="280800" _msthash="204">Publico en general
                                  </option>
                                  <option _msttexthash="156260" _msthash="205">Chris Moris</option>
                               </select>
                               <span class="select2 select2-container select2-container--default" dir="ltr"
                                  data-select2-id="2" style="width: 100%;"><span class="selection"><span
                                        class="select2-selection select2-selection--single" role="combobox"
                                        aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false"
                                        aria-labelledby="select2-y9w0-container"><span
                                           class="select2-selection__rendered" id="select2-y9w0-container" role="textbox"
                                           aria-readonly="true" title="Walk-in Customer" _msttexthash="455351"
                                           _msthash="206">Cliente sin cita previa</span><span
                                           class="select2-selection__arrow" role="presentation"><b
                                              role="presentation"></b></span></span></span><span class="dropdown-wrapper"
                                     aria-hidden="true"></span></span>
                            </div>
                         </div>
                      </div>
                      <!-- Fin Agregar cliente ya existente -->
 
                      <!-- Boton para escanear producto por codigo de barras -->
                      <div class="col-12">
                         <div class="text-end">
                            <a class="btn btn-scanner-set"><img src="../../public/img/icons/scanner1.svg" alt="img"
                                  class="me-2" _mstalt="32942" _msthash="210">
                               <font _mstmutation="1" _msttexthash="502528" _msthash="211">Escanear código de barra
                               </font>
                            </a>
                         </div>
                      </div>
                      <!-- Fin Boton para escanear producto por codigo de barras -->
                   </div>
 
 
                </div>
                
                <div class="split-card">
                </div>
 
                <!-- Informacion de los productos Añadidos -->
                <div class="card-body pt-0">
                   <div class="totalitem">
                      <h4 _msttexthash="386776" _msthash="212">Total de artículos : 4</h4>
                      <a href="javascript:void(0);" _msttexthash="159757" _msthash="213">Borrar todo</a>
                   </div>
                   <!-- PRODUCTO AÑADIDO -->
                   <div class="product-table">
                      <ul class="product-lists">
                         <li>
                            <div class="productimg">
                               <div class="productimgs">
                                  <img src="../../public/img/product/product31.jpg" alt="img" _mstalt="32942"
                                     _msthash="238">
                               </div>
                               <div class="productcontet">
                                  <h4>
                                     <font _mstmutation="1" _msttexthash="58864" _msthash="239">Fresa </font><a
                                        href="javascript:void(0);" class="ms-2" data-bs-toggle="modal"
                                        data-bs-target="#edit"><img src="../../public/img/icons/edit-5.svg" alt="img"
                                           _mstalt="32942" _msthash="240"></a>
                                  </h4>
                                  <div class="productlinkset">
                                     <h5 _msttexthash="34879" _msthash="241">PT001</h5>
                                  </div>
                                  <div class="increment-decrement">
                                     <div class="input-groups">
                                        <input type="button" value="-" class="button-minus dec button" _mstvalue="4095"
                                           _msthash="242">
                                        <input type="text" name="child" value="0" class="quantity-field">
                                        <input type="button" value="+" class="button-plus inc button " _mstvalue="3913"
                                           _msthash="243">
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </li>
                         <li _msttexthash="43667" _msthash="244">3000.00 </li>
                         <li><a class="confirm-text" href="javascript:void(0);"><img
                                  src="../../public/img/icons/delete-2.svg" alt="img" _mstalt="32942" _msthash="245"></a>
                         </li>
                      </ul>
                   </div>
                   <!-- FIN DE PRODUCTO AÑADIDO -->
                </div>
                <!-- Fin Informacion de los productos Añadidos -->
                <div class="split-card">
                </div>
 
                <!-- Pago y suma de los productos -->
                <div class="card-body pt-0 pb-2">
                   <!-- Suma de los productos -->
                   <div class="setvalue">
                      <ul>
                         <li>
                            <h5 _msttexthash="116285" _msthash="246">Subtotal </h5>
                            <h6 _msttexthash="34437" _msthash="247">55.00$</h6>
                         </li>
                         <li>
                            <h5 _msttexthash="118482" _msthash="248">Impuesto </h5>
                            <h6 _msttexthash="26611" _msthash="249">5.00$</h6>
                         </li>
                         <li class="total-value">
                            <h5 _msttexthash="60814" _msthash="250">Total </h5>
                            <h6 _msttexthash="34008" _msthash="251">60.00$</h6>
                         </li>
                      </ul>
                   </div>
                   <!-- Fin de Suma de los productos -->
 
                   <!-- Elegir Forma de pago -->
                   <div class="setvaluecash">
                      <ul>
                         <li>
                            <a href="javascript:void(0);" class="paymentmethod">
                               <img src="../../public/img/icons/cash.svg" alt="img" class="me-2" _mstalt="32942"
                                  _msthash="252">
                               <font _mstmutation="1" _msttexthash="114686" _msthash="253"> Efectivo </font>
                            </a>
                         </li>
                         <li>
                            <a href="javascript:void(0);" class="paymentmethod">
                               <img src="../../public/img/icons/debitcard.svg" alt="img" class="me-2" _mstalt="32942"
                                  _msthash="254">
                               <font _mstmutation="1" _msttexthash="89440" _msthash="255"> Débito </font>
                            </a>
                         </li>
                         <li>
                            <a href="javascript:void(0);" class="paymentmethod">
                               <img src="../../public/img/icons/scan.svg" alt="img" class="me-2" _mstalt="32942"
                                  _msthash="256">
                               <font _mstmutation="1" _msttexthash="111059" _msthash="257"> Escanear </font>
                            </a>
                         </li>
                      </ul>
                   </div>
                   <!-- Fin de Elegir Forma de pago -->
 
                   <!-- Registrar Pago -->
                   <div class="btn-totallabel">
                      <h5 _msttexthash="41197" _msthash="258">Caja</h5>
                      <h6 _msttexthash="34008" _msthash="259">60.00$</h6>
                   </div>
                   <!-- Fin de Registrar Pago -->
 
                </div>
             </div>
          </div>
       </div>
    </div>
 </template>