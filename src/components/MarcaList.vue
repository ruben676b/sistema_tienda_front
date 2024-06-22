<template>
    <div>
        <div >
            <div class="content">
                <div class="page-header">
                    <div class="page-title">
                        <h4>Lista de Marcas</h4>
                    </div>
                    <div class="page-btn">
                        <a href="addproduct.html" class="btn btn-added"><img src="../../public/img/icons/plus.svg" alt="img"
                   
                                class="me-1">Agregar Nueva Marca</a>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="table-top">
                            <div class="search-set">
                                <div class="search-path">
                                    <a class="btn btn-filter" id="filter_search">
                                        <img src="../../public/img/icons/filter.svg" alt="img">
                                        <span><img src="../../public/img/icons/closes.svg" alt="img"></span>
                                    </a>
                                </div>
                                <div class="search-input">
                                    <a class="btn btn-searchset"><img src="../../public/img/icons/search-white.svg"
                                            alt="img"></a>
                                </div>
                            </div>
                            <div class="wordset">
                                <ul>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img
                                                src="../../public/img/icons/pdf.svg" alt="img"></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img
                                                src="../../public/img/icons/excel.svg" alt="img"></a>
                                    </li>
                                    <li>
                                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img
                                                src="../../public/img/icons/printer.svg" alt="img"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table  datanew">
                                <thead>
                                    <tr>
                                        <th>
                                            <label class="checkboxs">
                                                <input type="checkbox" id="select-all">
                                                <span class="checkmarks"></span>
                                            </label>
                                        </th>
                                        <th>Nombre</th>
                                        <th>Codigo Marca</th>
                                        <th>Logo Marca</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label class="checkboxs">
                                                <input type="checkbox">
                                                <span class="checkmarks"></span>
                                            </label>
                                        </td>
                                        <td>Gloria</td>
                                        <td>1</td>
                                        <td class="productimgname">
                                            <a href="javascript:void(0);" class="product-img">
                                                <img src="../../public/img/marca1.png" alt="product">
                                            </a>
                                        </td>
                                        <td>
                                            <a class="me-3" href="product-details.html">
                                                <img src="../../public/img/icons/eye.svg" alt="img">
                                            </a>
                                            <a class="me-3" href="editproduct.html">
                                                <img src="../../public/img/icons/edit.svg" alt="img">
                                            </a>
                                            <a class="confirm-text" href="javascript:void(0);">
                                                <img src="../../public/img/icons/delete.svg" alt="img">
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>