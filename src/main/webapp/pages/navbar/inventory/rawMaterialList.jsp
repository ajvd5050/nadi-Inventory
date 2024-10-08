<div class="toast-container position-fixed top-0 end-0 p-3">
  	<div id="errorToast" class="toast text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
    	<div class="toast-header text-bg-danger">
      		<i class="bi bi-exclamation-triangle-fill me-2"></i>
      		<strong class="me-auto">Error</strong>
      		<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    	</div>
    	<div class="toast-body">
      		<div id="errorMessage"></div>
    	</div>
  	</div>
</div>
  
<div class="m-4 mainWrapper">
	<main role="main">
		<div  class="d-flex justify-content-between align-items-center contentNavbar">
			<h1 class="h1"><i class="bi bi-boxes me-2 ms-3"></i>Raw Material List</h1>
			<div class="btn-toolbar mb-2 mb-md-0 me-3 ms-2">
				<button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#addModal">+ add</button>
				<button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#updateModal" id="btnUpdateMaterial">Update</button>
				<button type="button" class="btn btn-danger  me-2" data-bs-toggle="modal" data-bs-target="#deleteModal" id="btnDeleteMaterial">Delete</button>
			</div>
		</div>
		<div class="container mt-4 pb-3">
			<div class="mb-4" id="divRawMaterialTable"></div>
		</div>
	</main>

	<!--Add Modal-->
	<div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header border-0 modalHeader">
					<h5 class="modal-title" id="exampleModalLabel">Add raw materials:</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body border-0 modalBody">
					<form>
						<div class="mb-3">
							<label for="rawMaterialId" class="col-form-label">Material ID:</label>
							<input type="text" class="form-control" id="rawMaterialId" value="0" placeholder="0" readonly>
						</div>
						<div class="mb-3">
							<label for="rawMaterialListName" class="col-form-label">Material:</label>
							<select class="form-select" id="rawMaterialListName">
								<option></option>
							</select> 
						</div>
						<div class="mb-3">
							<label for="rawMaterialListQuantity" class="col-form-label">Quantity:</label>
							<input type="text" class="form-control"
								id="rawMaterialListQuantity">
						</div>
						<div class="mb-3">
							<label for="material-date">Date</label> 
							<input id="dateSelected" class="form-control" type="date" />
						</div>
					</form>
				</div>
				<div class="modal-footer border-0 modalFooter">
					<button type="button" class="btn btn-secondary btnCloseAddModal" data-bs-dismiss="modal" id="btnCloseAddModal">Close</button>
					<button type="button" class="btn btn-primary" id="btnAddRawMaterial">Add Material</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- update modal -->
	<div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header border-0 modalHeader">
					<h5 class="modal-title" id="exampleModalLabel">Update raw materials:</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body border-0 modalBody">
					<form>
						<div class="mb-3">
							<label for="rawMaterialId" class="col-form-label">Material ID:</label>
							<input type="text" class="form-control" id="updateRawMaterialId" readonly>
						</div>
						<div class="mb-3">
							<label for="updateRawMaterialName" class="col-form-label">Material:</label>
							<select class="form-select" id="updateRawMaterialName">
								<option></option>
							</select> 
						</div>
						<div class="mb-3">
							<label for="updateRawMaterialQuantity" class="col-form-label">Quantity:</label>
							<input type="text" class="form-control" id="updateRawMaterialQuantity">
						</div>
						<div class="mb-3">
							<label for="updateDate">Date</label> 
							<input id="updateDate" class="form-control" type="date" />
						</div>
					</form>
				</div>
				<div class="modal-footer border-0 modalFooter">
					<button type="button" class="btn btn-secondary btnCloseAddModal" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" id="btnUpdateRawMaterial">update material</button>
				</div>
			</div>
		</div>
	</div>

	<!-- delete modal-->
	<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header border-0 modalHeader">
					<h5 class="modal-title" id="exampleModalLabel">Delete row:</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body border-0 modalBody">
					<form>
						<div class="mb-3">
							<input type="text" class="form-control d-none" id="deleteRawMaterialId">
							<input type="text" class="form-control d-none" id="deleteRawMaterialCode">
							<input type="text" class="form-control d-none" id="deleteRawMaterialName">
							<input type="text" class="form-control d-none" id="deleteRawMaterialQuantity">
							<input type="text" class="form-control d-none" id="deleteRawMaterialUserId">
							<input type="text" class="form-control d-none" id="deleteRawMaterialDate">
							<input type="text" class="form-control d-none" id="deleteRawMaterialBranchId">
						</div>
						<div class="mb-3">
							<span>Are you sure you want to delete this row?</span>
						</div>
					</form>
				</div>
				<div class="modal-footer border-0 modalFooter">
					<button type="button" class="btn btn-danger" id="btnDeleteRawMaterial">Yes</button>
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="btnDeleteRawMaterialCancel">No</button>				
				</div>
			</div>
		</div>
	</div>
</div>
<script type=text/javascript>
	var rawMaterialList = JSON.parse('${rawMaterialList}');
	var materialOptions = JSON.parse('${material}');
</script>
<script src="js/navbar/inventory/raw_material_list.js"></script>