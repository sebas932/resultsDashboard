var sheetsArray = [];
var loadedCount = 0;

//Filters
var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name -To use";
var FILTER_REGION = "Geographic Scope ";
var FILTER_GLOBAL = "Reg Un Name";
var FILTER_DEGREE = "Degree of Innovation";
var FILTER_CGIAR = "Acronym (Dim Ext Partners) #1";
var FILTER_NONCGIAR = "Name (Dim Ext Partners) #1";

//Sheets
var ITYPE_SHEET = "2.2 Innovation by Type -pie ";
var ISTAGE_SHEET = "2.2 Innovation by Stage - pie";
var ILIST_SHEET = "2.5 Innov Detail ";
var IMAP_SHEET = "2.6 SH Innovations Map";
var TI_SHEET = "2.3 SH Innov Count";
var TAI_SHEET = "2.7 SH Innov Count Percentage ";
var GLOBAL_SHEET = "2.7 SH Innovations Map Global";
var REGIONAL_SHEET = "2.8 SH Innovations Map Regional";
var CGIARORGS_SHEET = "2.10 SH Innovations CGIAR Contributing Orgs";
var NONCGIARORGS_SHEET = "2.10 SH Innovations nonCGIAR Contributing Orgs";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: '2_1DBInnovations' }
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
  loadedCount += 1;
  if (loadedCount == vizDataArray.length) {
    //$("#loadingModal").modal('hide');
    $(".loadingBlock").fadeOut();
    // Load sheets
    loadSheets();
  }
}

function onSelectWorkSheet(mEvent) {
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function (marks) {
    switch(selectedSheetName) {
      case ISTAGE_SHEET:
        setFilterWorksheet(marks, FILTER_STAGE, sheetsArray, selectedSheet, selectedSheetName, 'Stage');
        break;
      case ITYPE_SHEET:
        setFilterWorksheet(marks, FILTER_TYPE, sheetsArray, selectedSheet, selectedSheetName, 'Type');
        break;
      case IMAP_SHEET:
        setFilterWorksheet(marks, FILTER_MAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case CGIARORGS_SHEET:
        setFilterWorksheet(marks, FILTER_CGIAR, sheetsArray, selectedSheet, selectedSheetName, 'Lead Organization');
        break;
      case NONCGIARORGS_SHEET:
        setFilterWorksheet(marks, FILTER_NONCGIAR, sheetsArray, selectedSheet, selectedSheetName, 'Contributing Organization');
        break;
    }
  });
}