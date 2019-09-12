var sheetsArray = [];
var LOADED = 0;

var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name";
var FILTER_OA = "Open Access";
var FILTER_ISI = "ISI Journal";
var FILTER_TOTAL = "Total Publications";
var TP_SHEET = "5.1 SH Total Papers";
var OA_SHEET = "5.4 SH Percent of OA ";
var ISI_SHEET = "5.5 SH Percent of ISI";
var OABAR_SHEET = "5.4 SH Papers Bar OA and ISI";
var OATOTAL_SHEET= "5.4 SH Papers Circle OA";
var ISITOTAL_SHEET= "5.5 SH Papers Circle ISI";
var LIST_SHEET = "5.2 SH Papers Detail";

$(document).ready(init);

function init() {

    //Total papers
    var papersdiv = document.getElementById("total-papers"),
        papersurl = appConfig.tableauView + "/5_1DBTotalPapers",
        papersoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-papers iframe').attr("scrolling", "no");
                $('#total-papers iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalpapers = new tableau.Viz(papersdiv, papersurl, papersoptions);

    //Top 10 Journals
    var topJournalsdiv = document.getElementById("top-journals"),
        topJournalsurl = appConfig.tableauView + "/5_7DBPapersTop10Journals",
        topJournalsoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#top-journals iframe').attr("scrolling", "no");
                $('#top-journals iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    topJournals = new tableau.Viz(topJournalsdiv, topJournalsurl, topJournalsoptions);

    //OA - ISI
    var totaloaisidiv = document.getElementById("total-oaisi"),
        totaloaisiurl = appConfig.tableauView + "/5_6DBPapersISI-OABar",
        totaloaisioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-oaisi iframe').attr("scrolling", "no");
                $('#total-oaisi iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totaloaisi = new tableau.Viz(totaloaisidiv, totaloaisiurl, totaloaisioptions);

    //Papers List
    var papersldiv = document.getElementById("papers-list"),
        paperslurl = appConfig.tableauView + "/5_5DBPapersDetail",
        papersloptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#papers-list iframe').attr("scrolling", "no");
                $('#papers-list iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    plist = new tableau.Viz(papersldiv, paperslurl, papersloptions);

}

function loadSheets(){
  sheetsArray = [
    totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
    plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  if (LOADED == 4) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
}

// Close yellow disclaimer in all sections after closing it once
const showMsgP = sessionStorage.getItem('showMsgP');

if(showMsgP == 'false'){
  $('.publications-disclaimer').hide();
} else {
  $('.publications-disclaimer').show();
}

$('.closep').on('click', function(){
  $('.publications-disclaimer').fadeOut('slow');
  sessionStorage.setItem('showMsgP', 'false');
});

//Select OA
function selectedOA (marks) {
    clearDashboardFilter(sheetsArray, FILTER_OA);
    $(".checkedoa").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_OA) {
                oaValue = pair.formattedValue;
                if (oaValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_OA, oaValue);
                    $(".checkedoa").text("Open Acces Publications").addClass("closebutton");
                    $(".checkedoa").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedoa").show();
                    $(".checkedoa, .clearfilters").on('click', clearOAfilters);
                }
            }
        }
    }
}

//Select ISI
function selectedISI (marks) {
    clearDashboardFilter(sheetsArray, FILTER_ISI);
    $(".checkedisi").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_ISI) {
                isiValue = pair.formattedValue;
                if (isiValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_ISI, isiValue);
                    $(".checkedisi").text("ISI Publications").addClass("closebutton");
                    $(".checkedisi").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedisi").show();
                    $(".checkedisi, .clearfilters").on('click', clearISIfilters);
                }
            }
        }
    }
}

/**** Clear functions ****/

//   Clear CRP
function clearCRPfilters() {
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Portfolio');
    $('input[value="All"]').prop('checked', true);
};

//   Clear Year
function clearYearsfilters() {
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};
