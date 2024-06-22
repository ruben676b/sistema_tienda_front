vue
Copiar código
<template>
    <div>
        <!-- Page Wrapper -->
        <div class="page-wrapper">
            <div class="content">
                <!-- Page Header -->
                <div class="page-header">
                    <div class="page-title">
                        <h4>Agregar Nueva Marca</h4>
                    </div>
                </div>
                <!-- /Page Header -->

                <!-- Card -->
                <div class="card">
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-lg-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label>Nombre de la Marca</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-sm-6 col-12">
                                    <div class="form-group">
                                        <label>Código de la Marca</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label>Imagen de la Marca</label>
                                        <div class="image-upload">
                                            <input type="file" class="form-control">
                                            <div class="image-uploads">
                                                <img src="../../public/img/icons/upload.svg" alt="img">
                                                <h4>Arrastra y suelta un archivo para subir</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <button type="submit" class="btn btn-submit me-2">Guardar</button>
                                    <a href="brandlist.html" class="btn btn-cancel">Cancelar</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /Card -->
            </div>
        </div>
        <!-- /Page Wrapper -->
    </div>
</template>

<script>
export default {
    name: 'AddMarcas',
    methods: {
        handleSubmit() {
            // Handle form submission
        }
    }
}
</script>

<style scoped>
/* Add any scoped CSS here if needed */
</style>