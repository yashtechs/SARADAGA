define(['selectize', 'underscore','picker.date', 'rivets','iScroll','transition','collapse'], function(selectize, _, datepicker,rivets,Iscroll) {
    //console.log(selectize);
	$('.fieldset__input').pickadate();
    $.getJSON("/rpc/sepa/getFundTransferEntryCharacteristics").done(function(xhr) {
            var items =[];
			var myApp = {};
			var isScrollActivated;
        myApp.Accordion = {
            toggle: function() {
                var $this = $(this).siblings('.accordion_content');
				var self = $(this);
				$this.one('shown.bs.collapse', 
						function() { 
						self.addClass('dropdown-active'); 
					});
				$this.one('hidden.bs.collapse', 
					function() { 
					self.removeClass('dropdown-active'); 
					});
                $this.collapse('toggle');
                var $elements = $(this).closest(".accordion_main").siblings(".accordion_main").find('.accordion_content.content_l1.in, .accordion_content.content_l3.in');
                $elements.each(function() {
                    $this = $(this);
                    $this.collapse('toggle');
                })

            }
        };
		//
		//*
		console.log(1);
		require(['mask'],function(Mask) {
			$('.mask_pattern').mask('00000 00000');
		});
		$(".amount_field input").on("blur", function(e) {
			console.log(e.type);
		});
		//*/
        rivets.options = {
            bypass: true
        };
        rivets.bind($('.easybanking'), {
            accordion: myApp.Accordion
        }, {
            bypass: true
        });
        $('.accordion_content_detail').on('show.bs.collapse', function() {
            var s = "";
            for (var i = 0; i < 100000; i++) {
                s = i + 1;
            }
            //console.log(i);
            //console.log(this);
        });
        $('.accordion_content_detail').on('shown.bs.collapse', function() {
            for (var i = 0; i < 1000; i++) {

            }
            //console.log(i);
            //console.log(this);
        })
            _.map(xhr.value.originatorAccounts.ownOriginatorAccounts,
                function(accountType) {
                    return _.map(accountType,function(data){
                        items.push(data);
                    });
                });
            //console.log(items);
            /*$('.select-account').selectize({
                options: items,
                optgroups:
            });*/
            var types = _.unique(_.map(items,function(item){return item.type;}));
            types = _.map(types,function(type) {return {value:type,label:type}});
            //console.log(types);

            var $select = $('.select-account').selectize({
                options: items,
                optgroups:types,
                optgroupField:'type',
                optgroupLabelField:'label',
                optgroupValueField:'value',
                labelField:'alias',
                valueField:'iban',
                searchField:['alias','iban'],
                onChange:function(value){
                    var s = _.find(items,function(data) {return data.iban === value});
                    $('.selected-item .iban-label').text(s.iban);
                    $('.selected-item .amount-label').text(s.balance);
                    console.log(s);
                },
				onDropdownOpen:function(){
					//isScrollActivated=new IScroll('.dropdown_wrapper',{mouseWheel:true,scrollbars:true,tap:true,disablePointer:true});
					},
					onDropdownClose:function(){
					//isScrollActivated.destroy();
					},
                render: {
                    option: function(data, escape) {
                        return '<div class="list_item"><div class="list_item__header optgroup-option"><div class="list_content_col1"> <div class="listiban_group"><h3 class="optgroup-iban">' + escape(data.iban) + '</h3>' + (data.isBlue ? '<span class="hello_icon show_hello"></span>' : '') + '</div><div class="listiban_detail"><span class="optgroup-name">' + escape(data.alias) + '</span></div></div><div class=" list_content_col2 optgroup-amount"><h3><span>' + escape(data.balance) + '</span><span>' + escape(data.currency) + '</span></h3></div></div></div>';
                    }
                }
            });
            $('.select-message').selectize({
                options: [{
                    value: 'No Message',
                    name: 'No Message'
                }, {
                    
                    value: 'Structured Message',
                    name: 'Structured Message'
                }, {
                    
                    value: 'Free Text',
                    name: 'Free Text'
                }, {
                    
                    value: 'Euro Message',
                    name: 'Euro Message'
                }],
                labelField: 'name',
            });
        });

});