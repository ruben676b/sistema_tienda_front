<template>
    <div >
        <div class="page-header">
            <div class="page-title">
                <h4 _msttexthash="233701" _msthash="173">Lista de ventas</h4>
                <h6 _msttexthash="361400" _msthash="174">Gestiona tus ventas</h6>
            </div>
            <div class="page-btn">
                <a href="add-sales.html" class="btn btn-added"><img src="../../public/img/icons/plus.svg" alt="img"
                        class="me-1" _mstalt="32942" _msthash="175">
                    <font _mstmutation="1" _msttexthash="233012" _msthash="176">Agregar ventas</font>
                </a>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="table-top">
                    <div class="search-set">
                        <div class="search-path">
                            <a class="btn btn-filter" id="filter_search">
                                <img src="../../public/img/icons/filter.svg" alt="img" _mstalt="32942" _msthash="177">
                                <span _msthidden="1"><img src="../../public/img/icons/closes.svg" alt="img"
                                        _msthidden="A" _mstalt="32942" _msthash="178"></span>
                            </a>
                        </div>
                        <div class="search-input">
                            <a class="btn btn-searchset"><img src="../../public/img/icons/search-white.svg" alt="img"
                                    _mstalt="32942" _msthash="179"></a>
                            <div id="DataTables_Table_0_filter" class="dataTables_filter"><label> <input type="search"
                                        class="form-control form-control-sm" placeholder="Buscar..."
                                        aria-controls="DataTables_Table_0" _mstplaceholder="99723"
                                        _msthash="180"></label></div>
                        </div>
                    </div>
                    <div class="wordset">
                        <ul>
                            <li>
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title=""
                                    data-bs-original-title="pdf" aria-label="PDF" _mstaria-label="32526"
                                    _msthash="181"><img src="../../public/img/icons/pdf.svg" alt="img" _mstalt="32942"
                                        _msthash="182"></a>
                            </li>
                            <li>
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title=""
                                    data-bs-original-title="excel" aria-label="sobresalir" _mstaria-label="61828"
                                    _msthash="183"><img src="../../public/img/icons/excel.svg" alt="img" _mstalt="32942"
                                        _msthash="184"></a>
                            </li>
                            <li>
                                <a data-bs-toggle="tooltip" data-bs-placement="top" title=""
                                    data-bs-original-title="print" aria-label="Impresión" _mstaria-label="65221"
                                    _msthash="185"><img src="../../public/img/icons/printer.svg" alt="img"
                                        _mstalt="32942" _msthash="186"></a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="card" id="filter_inputs" _msthidden="6">
                    <div class="card-body pb-0" _msthidden="6">
                        <div class="row" _msthidden="6">
                            <div class="col-lg-3 col-sm-6 col-12" _msthidden="1">
                                <div class="form-group" _msthidden="1">
                                    <input type="text" placeholder="Enter Name" _msthidden="A" _mstplaceholder="128817"
                                        _msthash="187">
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12" _msthidden="1">
                                <div class="form-group" _msthidden="1">
                                    <input type="text" placeholder="Enter Reference No" _msthidden="A"
                                        _mstplaceholder="304369" _msthash="188">
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12" _msthidden="3">
                                <div class="form-group" _msthidden="3">
                                    <select class="select select2-hidden-accessible" data-select2-id="1" tabindex="-1"
                                        aria-hidden="true" _msthidden="2">
                                        <option data-select2-id="3" _msttexthash="133640" _msthidden="1" _msthash="189">
                                            Completed</option>
                                        <option _msttexthash="42653" _msthidden="1" _msthash="190">Paid</option>
                                    </select><span class="select2 select2-container select2-container--default"
                                        dir="ltr" data-select2-id="2" style="width: 100%;" _msthidden="1"><span
                                            class="selection" _msthidden="1"><span
                                                class="select2-selection select2-selection--single" role="combobox"
                                                aria-haspopup="true" aria-expanded="false" tabindex="0"
                                                aria-disabled="false" aria-labelledby="select2-z1tk-container"
                                                _msthidden="1"><span class="select2-selection__rendered"
                                                    id="select2-z1tk-container" role="textbox" aria-readonly="true"
                                                    title="Completed" _msttexthash="133640" _msthidden="1"
                                                    _msthash="191">Completed</span><span
                                                    class="select2-selection__arrow" role="presentation"><b
                                                        role="presentation"></b></span></span></span><span
                                            class="dropdown-wrapper" aria-hidden="true"></span></span>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6 col-12" _msthidden="1">
                                <div class="form-group" _msthidden="1">
                                    <a class="btn btn-filters ms-auto" _msthidden="1"><img
                                            src="../../public/img/icons/search-whites.svg" alt="img" _msthidden="A"
                                            _mstalt="32942" _msthash="192"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                        <table class="table datanew dataTable no-footer" id="DataTables_Table_0" role="grid"
                            aria-describedby="DataTables_Table_0_info">
                            <thead>
                                <tr role="row">
                                    <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1" aria-sort="ascending"
                                        aria-label=" : activar para ordenar la columna descendente"
                                        _mstaria-label="947050" _msthash="193" style="width: 35px;">
                                        <label class="checkboxs">
                                            <input type="checkbox" id="select-all">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1" aria-label="Fecha: activar para ordenar la columna ascendente"
                                        _mstaria-label="1105468" _msthash="194" _msttexthash="55848"
                                        style="width: 104.484px;">Fecha</th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1"
                                        aria-label="Nombre del cliente: activar para ordenar la columna ascendente"
                                        _mstaria-label="1594229" _msthash="195" _msttexthash="315666"
                                        style="width: 107.375px;">Nombre del cliente</th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1"
                                        aria-label="Referencia: activar para ordenar la columna de forma ascendente"
                                        _mstaria-label="1400841" _msthash="196" _msttexthash="152347"
                                        style="width: 67.7031px;">Referencia</th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1" aria-label="Estado: activar para ordenar la columna ascendente"
                                        _mstaria-label="1225991" _msthash="197" _msttexthash="76037"
                                        style="width: 60px;">Estado</th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1" aria-label="Pago: activar para ordenar la columna ascendente"
                                        _mstaria-label="1283568" _msthash="198" _msttexthash="43849"
                                        style="width: 60px;">Pago</th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1" aria-label="Total: activar para ordenar la columna ascendente"
                                        _mstaria-label="1164696" _msthash="199" _msttexthash="60814"
                                        style="width: 32.4062px;">Total</th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1" aria-label="Pagado: actívalo para ordenar la columna ascendente"
                                        _mstaria-label="1105143" _msthash="200" _msttexthash="73645"
                                        style="width: 29.5781px;">Pagado</th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1" aria-label="Vencimiento: activar para ordenar la columna ascendente"
                                        _mstaria-label="1051271" _msthash="201" _msttexthash="133822"
                                        style="width: 26.4531px;">Pendiente</th>
                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
                                        colspan="1" aria-label="Facturador: activar para ordenar la columna ascendente"
                                        _mstaria-label="1221103" _msthash="202" _msttexthash="75829"
                                        style="width: 35.0156px;">Biller</th>
                                    <th class="text-center sorting" tabindex="0" aria-controls="DataTables_Table_0"
                                        rowspan="1" colspan="1"
                                        aria-label="Acción: activar para ordenar la columna ascendente"
                                        _mstaria-label="1221740" _msthash="203" _msttexthash="93353"
                                        style="width: 43.5625px;">Acción</th>
                                </tr>
                            </thead>
                            <tbody>











                                <tr class="odd">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="455351" _msthash="204">Cliente sin cita previa</td>
                                    <td _msttexthash="337038" _msthash="205">19 de noviembre de 2022</td>
                                    <td _msttexthash="41951" _msthash="206">SL0101</td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="156000"
                                            _msthash="207">Completado</span></td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="73645"
                                            _msthash="208">Pagado</span></td>
                                    <td _msttexthash="21008" _msthash="209">0.00</td>
                                    <td _msttexthash="21008" _msthash="210">0.00</td>
                                    <td class="text-red" _msttexthash="35399" _msthash="211">100.00</td>
                                    <td _msttexthash="58448" _msthash="212">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="213">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="214">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="215">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="216">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="217">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="218">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="219">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="220">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="221">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="222">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="223">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="224">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="even">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="455351" _msthash="225">Cliente sin cita previa</td>
                                    <td _msttexthash="337038" _msthash="226">19 de noviembre de 2022</td>
                                    <td _msttexthash="42107" _msthash="227">SL0102</td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="156000"
                                            _msthash="228">Completado</span></td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="73645"
                                            _msthash="229">Pagado</span></td>
                                    <td _msttexthash="21008" _msthash="230">0.00</td>
                                    <td _msttexthash="21008" _msthash="231">0.00</td>
                                    <td class="text-red" _msttexthash="35399" _msthash="232">100.00</td>
                                    <td _msttexthash="58448" _msthash="233">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="234">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="235">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="236">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="237">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="238">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="239">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="240">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="241">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="242">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="243">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="244">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="245">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="odd">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="455351" _msthash="246">Cliente sin cita previa</td>
                                    <td _msttexthash="337038" _msthash="247">19 de noviembre de 2022</td>
                                    <td _msttexthash="42263" _msthash="248">SL0103</td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="156000"
                                            _msthash="249">Completado</span></td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="73645"
                                            _msthash="250">Pagado</span></td>
                                    <td _msttexthash="21008" _msthash="251">0.00</td>
                                    <td class="text-green" _msttexthash="35399" _msthash="252">100.00</td>
                                    <td _msttexthash="21008" _msthash="253">0.00</td>
                                    <td _msttexthash="58448" _msthash="254">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="255">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="256">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="257">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="258">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="259">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="260">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="261">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="262">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="263">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="264">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="265">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="266">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="even">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="273871" _msthash="267">Fred C. Rasmussen</td>
                                    <td _msttexthash="337038" _msthash="268">19 de noviembre de 2022</td>
                                    <td _msttexthash="42419" _msthash="269">SL0104</td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="270">Pendiente</span></td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="271">Pendiente</span></td>
                                    <td _msttexthash="21008" _msthash="272">0.00</td>
                                    <td class="text-green" _msttexthash="35399" _msthash="273">100.00</td>
                                    <td _msttexthash="21008" _msthash="274">0.00</td>
                                    <td _msttexthash="58448" _msthash="275">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="276">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="277">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="278">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="279">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="280">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="281">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="282">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="283">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="284">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="285">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="286">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="287">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="odd">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="262327" _msthash="288">Tomás M. Martín</td>
                                    <td _msttexthash="337038" _msthash="289">19 de noviembre de 2022</td>
                                    <td _msttexthash="42575" _msthash="290">SL0105</td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="291">Pendiente</span></td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="292">Pendiente</span></td>
                                    <td _msttexthash="21008" _msthash="293">0.00</td>
                                    <td _msttexthash="21008" _msthash="294">0.00</td>
                                    <td class="text-green" _msttexthash="35399" _msthash="295">100.00</td>
                                    <td _msttexthash="58448" _msthash="296">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="297">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="298">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="299">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="300">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="301">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="302">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="303">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="304">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="305">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="306">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="307">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="308">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="even">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="262327" _msthash="309">Tomás M. Martín</td>
                                    <td _msttexthash="337038" _msthash="310">19 de noviembre de 2022</td>
                                    <td _msttexthash="42731" _msthash="311">SL0106</td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="156000"
                                            _msthash="312">Completado</span></td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="73645"
                                            _msthash="313">Pagado</span></td>
                                    <td _msttexthash="21008" _msthash="314">0.00</td>
                                    <td _msttexthash="21008" _msthash="315">0.00</td>
                                    <td class="text-red" _msttexthash="35399" _msthash="316">100.00</td>
                                    <td _msttexthash="58448" _msthash="317">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="318">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="319">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="320">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="321">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="322">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="323">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="324">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="325">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="326">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="327">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="328">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="329">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="odd">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="455351" _msthash="330">Cliente sin cita previa</td>
                                    <td _msttexthash="337038" _msthash="331">19 de noviembre de 2022</td>
                                    <td _msttexthash="42887" _msthash="332">SL0107</td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="156000"
                                            _msthash="333">Completado</span></td>
                                    <td><span class="badges bg-lightgreen" _msttexthash="73645"
                                            _msthash="334">Pagado</span></td>
                                    <td _msttexthash="21008" _msthash="335">0.00</td>
                                    <td _msttexthash="21008" _msthash="336">0.00</td>
                                    <td class="text-red" _msttexthash="35399" _msthash="337">100.00</td>
                                    <td _msttexthash="58448" _msthash="338">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="339">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="340">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="341">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="342">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="343">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="344">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="345">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="346">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="347">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="348">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="349">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="350">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="even">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="455351" _msthash="351">Cliente sin cita previa</td>
                                    <td _msttexthash="337038" _msthash="352">19 de noviembre de 2022</td>
                                    <td _msttexthash="43043" _msthash="353">SL0108</td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="354">Pendiente</span></td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="355">Pendiente</span></td>
                                    <td _msttexthash="21008" _msthash="356">0.00</td>
                                    <td class="text-green" _msttexthash="35399" _msthash="357">100.00</td>
                                    <td _msttexthash="21008" _msthash="358">0.00</td>
                                    <td _msttexthash="58448" _msthash="359">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="360">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="361">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="362">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="363">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="364">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="365">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="366">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="367">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="368">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="369">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="370">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="371">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="odd">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="455351" _msthash="372">Cliente sin cita previa</td>
                                    <td _msttexthash="337038" _msthash="373">19 de noviembre de 2022</td>
                                    <td _msttexthash="43199" _msthash="374">SL0109</td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="375">Pendiente</span></td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="376">Pendiente</span></td>
                                    <td _msttexthash="21008" _msthash="377">0.00</td>
                                    <td class="text-green" _msttexthash="35399" _msthash="378">100.00</td>
                                    <td _msttexthash="21008" _msthash="379">0.00</td>
                                    <td _msttexthash="58448" _msthash="380">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="381">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="382">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="383">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="384">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="385">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="386">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="387">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="388">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="389">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="390">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="391">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="392">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr class="even">
                                    <td class="sorting_1">
                                        <label class="checkboxs">
                                            <input type="checkbox">
                                            <span class="checkmarks"></span>
                                        </label>
                                    </td>
                                    <td _msttexthash="455351" _msthash="393">Cliente sin cita previa</td>
                                    <td _msttexthash="337038" _msthash="394">19 de noviembre de 2022</td>
                                    <td _msttexthash="41938" _msthash="395">SL0110</td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="396">Pendiente</span></td>
                                    <td><span class="badges bg-lightred" _msttexthash="133822"
                                            _msthash="397">Pendiente</span></td>
                                    <td _msttexthash="21008" _msthash="398">0.00</td>
                                    <td class="text-green" _msttexthash="35399" _msthash="399">100.00</td>
                                    <td _msttexthash="21008" _msthash="400">0.00</td>
                                    <td _msttexthash="58448" _msthash="401">Admin</td>
                                    <td class="text-center" _msthidden="12">
                                        <a class="action-set" href="javascript:void(0);" data-bs-toggle="dropdown"
                                            aria-expanded="true">
                                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                        </a>
                                        <ul class="dropdown-menu" _msthidden="12">
                                            <li _msthidden="2">
                                                <a href="sales-details.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/eye1.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="402">
                                                    <font _mstmutation="1" _msttexthash="149084" _msthidden="1"
                                                        _msthash="403">Sale Detail</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="edit-sales.html" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/edit.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="404">
                                                    <font _mstmutation="1" _msttexthash="107679" _msthidden="1"
                                                        _msthash="405">Edit Sale</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#showpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/dollar-square.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="406">
                                                    <font _mstmutation="1" _msttexthash="208806" _msthidden="1"
                                                        _msthash="407">Show Payments</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item"
                                                    data-bs-toggle="modal" data-bs-target="#createpayment"
                                                    _msthidden="2"><img src="../../public/img/icons/plus-circle.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="408">
                                                    <font _mstmutation="1" _msttexthash="228878" _msthidden="1"
                                                        _msthash="409">Create Payment</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item" _msthidden="2"><img
                                                        src="../../public/img/icons/download.svg" class="me-2" alt="img"
                                                        _msthidden="A" _mstalt="32942" _msthash="410">
                                                    <font _mstmutation="1" _msttexthash="178490" _msthidden="1"
                                                        _msthash="411">Download pdf</font>
                                                </a>
                                            </li>
                                            <li _msthidden="2">
                                                <a href="javascript:void(0);" class="dropdown-item confirm-text"
                                                    _msthidden="2"><img src="../../public/img/icons/delete1.svg"
                                                        class="me-2" alt="img" _msthidden="A" _mstalt="32942"
                                                        _msthash="412">
                                                    <font _mstmutation="1" _msttexthash="148551" _msthidden="1"
                                                        _msthash="413">Delete Sale</font>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="dataTables_length" id="DataTables_Table_0_length"><label><select
                                    name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"
                                    class="custom-select custom-select-sm form-control form-control-sm">
                                    <option value="10" _msttexthash="9451" _msthash="414">10</option>
                                    <option value="25" _msttexthash="10062" _msthash="415">25</option>
                                    <option value="50" _msttexthash="9815" _msthash="416">50</option>
                                    <option value="100" _msttexthash="15067" _msthash="417">100</option>
                                </select></label></div>
                        <div class="dataTables_paginate paging_numbers" id="DataTables_Table_0_paginate">
                            <ul class="pagination">
                                <li class="paginate_button page-item active"><a href="#"
                                        aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0"
                                        class="page-link" _msttexthash="4459" _msthash="418">1</a></li>
                                <li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0"
                                        data-dt-idx="1" tabindex="0" class="page-link" _msttexthash="4550"
                                        _msthash="419">2</a></li>
                            </ul>
                        </div>
                        <div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite"
                            _msttexthash="342576" _msthash="420">1 - 10 de 11 artículos</div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>