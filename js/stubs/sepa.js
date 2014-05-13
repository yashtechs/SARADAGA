define(['stubs/data/sepa'], function(SepaData){
	window.server.respondWith(
    /\/rpc\/sepa\/getFundTransferEntryCharacteristics/, [200, {
            'Content-Type': 'application/json'
        },
        JSON.stringify(SepaData.getFundTransferEntryCharacteristics)]
    );
    return
});
