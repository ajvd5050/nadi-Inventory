var rawMaterials = new Tabulator("#divRawMaterialTable" , {
	layout: 'fitColumns',
	data: rawMaterial,
	pagination: 'local',
	pagination: true,
	paginationSize: 5,
	paginationSizeSelector:[5, 10, 15, 20],
	paginationCounter:"rows",
	selectableRows:1,
	movableColumns:true,
	responsiveLayout:true,
	columns: [
		{title:"Material Code", field: 'materialCode'},
		{title:"Material Name", field: 'materialName'},
		{title:"Unit of Measurement", field: 'unitOfMeasurement'},
		{title:"Active", field: 'isActive'}
	],
});

$('#btnShowUpdateRawMaterial').hide();
$('#btnShowDeleteRawMaterial').hide();

rawMaterials.on('rowClick',function() {
	let row = rawMaterials.getSelectedData()[0];
	if (row !== undefined) {
		populateForm(row);
		populateDeleteForm(row);
		$('#btnShowUpdateRawMaterial').show();
		$('#btnShowDeleteRawMaterial').show();
	} else {
		resetForm();
		$('#btnShowUpdateRawMaterial').hide();
		$('#btnShowUpdateRawMaterial').hide();
	}
})

function populateForm(row) {
	if(row !== undefined) {
		$('#txtUpdateRawMaterialCode').val(row.materialCode)
		$('#txtUpdateRawMaterialName').val(row.materialName);
		$('#txtUpdateRawMaterialUnit').val(row.unitOfMeasurement);
		row.isActive === 'y' ? $('#chkUpdateRawMaterialIsActive').prop('checked', true) : $('#chkUpdateRawMaterialIsActive').prop('checked', false);
	}
}

function populateDeleteForm(row) {
	if(row !== undefined) {
		$('#deleteRawMaterialCode').val(row.materialCode)
		$('#deleteRawMaterialName').val(row.materialName);
		$('#deleteRawMaterialUnit').val(row.unitOfMeasurement);
		$('#deleteRawMaterialStatus').val(row.isActive);	
	}
}

function createItem(crudOperation) {
	let rawMaterial;
	if (crudOperation === "create"){
		item = {
			materialCode: $('#txtMaterialCode').val() !== '' ? $('#txtMaterialCode').val() : '',
			materialName: $('#txtRawMaterialName').val(),
			unitOfMeasurement: $('#txtRawMaterialUnit').val(),
			isActive: $('#chkRawMaterialIsActive').is(':checked') ? 'y' : 'n',
		};
	} else if (crudOperation === "update"){
		item = {
			materialCode: $('#txtUpdateRawMaterialCode').val() !== '' ? $('#txtUpdateRawMaterialCode').val() : '',
			materialName: $('#txtUpdateRawMaterialName').val(),
			unitOfMeasurement: $('#txtUpdateRawMaterialUnit').val(),
			isActive: $('#chkUpdateRawMaterialIsActive').is(':checked') ? 'y' : 'n',
		};
	} else if (crudOperation === "delete"){
		item = {
			materialCode: $('#deleteRawMaterialCode').val() !== '' ? $('#deleteRawMaterialCode').val() : '',
			materialName: $('#deleteRawMaterialName').val(),
			unitOfMeasurement: $('#deleteRawMaterialUnit').val(),
			isActive: $('#deleteRawMaterialStatus').val()
		}
	}
	return item;
}

function validate(item) {
    let valid = true;
    if (item.materialName === '') {
        alert('Please fill out the Material Name');
        valid = false;
    }
    return valid;
}

function addItem(crudOperation) {
    let item = createItem(crudOperation);
	console.log(item);
	if (validate(item)) {
        $.post('RawMaterialController', {
            action: 'saveItem',
            item: JSON.stringify(item)
        }, function(response) {
            if (response.includes('success')) {
				$('.btnCloseModal').click();
                $('#btnMngMaterial').click();
            } else {
                alert('Unable to save changes');
            }
        });
    }
}


$('#btnAddRawMaterial').click(function(){
	addItem("create");
});
$('#btnUpdateRawMaterial').click(function(){
	addItem("update");
});

$('#btnDeleteRawMaterial').click(function() {
	console.log("DELETE");
	if ($('#deleteRawMaterialCode').val() !== '') {
		$.post('RawMaterialController', {
			action: 'deleteItem',
			item: JSON.stringify(createItem("delete"))
		}, function(response) {
			if (response.includes('success')) {
				$('#btnDeleteRawMaterialCancel').click();
				$('#btnRawMaterials').click();
			} else {
				$('#divAlert').removeClass('d-none');
				$('#divAlert').html('Unable to save changes');
			}
		});
	} else {
		$('#divAlert').removeClass('d-none');
		$('#divAlert').html('Please select an item to delete');
	}
});


/*
function toggleAddButton() {
    if ('' === $('#txtMaterialCode').val()) {
        $('#btnAdd').html('Add');
    } else {
        $('#btnAdd').html('Update');
    }
}

function bindRowsClick(rawMaterial) {
    $.each(rawMaterial, function(index, item) {
        $('#item' + index + 'row').click(function() {
            $('#chkIsActive').prop('checked', item.isActive === 'y');
            $('#txtMaterialCode').val(item.materialCode);
            $('#txtMaterialName').val(item.materialName);
            $('#txtUnitOfMeasurement').val(item.unitOfMeasurement);
            toggleAddButton();
        });
    });
}

function createRawMaterialTable(rawMaterial) {
    let html = '';
    html += '<table class="rawMaterial">';
    html += '  <tr>';
    html += '    <th>Material Code</th>';
    html += '    <th>Material Name</th>';
    html += '    <th>Unit of Measurement</th>';
    html += '    <th>Active</th>'; 
    html += '  </tr>';
    $.each(rawMaterial, function(index, item) {
        html += '<tr id="item' + index + 'row">';
        html += '  <td id="item' + index + 'code">' + item.materialCode + '</td>';
        html += '  <td id="item' + index + 'name" class="center-aligned">' + item.materialName + '</td>';
        html += '  <td>' + item.unitOfMeasurement + '</td>';
        html += '  <td>' + (item.isActive === 'y' ? 'Yes' : 'No') + '</td>';
        html += '</tr>';
    });
    html += '</table>';
    $('#divRawMaterialTable').html(html);
    bindRowsClick(rawMaterial);
}

function createItem() {
    let item = {
        isActive: $('#chkIsActive').is(':checked') ? 'y' : 'n',
        materialCode: $('#txtMaterialCode').val() !== '' ? $('#txtMaterialCode').val() : '',
        materialName: $('#txtMaterialName').val(),
        unitOfMeasurement: $('#txtUnitOfMeasurement').val()
    };
    return item;
}

function validate(item) {
    let valid = true;
    if (item.materialName === '') {
        alert('Please fill out the Material Name');
        valid = false;
    }
    return valid;
}

function addItem() {
    let item = createItem();
    if (validate(item)) {
        $.post('RawMaterialController', {
            action: 'saveItem',
            item: JSON.stringify(item)
        }, function(response) {
            if (response.includes('success')) {
                $('#btnMngRawMaterial').click();
            } else {
                alert('Unable to save changes');
            }
        });
    }
}

$('#btnAdd').click(addItem);

function resetRawMaterialForm() {
    $('#chkIsActive').prop('checked', false);
    $('#txtMaterialCode').val('');
    $('#txtMaterialName').val('');
    $('#txtUnitOfMeasurement').val('');
    toggleAddButton();
}

$('#btnClear').click(resetRawMaterialForm);

$('#btnDelete').click(function() {
    if ($('#txtMaterialCode').val() !== '') {
        let item = createItem();
        $.post('RawMaterialController', {
            action: 'deleteItem',
            item: JSON.stringify(item)
        }, function(response) {
            if (response.includes('success')) {
                $('#btnMngRawMaterial').click();
            } else {
                alert('Unable to delete item');
            }
        });
    } else {
        alert('Please select a Raw Material to delete');
    }
});

createRawMaterialTable(rawMaterial);
*/
