$('#btnGenerateReport').click(function() {
	$.post('ReportController', {
		action: $('#selReportType').val(),
		reportDate: $('#txtReportDate').val()
	}, function(response) {
		generateReport(response);
	});
});

$('#btnPrint').click(function() {
	objReportTable.download("xlsx", reportName + ".xlsx");
});

function generateReport(response) {
	reportData = JSON.parse(response);

	switch ($('#selReportType').val()) {
		case 'getCurrentFinishedInventory':
			reportName = "CurrentFinishedInventory";
			reportCols = [
				{title: 'FPL ID', field: 'fplId'}, 
				{title: 'Date Finished', field: 'dateFinished'}, 
				{title: 'Quantity', field: 'quantity'},
				{title: 'SKU Code', field: 'skuCd'},
				{title: 'Branch ID', field: 'branchId'},
				{title: 'Material', field: 'materialName'}
		    ];
		    break;
		 case 'getPlannedRawMaterialsInventory':
			reportName = "PlannedRawMaterialsInventory";
			reportCols = [
				{title: 'Material', field: 'materialName'},
				{title: 'Quantity', field: 'quantity'}
		    ];
		    break;
		 case 'getProductionReport':
			reportName = "ProductionReport";
			reportCols = [
				{title: 'Material', field: 'materialName'},
				{title: 'Quantity', field: 'quantity'}
		    ];
		    break;
		 case 'getReceivedInventoryReport':
			reportName = "ReceivedInventoryReport";
			reportCols = [
				{title: 'Material', field: 'materialName'},
				{title: 'Quantity', field: 'quantity'},
				{title: 'Date Received', field: 'dateReceived'}
		    ];
		    break;
	}

	objReportTable = new Tabulator('#divReportTable', {
	    height: '300px',
	    layout: "fitColumns",
	    data: reportData,
	    pagination: 'local',
	    paginationSize: 8,
	    columns: reportCols
	});

	$('#btnPrint').prop('disabled', false);
}