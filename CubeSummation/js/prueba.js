function Prueba(){
   var core=undefined;

   this.setCore = function (v){
   		core = v;
   }

   this.getCore = function(){
   		return core;
   }
}

Prueba.prototype.playCoreConsulta = function(t,n,m){
	this.setCore(new CoreConsulta(t,n,m));
	console.log(this.getCore());
	this.getCore().getMatriz().llenarBloques();
	if (this.getCore().getT()== t && this.getCore().getM()==m && this.getCore().getMatriz().getN() == n){
		return true;
	}else{
		return false;
	}
}

Prueba.prototype.realizarUpdate = function(c){
	return this.getCore().lineUpdate(c)[0];
}

Prueba.prototype.realizarQuery = function(c){
	var r = this.getCore().lineQuery(c);
	return r[0]?r[1]== 0?"0":r[1]:r[0];
}