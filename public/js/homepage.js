var sheetsArray = [];
var LOADED = 0;

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'slo-bar', view: 'HomeDB-SLOBarTop' },
    { elementID: 'oicr-chart', view: 'HomeDB-OICRBarchartyear' },
    { elementID: 'total-innovations', view: 'HomeDB-InnovCount' },
    { elementID: 'total-partnerships', view: 'HomeDB-PartnershipCount' },
    { elementID: 'total-capDev', view: 'HomeDB-CapDevCount' },
    { elementID: 'total-publications', view: 'HomeDB-PublicationsCount' },
    { elementID: 'total-policies', view: 'HomeDB-PoliciesCount' },
    { elementID: 'total-altmetric', view: 'HomeDB-AltmetricCount' }
  ];

  vizInitialited = [];
  $.each(vizDataArray, function (i, data) {
    vizInitialited.push(createTableauViz(data.elementID, data.view, [onSelectWorkSheet]))
  });

}

function loadSheets() {
  $.each(vizInitialited, function (i, viz) {
    var sheetsList = viz.getWorkbook().getActiveSheet().getWorksheets();
    $.each(sheetsList, function (i, s) {
      sheetsArray.push(s);
    });
  });
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  if (LOADED == vizDataArray.length) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
}

function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    //filters
  });
}
