var core= new CoreConsulta(0,0,0);
$(document).on('ready',function(){
	limpiarCampos();
	$('.accion').on('click',function(){
		return false;
	});
	opcionesModal();
	$('#tablero').keypress(function(event) {
		/* Act on the event */
		if(core.getT()-core.getConT()== 0){
			$(this).attr('disabled',true);
			return;
		}
		if (event.which == 13){
			var resp =((new String($(this).val()))).split("\n");
			var cadena = resp[resp.length-1];
			var r = (new String(cadena)).toUpperCase();
			if(r.search("UPDATE|QUERY") != -1){
				var res_con
				if(r.search("UPDATE") != -1){
					res_con = core.lineUpdate(r);
					if(res_con[0]){						
						disminuirScore();
					}else{
						$(this).val($(this).val()+"\n"+res_con[1]);
					}
				}else if(r.search("QUERY") != -1){
					res_con = core.lineQuery(r);
					if(res_con[0]){
						disminuirScore();
						$('#resultado').val($('#resultado').val()+"\n"+res_con[1]);
					}else{
						$(this).val($(this).val()+"\n"+res_con[1]);
					}
				}
			}else if((new String(resp[resp.length-2])).search("Digite N y M, separado por espacion") != -1){
				if(/^\d+\s\d+$/.test(r)){
					var res = r.split(" ");
					console.log(res);
					var tem_r =core.getMatriz().validarN(res[0]);
					if(tem_r[0]){
						tem_r = core.validarM(res[1]);
						if(tem_r [0]){
							core.setM(parseInt(res[1]));
							core.getMatriz().setN(parseInt(res[0]));
							core.getMatriz().llenarBloques();
							core.setConM(0);
							$('#m').val(res[1]);
							$('#n').val(res[0]);
						}else{
							$('#tablero').val($('#tablero').val()+"\n"+tem_r[1]+"\nDigite N y M, separado por espacion : ");
						}
					}else{
						$('#tablero').val($('#tablero').val()+"\n"+tem_r[1]+"\nDigite N y M, separado por espacion : ");
					}					
				}else{
					$('#tablero').val($('#tablero').val()+"\nDigite dos valores numericos."+"\nDigite N y M, separado por espacion : ");
				}
			}else{
				$('#tablero').val($('#tablero').val()+"\nValor erroneo.");
			}
		}
	});
});

function disminuirScore(){
	core.incrementarConM();
	$("#m").val(core.getM()-core.getConM());
	if(core.getM()-core.getConM() == 0){
		core.setConM(0);
		core.incrementarConT();
		$("#t").val(core.getT()-core.getConT());
		if(core.getT()-core.getConT()== 0){
			return;
		}
		$('#tablero').val($('#tablero').val()+"\nDigite N y M, separado por espacion : ");
	}
}

function validarCadena(c){
	return /^\d+$/.test(c);
}

function borrarPopup(){
	$('.clear').attr("placeholder", "");
	$('.clear').val("");
}

function limpiarCampos(){
	$('.elem').attr('disabled',true);
	$('.elem').val("");
}

function opcionesModal(){
	$('.accion_modal').on('click',function(){
		$('#modal1').openModal();
		$("#mt").focus();
	});
	$('.cancel').on('click',function(){
		borrarPopup();
		$('#modal1').closeModal();
	});
    $('.add').on('click',function(){    	
    	var t=$('#mt'),
    		n=$('#mn'),
    		m=$('#mm');
		if(validarCadena(t.val())){
			if(validarCadena(n.val())){
				if(validarCadena(m.val())){
					var r = core.validarT(t.val());
					if(r[0]){
						r = core.getMatriz().validarN(n.val());
    					if(r[0]){
    						r = core.validarM(m.val());
	    					if(r[0]){
	    						console.log(parseInt(t.val())+"  "+parseInt(n.val())+"   "+parseInt(m.val()));
	    						core = new CoreConsulta(parseInt(t.val()),parseInt(n.val()),parseInt(m.val()));
	    						core.getMatriz().llenarBloques();
	    						limpiarCampos();
	    						$('#t').val(t.val());
					    		$('#n').val(n.val());
					    		$('#m').val(m.val());
					    		borrarPopup();
					    		$("#tablero").attr('disabled',false);
					    		$('#tablero').focus();
					    		$('#modal1').closeModal();
	    					}else{
	    						m.val("");
	    						m.attr("placeholder", r[1]);
	    						m.focus();
	    					}
    					}else{
    						n.val("");
    						n.attr("placeholder", r[1]);
    						n.focus();
    					}
					}else{
						t.val("");
						t.attr("placeholder", r[1]);
						t.focus();
					}
	    		}else{
	    			m.val("");
	    			m.attr("placeholder", "    Debe digitar solo numeros.");
	    			m.focus();
	    		}
    		}else{
    			n.val("");
    			n.attr("placeholder", "    Debe digitar solo numeros.");
    			n.focus();
    		}
		}else{
			t.attr("placeholder", "    Debe digitar solo numeros.");
			t.focus();
		}
    });
}