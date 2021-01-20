const CALENDAR = function () { 
    let wrap, label,  
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 

    function init(newWrap) { 

    } 

    function switchMonth(next, month, year) { 

    } 

    function createCal(year, month) { 

    } 
    createCal.cache = {}; 
    return { 
        init : init, 
        switchMonth : switchMonth, 
        createCal   : createCal 
    }; 
};

wrap     = $(newWrap || "#cal"); 
label    = wrap.find("#label"); 
wrap.find("#prev").bind("click.calendar", function () { switchMonth(false); }); 
wrap.find("#next").bind("click.calendar", function () { switchMonth(true);  }); 
label.bind("click", function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear()); });        
label.click();

let curr = label.text().trim().split(" "), calendar, tempYear =  parseInt(curr[1], 10); 
month = month || ((next) ? ( (curr[0] === "December") ? 0 : months.indexOf(curr[0]) + 1 ) : ( (curr[0] === "January") ? 11 : months.indexOf(curr[0]) - 1 )); 
year = year || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear - 1 : tempYear);

if (!month) { 
    if (next) { 
        if (curr[0] === "December") { 
            month = 0; 
        } else { 
            month = months.indexOf(curr[0]) + 1; 
        } 
    } else { 
        if (curr[0] === "January") { 
            month = 11; 
        } else { 
            month = months.indexOf(curr[0]) - 1; 
        } 
    } 
}

if (!year) { 
    if (next && month === 0) { 
        year = tempYear + 1; 
    } else if (!next && month === 11) { 
        year = tempYear - 1; 
    } else { 
        year = tempYear; 
    } 
}

calendar =  createCal(year, month); 
$("#cal-frame", wrap) 
    .find(".curr") 
        .removeClass("curr") 
        .addClass("temp") 
    .end() 
    .prepend(calendar.calendar()) 
    .find(".temp") 
        .fadeOut("slow", function () { $(this).remove(); }); 
 
$('#label').text(calendar.label);