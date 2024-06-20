<template>
    <div class="content">
<div class="page-header">
<div class="page-title">
<h4>Product Add</h4>
<h6>Create new product</h6>
</div>
</div>

<div class="card">
<div class="card-body">
<div class="row">
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Product Name</label>
<input type="text">
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Category</label>
<select class="select select2-hidden-accessible" data-select2-id="1" tabindex="-1" aria-hidden="true">
<option data-select2-id="3">Choose Category</option>
<option>Computers</option>
</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-fryb-container"><span class="select2-selection__rendered" id="select2-fryb-container" role="textbox" aria-readonly="true" title="Choose Category">Choose Category</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Sub Category</label>
<select class="select select2-hidden-accessible" data-select2-id="4" tabindex="-1" aria-hidden="true">
<option data-select2-id="6">Choose Sub Category</option>
<option>Fruits</option>
</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="5" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-0u44-container"><span class="select2-selection__rendered" id="select2-0u44-container" role="textbox" aria-readonly="true" title="Choose Sub Category">Choose Sub Category</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Brand</label>
<select class="select select2-hidden-accessible" data-select2-id="7" tabindex="-1" aria-hidden="true">
<option data-select2-id="9">Choose Brand</option>
<option>Brand</option>
</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="8" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-ym1c-container"><span class="select2-selection__rendered" id="select2-ym1c-container" role="textbox" aria-readonly="true" title="Choose Brand">Choose Brand</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Unit</label>
<select class="select select2-hidden-accessible" data-select2-id="10" tabindex="-1" aria-hidden="true">
<option data-select2-id="12">Choose Unit</option>
<option>Unit</option>
</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="11" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-fpfe-container"><span class="select2-selection__rendered" id="select2-fpfe-container" role="textbox" aria-readonly="true" title="Choose Unit">Choose Unit</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>SKU</label>
<input type="text">
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Minimum Qty</label>
<input type="text">
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Quantity</label>
<input type="text">
</div>
</div>
<div class="col-lg-12">
<div class="form-group">
<label>Description</label>
<textarea class="form-control"></textarea>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Tax</label>
<select class="select select2-hidden-accessible" data-select2-id="13" tabindex="-1" aria-hidden="true">
<option data-select2-id="15">Choose Tax</option>
<option>2%</option>
</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="14" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-m6ix-container"><span class="select2-selection__rendered" id="select2-m6ix-container" role="textbox" aria-readonly="true" title="Choose Tax">Choose Tax</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Discount Type</label>
<select class="select select2-hidden-accessible" data-select2-id="16" tabindex="-1" aria-hidden="true">
<option data-select2-id="18">Percentage</option>
<option>10%</option>
<option>20%</option>
</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="17" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-c5no-container"><span class="select2-selection__rendered" id="select2-c5no-container" role="textbox" aria-readonly="true" title="Percentage">Percentage</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label>Price</label>
<input type="text">
</div>
</div>
<div class="col-lg-3 col-sm-6 col-12">
<div class="form-group">
<label> Status</label>
<select class="select select2-hidden-accessible" data-select2-id="19" tabindex="-1" aria-hidden="true">
<option data-select2-id="21">Closed</option>
<option>Open</option>
</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="20" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-l1mb-container"><span class="select2-selection__rendered" id="select2-l1mb-container" role="textbox" aria-readonly="true" title="Closed">Closed</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
</div>
</div>
<div class="col-lg-12">
<div class="form-group">
<label> Product Image</label>
<div class="image-upload">
<input type="file">
<div class="image-uploads">
<img src="../../public/img/icons/upload.svg" alt="img">
<h4>Drag and drop a file to upload</h4>
</div>
</div>
</div>
</div>
<div class="col-lg-12">
<a href="javascript:void(0);" class="btn btn-submit me-2">Submit</a>
<a href="productlist.html" class="btn btn-cancel">Cancel</a>
</div>
</div>
</div>
</div>

</div>
</template>

<script>
    

</script>