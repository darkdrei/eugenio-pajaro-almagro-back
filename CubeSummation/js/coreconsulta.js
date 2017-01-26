function CoreConsulta(t,n,m){
	var t=t,
	    matriz= new Matriz(n),
	    m=m,
	    con_t =0,
	    con_m=0;

	this.getT = function(){
		return t;
	}

	this.setT =function(t){
		t=t;
	}

	this.getM = function(){
		return m;
	}

	this.setM =function(m2){
		m=m2;
	}

	this.getMatriz = function(){
		return matriz;
	}

	this.getConT = function(){
		return con_t;
	}

	this.setConT =function(t22){
		con_t=t22;
	}

	this.incrementarConT = function(){
		con_t++;
	}

	this.getConM= function(){
		return con_m;
	}

	this.setConM =function(ct){
		con_m=ct;
	}

	this.incrementarConM = function(){
		con_m++;
	}

}

CoreConsulta.prototype.validarT = function (t) {
	if (t<1 || t > 50){
		return [false,"El valor para T debe encontrase entre 1 y 50."];
	}
	return [true];
}

CoreConsulta.prototype.validarM = function (m) {
	if (m<1 || m > 1000){
		return [false,"El valor para M debe encontrase entre 1 y 1000."];
	}
	return [true];
}

CoreConsulta.prototype.lineUpdate = function (c){
	if(this.validarUpdate(c)){
		var cadena = new String(c);
		var v = cadena.split(" ");//Contiene los valores.
		var x=parseInt(v[1]),
			y=parseInt(v[2]),
			z=parseInt(v[3]),
			w=parseFloat(v[4]);
		var r = this.getMatriz().validarSetXYZ(x,y,z,w);
		if(r[0]){
			this.getMatriz().setIndexMXYZ(x-1,y-1,z-1,w);
			return [true];
		}else{
			return [false,r[1]];
		}
	}else{
		return [false,"Se requiere que la exprecion tenga 5 terminos y estos se encuentren\nseparados por coma donde el primer valor es update y el resto valores numericos."];
	}
}

CoreConsulta.prototype.lineQuery = function (c){
	if(this.validarQuery(c)){
		var cadena = new String(c);
		var v = cadena.split(" ");//Contiene los valores.
		var x1=parseInt(v[1]),
			y1=parseInt(v[2]),
			z1=parseInt(v[3]),
			x2=parseInt(v[4]),
			y2=parseInt(v[5]),
			z2=parseInt(v[6]);
		var r = this.getMatriz().validarIntervaloSuma(x1,y1,z1,x2,y2,z2);
		if(r[0]){
			return [true,this.getMatriz().sumarIntervalos(x1,y1,z1,x2,y2,z2)];
		}else{
			return r;
		}
	}else{
		return [false,"Se requiere que la exprecion tenga 7 terminos y estos se encuentren\nseparados por coma."];
	}
}

CoreConsulta.prototype.validarUpdate = function (c){
	return this.validoraExprecion(c,/^(UPDATE|update)\s((-?\d){1,3})([,\.][0-9]*)?\s((-?\d){1,3})([\.][0-9]*)?\s((-?\d){1,3})([\.][0-9]*)?\s((-?\d){1,10})([\.][0-9]*)?$/);
}

CoreConsulta.prototype.validarQuery = function (c){
	return this.validoraExprecion(c,/^(query|QUERY)\s\d{1,3}\s\d{1,3}\s\d{1,3}\s\d{1,3}\s\d{1,3}\s\d{1,3}$/);
}

CoreConsulta.prototype.validoraExprecion = function(c,exp){
	return exp.test(c);
}
