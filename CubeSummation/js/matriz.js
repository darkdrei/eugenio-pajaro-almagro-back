
function Matriz(n){
	var n = n;
	var m = new Array(n);

	this.getN = function(){
		return n;
	}

	this.setN = function(v){
		n=v;
	}

	this.getM = function(){
		return m;
	}

	this.borrarM = function(){
		m = new Array(n);
	}

	this.getIndexMX = function(x){
		return m[x];
	}

	this.setIndexMX = function(x,v){
		m[x]= v;
	}

	this.getIndexMXY = function(x,y){
		return m[x][y];
	}

	this.setIndexMXY = function(x,y,v){
		m[x][y]= v;
	}

	this.getIndexMXYZ = function(x,y,z){
		return m[x][y][z];
	}

	this.setIndexMXYZ = function(x,y,z,v){
		m[x][y][z]= v;
	}

}

Matriz.prototype.llenarBloques =function(){
	for(var i=0;i<this.getN();i++){
		this.setIndexMX(i,new Array(this.getN()));
		for (var j = 0; j < this.getN(); j++) {
			this.setIndexMXY(i,j,new Array(this.getN()));
			for (var k= 0; k < this.getN(); k++) {
				this.setIndexMXYZ(i,j,k,0);
			};
		}
	}
}

Matriz.prototype.sumarIntervalos = function(x1,y1,z1,x2,y2,z2){
	var t=0;
	var j=y1-1,k=z1-1;
	stop:
	for(var i=x1-1;i<=x2-1;i++){
		do{
			do{
				t+=this.getIndexMXYZ(i,j,k);
				if(i==x2-1 && j== y2-1 && z2-1 == k){
					break stop;
				}
				k++;
			}while(k<this.getN());
			k=0;
			j++;
		}while(j<this.getN());
		j=0;
	}
	return t;
}

Matriz.prototype.imprimirMatriz = function(){
	var t=1;
	for(var i=0;i<this.getN();i++){
		for (var j = 0; j < this.getN(); j++) {
			for (var k= 0; k < this.getN(); k++) {
				t++;
			}
		}
	}
}

Matriz.prototype.validarIntervaloSuma = function(x1,y1,z1,x2,y2,z2){
	if(x1<1 || x1 >x2){
		return [false,"El valor para x1 debe encontrase entre 1 y "+x2+"."];
	}else if(x2 > this.getN()){
		return [false,"El valor para x2 debe encontrase entre "+x1+" y "+this.getN()];
	}else if(y1<1 || y1 >y2){
		return [false,"El valor para y1 debe encontrase entre 1 y "+y2+"."];
	}else if(y2 > this.getN()){
		return [false,"El valor para y2 debe encontrase entre "+y1+" y "+this.getN()];
	}else if(z1<1 || z1 >z2){
		return [false,"El valor para z1 debe encontrase entre 1 y "+z2+"."];
	}else if(z2 > this.getN()){
		return [false,"El valor para z2 debe encontrase entre "+z1+" y "+this.getN()];
	}
	return [true];
}

Matriz.prototype.validarSetXYZ=function(x,y,z,w){
	if(x<1 || x>this.getN()){
		return [false,"El valor para x debe encontrase entre 1 y "+this.getN()+"."];
	}else if(y<1 || y>this.getN()){
		return [false,"El valor para y debe encontrase entre 1 y "+this.getN()+"."];
	}else if(z<1 || z>this.getN()){
		return [false,"El valor para z debe encontrase entre 1 y "+this.getN()+"."];
	}else if (w<Math.pow(-10,9) || w > Math.pow(10,9)){
		return [false,"El valor para w debe encontrase entre -10^9 y 10^9."];
	}
	return [true]
}

Matriz.prototype.validarN = function(n){
	if (t<1 || t > 100){
		return [false,"El valor para N debe encontrase entre 1 y 100."];
	}
	return [true];
}

