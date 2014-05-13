define(['stubs/sepa'],function() {
	var sepa = requirejs(["sepa/main"]);
	
})
/*define(["pagebus"],function(PageBus){
	PageBus.subscribe('**', this,function(subj,msg,data){
		console.log("Pagebus event received: " + subj + ' - ' + JSON.stringify(msg));
	});
	 //(function (Pagebus) {
		requirejs(["account/main"]);
		requirejs(["movement/main"]);
		//Pagebus.publish("startapp", {"userid":"123456", PageBus:{cache:true}});
//})(PageBus);
});*/
