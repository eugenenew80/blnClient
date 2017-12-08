(function () {
    angular.module("dictApp")
        .factory("dictVoltageTransDescriptionService", function ($filter, dataServices, buttonBuilder, fieldBuilder, tableFieldBuilder, responsiveTableFieldBuilder) {

			var serviceName = "dictVoltageTrans";
			var serviceDescPural = "Трансформаторы напряжения";
			var serviceDescSingular = "Трансформатор напряжения";
			
			//List fields description for search
			var searchFieldsDef = [
				
				fieldBuilder.build({
					name: "code",
					labelDesc: "Код",
                    labelClass: "col-sm-2",
                    controlClass: "col-sm-2"
				}),
				
				fieldBuilder.build({
					name: "name",
					labelDesc: "Тип, Марка, Модель",
                    labelClass: "col-sm-2",
                    controlClass: "col-sm-4"
				}),	
				
				fieldBuilder.build({
					name: "manufacturer",
					labelDesc: "Производитель",
                    labelClass: "col-sm-2",
                    controlClass: "col-sm-4"
				}),	
				
				//orgStruct
				fieldBuilder.build({
					name: "companyId",
					labelDesc: "Компания владелец",
                    labelClass: "col-sm-2",
                    controlClass: "col-sm-4",					
					dictName: "dictCompany"
				}),				
			];
        	
        	
			//List actions for search
			var searchActionsDef = [
				{
                    action: "applySearch",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "applySearch"
                    },
                    
                    trigger: "button",
					button: {
						desc: "Применить",
						tooltip: "Применить",
						classes: "btn btn-primary btn-xs pull-left",
						style: "margin-left: 3px;",
						glyphicon: "glyphicon glyphicon-search",
						disabled: false
					}
				},

				{
					filter: {
						roles: ["expert", "user"]
					},

                    action: "resetSearch",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "resetSearch"
                    },					
                    
                    trigger: "button",
					button: {
						desc: "Сбросить",
						tooltip: "Сбросить",
						classes: "btn btn-warning btn-xs pull-left",
						style: "margin-left: 3px;",
						glyphicon: "glyphicon glyphicon-off",
						disabled: false
					}
				}			                        
			];    
			
			
            //List fields description for table
			var tableFieldsDef = [

  	            responsiveTableFieldBuilder.build({
		            name: "code",
		            desc: "Код",
		            headerStyle: "width: 10%",
	            }),
				
  	            responsiveTableFieldBuilder.build({
		            name: "name",
		            desc: "Тип, Марка, Модель",
		            headerStyle: "width: 70%",
	            }) 
			];
			
		
			
            //List actions after search
            var tableActionsDef = [
				{
                    action: "create",
                    typeAction: "form",

                    form: {
                        name: "edit",
                        data: "@newElement",

                        ok: {
                            action: "@create",
                            data: "@element"
                        },

                        cancel: {
                            action: "@close"
                        }
                    },	

					trigger: "button",
					button: {
						desc: "Создать",
						tooltip: "Создать новую запись",
						classes: "btn btn-primary btn-xs",
						style: "",
						glyphicon: "glyphicon",
						disabled: false
					}
				},            	
            ];
			
            
            //List actions for row
            var rowActionsDef = [     
				
                {
                    action: "edit",
                    typeAction: "form",

                    form: {
                        name: "edit",
                        data: "@currentElement",

                        ok: {
                            action: "@update",
                            data: "@element"
                        },

                        cancel: {
                            action: "@close"
                        }
                    },	

                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Изменить",
						tooltip: "Изменить запись",
						glyphicon: "glyphicon-pencil"
					})
                },

				{
                    action: "remove",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "remove"
                    },	
                    
                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Удалить",
						tooltip: "Удалить запись",
						glyphicon: "glyphicon-remove"
					})
				},
	                
            ];
            

            //return description service
            return {
                name: serviceName,
                desc: serviceDescPural,
                dataService: dataServices[serviceName],
                
                sections: {
                	
                	//header section
                	header: {
                		path: {
                			type: "breadcrumb",
                			items: ["НСИ", serviceDescPural],			
                		}
                	},

                	
					//Main section
                	main: {
                		
                		//Search form
                		search: {
                			type: "form",
                			templateURL: "common/directives/complexForm/complexFormTemplate.html",
                			header: "Панель фильтров",
                            fields:  searchFieldsDef,
                            actions: searchActionsDef,
                            
                            enable: false,
                            auto: true,
                            collapsable: true,
                            isCollapse: true,
                            criteria: {},
                            entity: {}
                		},
                		
                		
		                table: {
		                	//params
		                	type: "table",
		                	data: "elements",
		                    tableType: "responsive",
		                    templateURL: "common/directives/complexView/complexViewTable/complexViewTableTemplate.html",
		                    tableClass: "table table-hover table-condensed table-bordered",
		                    tableStyle: "table-layout: fixed; word-wrap: break-word;",
		                    rowsPerPage: 10,
		                    
		                    liveSearch: {
		                    	enabled: true,
		                    	text: "Быстрый поиск"
		                    },
		                    
		                    search: {
		                    	enabled: true,
		                    	text: "Панель фильтров"
		                    },		                    
		                    
		                    //fields
		                    fields: tableFieldsDef,

		                    //table actions
	                		tableActions: {
	                			type: "actions",		                    
								items: tableActionsDef
	                		},
                			
	                		//row actions
                            rowActions: {
                                type: "actions",
                                items: rowActionsDef                             
                            }
	                		
		                }
		                		               
                	}                	
                },

                //Modal forms
                forms: {
                    //Form edit user
                    edit: {
                        type: "modalForm",
                        templateURL: "dict/features/dictDefault/views/edit.html",
                        controller: "dictDefaultEditCtrl",
                        header: serviceDescSingular,
                        style: "min-width: 400px;",

                        panels: [
                        	{
                        		name:   "base",
                        		title:  "Общие данные"  	
                        	}                  	
                        ],
                        
                        fields: [
            				fieldBuilder.build({
            					name: "name",
            					labelDesc: "Тип, Марка, Модель",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                required: true,
                                panel: "base",
                                editable: true            						
            				}),	
            				
            				fieldBuilder.build({
            					name: "manufacturer",
            					labelDesc: "Производитель",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                required: true,
                                panel: "base",
                                editable: true            						
            				}),	

              				fieldBuilder.build({
            					name: "businessPartnerId",
            					labelDesc: "Компания владелец",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",					
            					dictName: "dictBusinessPartner",
            					required: true,
                                panel: "base",
                                editable: true            						
            				}),	
            				
            				fieldBuilder.build({
            					name: "ratedVoltage1",
            					labelDesc: "Номинальное напряжение первичной обмотки, В",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	         
            				
            				fieldBuilder.build({
            					name: "ratedVoltage2",
            					labelDesc: "Номинальное напряжение вторичной обмотки, В",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	         
            				
            				fieldBuilder.build({
            					name: "accuracyClass",
            					labelDesc: "Класс точности",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	
            				
            				fieldBuilder.build({
            					name: "minVoltage",
            					labelDesc: "Минимальное напряжение в классе точности, %",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	 
            				
            				fieldBuilder.build({
            					name: "maxVoltage",
            					labelDesc: "Максимальное напряжение в классе точности, %",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	        

                        ],
                        
                        
                        actions: [
    							{
    			                    action: "cmdSave",
    			                    typeAction: "controllerMethod",

    			                    controllerMethod: {
    			                        name: "save"
    			                    },	
    			                    
    								trigger: "button",
    								button: {
    									desc: "Сохранить",
    									tooltip: "Сохранить изменения",
    									classes: "btn btn-primary btn-sm",
    									disabled: false
    								}
    							},
    							
    							{
    			                    action: "cmdCancel",
    			                    typeAction: "controllerMethod",

    			                    controllerMethod: {
    			                        name: "cancel"
    			                    },	
    			                    
    								trigger: "button",
    								button: {
    									desc: "Закрыть",
    									tooltip: "Закрыть окно",
    									classes: "btn btn-warning btn-sm",
    									disabled: false
    								}
    							}								                          
                        ]                          
                    }
                                       
                    
                }
            }
        });
})();