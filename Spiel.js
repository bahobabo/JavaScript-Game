/**
 * 
 */
 
 
 function farbeWählen(e){
	let id=e.target.id
	let value=e.target.value;
	
	$('#'+id).css('backgroundColor', value);
	
}

let runde=1

function check4Color(){
	
	 const colors = document.querySelectorAll('.color');
	    let alleAusgewählt = true
	    colors.forEach(function(selected){
		if(selected.value==0){ alleAusgewählt = false;return false}
	    
	    })
	    return alleAusgewählt;
	
}

 function farbeSetzen(e){
	
		let value=(e.target.value)
		let id=(e.target.id)
        const klasse = 'tr'+runde
        let zelle= $('.'+klasse).find('#'+id);
        
	    zelle.css('backgroundColor', value);
	    
	  
	    if(check4Color()){runde++; const colors = document.querySelectorAll('.color');console.log("ausgewählte farben:"+leseValues(colors))
	    colors.forEach(function(selected){
		                                     selected.value=0; 
	                                         selected.style.backgroundColor='white'})
	                                                        
	                                                       
	                                     }
	                                     else{console.log("noch nicht 4 gesetz farbe setzen")}
	                  
	      }
	      
	function leseValues(array){
		values=[];
		array.forEach(function(x){values.push(x.value)})
		return values;
	}
	
	
	function restart(){
		location.reload()
	}
	
	
	let Lösung=[]
function FarbeErstellen(){
	
		
		const farben = ['red', 'blue', 'green', 'yellow'];

// Funktion zum Mischen der Elemente im Array

  for (let i = farben.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [farben[i], farben[j]] = [farben[j], farben[i]];
  }
 console.log("rictigeFarben:"+farben)
 Lösung=farben;
 
//$('#at-item').hide()

}

function checkRichtig(){
	
	let anzahlGleicherWerte=0
	
	if(check4Color()){ 
		
		let colors=document.querySelectorAll('.color');
	    let colorsvalue=leseValues(colors)
	
	 
	 for (let i = 0; i < Lösung.length; i++) {
    if (Lösung[i] === colorsvalue[i]) { 
      anzahlGleicherWerte++;
                 }
  }

	 let neuesElement = document.createElement('p');

     neuesElement.textContent = 'Richtige Farben/Positionen:'+anzahlGleicherWerte;
     $('#scor').append(neuesElement)
     
     if(anzahlGleicherWerte==4){
	console.log("Gewonnen!!!!")
	checkPunkte();
}
     
    
}

}


function checkPunkte(){
	
	let punkte=110-(runde*10);
	console.log(punkte)
	$('#punkte').val(punkte)
	
	var namehtml= $('#name').val();
	var punktehtml= punkte
	
	$.ajax({ url:'http://localhost:3000',
		     type:'post',
	         data:{'name':namehtml,'punkte':punktehtml},
	         //dataType: 'json',
	         success:function(data){ // document.body.innerHTML = (data);
	         
	          $('#table').empty();
    var scoreText = $('<p>').text('Your Score: ' + punktehtml).css('color', 'red');
    $('#table').append(scoreText);
    // Iteriere über die Daten und füge jedes Paar in <p> ein
    data.forEach(function(pair) {
      var name = pair.Name;
      var punkte = pair.Score;
      
      // Erstelle ein <p>-Element und füge es dem Container hinzu
      var pElement = $('<p>').text(name + ': ' + punkte); //$('<p>').html ist nicht sicher gegen xss
      $('#table').append(pElement);
    });
	         
	         
	         
	         
	         },
	         error:function(err){ console.log(err);}
	        
	     });
}

function startGame(){
	
	let name=$('#name').val()
	if(name===''){alert("Bitte geben Sie Name ein")}
	else{
	//event listener ekle
	let color1=$('#1')
	color1.on('change', farbeWählen)
	color1.on('change', checkRichtig)
	color1.on('change', farbeSetzen)
	//color1.on('change', function() {
         //farbeWählen();
        // checkRichtig(this);
        // farbeSetzen(this);
         
// });
	let color2=$('#2')
	color2.on('change', 
         farbeWählen
         )
         
         color2.on('change', 
         checkRichtig
         )
         
         color2.on('change', 
         farbeSetzen )
         
	let color3=$('#3')
	color3.on('change', function() {
         farbeWählen(this);
         checkRichtig(this);
         farbeSetzen(this);
         });
	let color4=$('#4')
	color4.on('change', function() {
         farbeWählen(this);
         checkRichtig(this);
         farbeSetzen(this);
         });
          
         
         color1.off('change',control);
         color2.off('change',control);
         color3.off('change',control);
         color4.off('change',control);
         
         $('#start').hide()
	}
	
	
}
function colorsBereitStellen(){
	
	let color1=$('#1')
	let color2=$('#2')
	let color3=$('#3')
	let color4=$('#4')
	
	     color1.on('change',control);
         color2.on('change',control);
         color3.on('change',control);
         color4.on('change',control);
         
	
}



function control(e){
	e.target.value=0;
	alert("Name!!")
}





