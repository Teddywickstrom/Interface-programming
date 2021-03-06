

/*--global variables---*/
  var bought_array = {};
var total_price = 0;
var name ="";
var purchase_array = new Array;
var nonAlc_names = new Array();
var nonAlc_count = new Array();
var nonAlc_price = new Array();

/*---main ---*/
$(function (){ 
//Requesting data using jQuery 
var $main = $('#main'); //Id of html div
var username = localStorage.getItem('username'); //save username and password to see which ones should see all buttons 
var password = localStorage.getItem('password');
    
     if (!(username == 'jorass' || username == 'ervtod' || username == 'hirchr' || username == 'saksru' && 
            username == 'svetor')) {
         document.getElementById('admin_buttons').style.visibility = 'hidden';
        
         
     }

$.ajax({
    
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=inventory_get',

success: function(main){
//console.log(history);

//loop for all indices of array payload
    var beer_count = 0; //to make sure the loops stops when we have 17 beers
    var beer_count_nonAlc = 0;
    var names = new Array();
    var prices = new Array();
    var amounts = new Array();
    var beer_id = new Array();
    var namn_nonAlc = new Array();
  
    var buttons ="";
    var id_values = 1;
    var id_inc_button = 18;
    var id_dec_button = 35;
 

    /*---make call to fetch user that is logged in--*/
    $(function() {
        $.ajax({
  
	method: 'GET',
	url: 'http://pub.jamaica-inn.net/fpdb/api.php?username=' + username + '&password=' + password + '&action=iou_get',

success: function(main) {
    var first_name = main.payload[0].first_name;
    var last_name = main.payload[0].last_name;
     document.querySelector('.login_id').innerHTML = first_name +" "+ last_name;
    
}
        });
    });
    /*--- end call to get logged in user --* 
    /* Get arrays from localStorage */ 
    var BevStock = localStorage.getItem("count").split(',');
    var BevPrice = localStorage.getItem("prices").split(',');
    var BevName = localStorage.getItem("names").split(',');
    var NonAlcName = localStorage.getItem("NoAlcName").split(',');
    var NonAlcStock = localStorage.getItem("NoAlcStock").split(',');
     var NonAlcPrice = localStorage.getItem("NoAlcPrices").split(',');
    
    
    var id_noAlc = 52;
    var inc_noAlc = 55;
    var dec_noAlc = 58;
    
    /*loop over alcoholic beverages to fill up vending machine*/
    $.each(main.payload, function(i, its)  
           
{     
     if ( (BevStock[i] <200 && BevStock[i] > 0) && (BevName[i]!= "")  && (beer_count < 17)) {
         
         names += BevName[i] + ',' ;
         prices += BevPrice[i] +',';
         beer_id += its.beer_id +',';
         
         if (BevStock[i] > 10) {
             BevStock[i] = 10;
             
         }
          amounts += BevStock[i] + ',';
        
          
      
 $('#aform') 
        .attr("action","main.html") .attr("method","post") //set the form attributes
        //add in all the needed input elements

/*add to vending machine */         
$main.append( '<div class="small_box">' +
             '<input type="text" class ="values" id="'+id_values+'" value="0"/>' +
 			'<div class="small_box_text">'+  BevName[i]+'</div>' +
 			'<div class="small_box_text" id="'+beer_id[i]+"S"+'">'+ BevStock[i] + " left"+'</div> ' +  	
 			'<div class="small_box_text">'+ "price: " + BevPrice[i]+ " kr" + '</div>' + '<input type="button" id="'+id_inc_button+'" class="btn_increase" value="+">' + '</input>' +
             '<input type="button" id="'+id_dec_button+'" class="btn_decrease" value="-">' +' </input>' + '</div>' ); 
             beer_count++;
        id_values++;
         id_inc_button++;
         id_dec_button++;
                 
         
     }  
    });
   
 $.each(main.payload, function(i, its)  {
    /*append non alcoholic beverages*/
     if (beer_count_nonAlc < 3){
         if (NonAlcStock[i] > 10) {
             NonAlcStock[i] = 10;
         }
         $('#non-alcohol').append('<div class="small_box">' +
                                   '<input type="text" class ="values" id="'+id_noAlc+'" value="0"/>' +
                             '<div class="small_box_text">' + NonAlcName[i]+'</div>' +
                             '<div class="small_box_text">'+  NonAlcStock[i] +  " left" + '</div> '   +	
                             '<div class="small_box_text">'+ NonAlcPrice[i] + " kr" + '</div>' + '<input type="button" id="'+inc_noAlc+'" class="btn_increase" value="+">' + '</input>' +
             '<input type="button" id="'+dec_noAlc+'" class="btn_decrease" value="-">' +' </input>' + '</div>');
       
      beer_count_nonAlc++;
      inc_noAlc++;
      dec_noAlc++;
      id_noAlc++;
         names += NonAlcName[i] + ',' ;
         amounts += NonAlcStock[i] + ',';
         prices += NonAlcPrice[i] +',';
         beer_id += its.beer_id +',';
        
     }
 
 });

                    
    
 $('#55').click(function() {
             
        incrementValue("52",beer_id[17],names[17],amounts[17], prices[17]);
    });
     
    $('#58').click(function() {
       
        decreaseValue("52",beer_id[17],names[17],amounts[17], prices[17]);
 
    });
     $('#56').click(function() {
        
        incrementValue("53",beer_id[18],names[18],amounts[18], prices[18]);
    });
     
    $('#59').click(function() {
      
        decreaseValue("53",beer_id[18],names[18],amounts[18], prices[18]);
 
    });
     $('#57').click(function() {
       
        incrementValue("54",beer_id[19],names[19],amounts[19], prices[19]);
    });
     
    $('#60').click(function() {
   
        decreaseValue("54",beer_id[19],names[19],amounts[19], prices[19]);
 
    });
    
    
  
    /*super ugly! will implement loop here but don't know how to do it right now. This is to give every button a different id*/
    
     names = names.split(",");
 
    amounts = amounts.split(",");

    
    prices = prices.split(",");
 
    beer_id = beer_id.split(",");

  

    $('#18').click(function() {
        incrementValue("1", beer_id[0], names[0],amounts[0],prices[0]);
        
    });
     
    $('#35').click(function() {
         
        decreaseValue("1",beer_id[0], names[0],amounts[0],prices[0]);
 
    });
    $('#19').click(function() {
       
        incrementValue("2",beer_id[1], names[1], amounts[1],prices[1]);
    });
     
    $('#36').click(function() {
       
        decreaseValue("2",beer_id[1],names[1],amounts[1],prices[1]);
 
    });
     $('#20').click(function() {
        
        incrementValue("3",beer_id[2], names[2],amounts[2],prices[2]);
         
    });
     
    $('#37').click(function() {
       
        decreaseValue("3",beer_id[2], names[2],amounts[2],prices[2]);
 
    });
     $('#21').click(function() {
  
        incrementValue("4",beer_id[3],names[3],amounts[3],prices[3]);
    });
     
    $('#38').click(function() {
   
        decreaseValue("4",beer_id[3],names[3],amounts[3],prices[3]);
 
    });
    $('#22').click(function() {

        incrementValue("5",beer_id[4], names[4],amounts[4],prices[4]);
    });
     
    $('#39').click(function() {
   
        decreaseValue("5",beer_id[4], names[4],amounts[4],prices[4]);
 
    });
     $('#23').click(function() {
   
        incrementValue("6",beer_id[5], names[5],amounts[5],prices[5]);
    });
     
    $('#40').click(function() {
     
        decreaseValue("6", beer_id[5],names[5],amounts[5],prices[5]);
 
    });
     $('#24').click(function() {
  
        incrementValue("7",beer_id[6], names[6],amounts[6],prices[6]);
    });
     
    $('#41').click(function() {
  
        decreaseValue("7",beer_id[6],names[6],amounts[6],prices[6]);
 
    });
    $('#25').click(function() {
       
        incrementValue("8", beer_id[7],names[7],amounts[7],prices[7]);
    });
     
    $('#42').click(function() {
     
        decreaseValue("8",beer_id[7],names[7],amounts[7],prices[7]);
 
    });
     $('#26').click(function() {
   
        incrementValue("9",beer_id[8],names[8],amounts[8],prices[8]);
    });
     
    $('#43').click(function() {
     
        decreaseValue("9",beer_id[8],names[8],amounts[8],prices[8]);
 
    }); 
    
    
    $('#27').click(function() {

        incrementValue("10",beer_id[9],names[9],amounts[9],prices[9]);
    });
     
    $('#44').click(function() {
    
        decreaseValue("10",beer_id[9],names[9],amounts[9],prices[9]);
 
    });
    $('#28').click(function() {
        
        incrementValue("11",beer_id[10],names[10],amounts[10],prices[10]);
    });
     
    $('#45').click(function() {
        
        decreaseValue("11",beer_id[10],names[10],amounts[10],prices[10]);
    });
     $('#29').click(function() {
        
        incrementValue("12",beer_id[11],names[11], amounts[11],prices[11]);
    });
     
    $('#46').click(function() {
     
        decreaseValue("12",beer_id[11],names[11],amounts[11],prices[11]);
 
    });
     $('#30').click(function() {
    
        incrementValue("13",beer_id[12],names[12],amounts[12],prices[12]);
    });
     
    $('#47').click(function() {
     
        decreaseValue("13", beer_id[12],names[12],amounts[12],prices[12]);
 
    });
    $('#31').click(function() {
       
        incrementValue("14",beer_id[13], names[13],amounts[13],prices[13]);
    });
     
    $('#48').click(function() {
       
        decreaseValue("14",beer_id[13], names[13],amounts[13],prices[13]);
 
    });
     $('#32').click(function() {
     
        incrementValue("15",beer_id[14],names[14],amounts[14],prices[14]);
    });
     
    $('#49').click(function() {
      
        decreaseValue("15",beer_id[14],names[14],amounts[14],prices[14]);
 
    });
     $('#33').click(function() {
  
        incrementValue("16",beer_id[15],names[15],amounts[15],prices[15]);
    });
     
    $('#50').click(function() {
     
        decreaseValue("16",beer_id[15],names[15],amounts[15],prices[15]);
 
    });
    $('#34').click(function() {
       
        incrementValue("17",beer_id[16],names[16],amounts[16],prices[16]);
    });
     
    $('#51').click(function() {
    
        decreaseValue("17",beer_id[16],names[16],amounts[16], prices[16]); 
 
    });
    
}
       });
           

});
   
/* ----------------------- DropDown ----------------------- */

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
   
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
      // connectionAPI();
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
    $("#nonAlc_button").click(function() {
    
    $('html, .boxes').animate({
        scrollTop: $("#non-alcohol").offset().top
    }, 500);
});
    /* $("#Alc_button").click(function() {
    
    $('html, body').animate({
        scrollTop: $("#non-alcohol").offset().top
 });   }, 500); */
}

    



/*---confirm purchase. When click on BUY, the user can see what he/she bought, what the total was as well as new credit--*/
function confirmPurchase() {
    
    

    window.confirm("Purchase confirmed!\n\n Here is what you bought:\n\n" + purchase_array + "\nYour total was " + total_price +" kr");
    clearAll();
    purchase_array ="";
    
}
          
  
/*-- increase number of beers person wants to buy. increments number in value box by one and makes number red to make it easier for the customer to see that he/she has picked that certain beer. Also adds to total price. --*/
function incrementValue(number, beer_id,namn, count, price)
{
    

    
var value = parseInt(document.getElementById(number).value, 10);
    value = isNaN(value) ? 0 : value;
    if (count != 0) {
    document.getElementById('text').innerHTML ="";

 if(value < count && count > 0){
     count = count - 1;
     document.getElementById(number).style.color = 'red';
       value++;
      purchase_array += namn + ','  ;
     purchase_array = purchase_array.split(',');
     
     /*LÄGG IN SÅ ANTALET ÄNDRAS I BOXEN OCKSÅ 
     var BevStock = localStorage.getItem("count").split(',');
     var BevName = localStorage.getItem("names").split(',');
    
    
    var index = BevName.indexOf(count);
     
    BevStock[index] = count;
    localStorage.setItem("count", BevStock);
     alert(localStorage.getItem("count", BevStock));
    document.getElementById(beer_id[index]+"S").innerHTML = count +"left";*/
     

     
    document.getElementById(number).value = value;
      $("#text").append(purchase_array); 
  
   total_price += parseFloat(price);
     document.getElementById("total_number").innerHTML = total_price.toPrecision(3); 
      
 
 }
    }

}


/*--decrease number of beers person wants to buy --*/
function decreaseValue(number,beer_id, name,count,price, timesClicked)
{
 
    var value = parseInt(document.getElementById(number).value, 10);
    value = isNaN(value) ? 0 : value;
    if (value-1 == 0) {
             document.getElementById(number).style.color = 'black';
    }
    if( value > 0) {
          value--;

      
        var index = purchase_array.indexOf(name);
     
           
               purchase_array.splice(index,1);
        document.getElementById('text').innerHTML = purchase_array;
           total_price -= parseFloat(price);
         document.getElementById("total_number").innerHTML = total_price.toPrecision(3);
        
            }
             document.getElementById(number).value = value;
        }
        
/*-- clear button, removes all beers in the cart and resets the number in each box to zero as well as makes the numbers black again. Also sets the total amount to zero --*/
function clearAll(){
     $('#text').html("");
    purchase_array ="";
    total_price = 0;
     document.getElementById("total_number").innerHTML = total_price; 

    $(".values").val("0");
      $('.values').css({"color":"black"});
    
    
    
    
}
