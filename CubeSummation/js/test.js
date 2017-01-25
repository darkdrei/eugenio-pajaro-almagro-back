
test( 'Testing checkNumber()', function() {
	var p = new Prueba();
	ok(p.playCoreConsulta( 2,4,5));
	ok(p.realizarUpdate("UPDATE 2 2 2 4"));
	ok(p.realizarQuery("QUERY 1 1 1 3 3 3"),4);
	ok(p.realizarUpdate("UPDATE 1 1 1 23"));
	ok(p.realizarQuery("QUERY 2 2 2 4 4 4"),4);
	ok(p.realizarQuery("QUERY 1 1 1 3 3 3"),27);
	ok(p.playCoreConsulta( 2,2,4));
	ok(p.realizarUpdate("UPDATE 2 2 2 1"));
	ok(p.realizarQuery("QUERY 1 1 1 1 1 1"),"0");
	ok(p.realizarQuery("QUERY 2 2 2 2 2 2"),1);

} );