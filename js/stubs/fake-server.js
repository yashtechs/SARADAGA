(function(){
	//sinon.FakeXMLHttpRequest.useFilters = true;
	var server = sinon.fakeServer.create();
	server.autoRespond = true;
	window.server = server;
})();