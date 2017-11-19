(function () {
    angular.module("mediaApp")
        .factory("mediaDocUnderAccountingHeaderDescriptionService", function ($filter, dataServices, buttonBuilder, fieldBuilder, tableFieldBuilder, responsiveTableFieldBuilder) {

			var serviceName = "mediaDocUnderAccountingHeader";
			var serviceDescPural = "Акты недоучёта электроэнергии";
			var serviceDescSingular = "Акт недоучёта электроэнергии";


			//List fields description for search
			var searchFieldsDef = [
				fieldBuilder.build({
					name: "name",
					labelDesc: "Наименование",
                    labelClass: "col-sm-2",
                    controlClass: "col-sm-4"
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
		            name: "name",
		            desc: "Наименование",
		            headerStyle: "width: 50%",
	            }),
	            
  	            responsiveTableFieldBuilder.build({
		            name: "docDate",
		            desc: "Дата документа",
		            headerStyle: "width: 10%",
		            dataType: "date"
	            }),

 	            responsiveTableFieldBuilder.build({
		            name: "meteringPointName",
		            desc: "Присоединение",
		            headerStyle: "width: 30%"
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

				{
                    action: "lines",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "showChilds"
                    },	
                    
                    controllerMethodParams: {
                        child: "mediaDocMeterReplacingLine"
                    },
                    
                    trigger: "button",
					button: buttonBuilder.build({
						caption: "Заполнить",
						tooltip: "Заполнить показания счётчиков",
						glyphicon: "glyphicon-list-alt"
					})
				}
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
                			items: ["Данные", serviceDescPural],			
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
                        templateURL: "media/features/mediaDefault/views/edit.html",
                        controller: "mediaDefaultEditCtrl",
                        header: serviceDescSingular,
                        
                        panels: [
                        	{
                        		name:   "base",
                        		title:  "Общие данные"  	
                        	}                  	
                        ],
                        
                        fields: [
                        	fieldBuilder.build({
            					name: "name",
            					labelDesc: "Наименование",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                required: true,
                                panel: "base",
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "docDate",
            					labelDesc: "Дата документа",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "date",
                                panel: "base",
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "meteringPointId",
            					labelDesc: "Присоединение",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                dictName: "dictMeteringPoint",
                                required: true,
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "oldMeterId",
            					labelDesc: "Снят счётчик",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                dictName: "dictMeter",
                                required: true,
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "newMeterId",
            					labelDesc: "Установлен счётчик",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                dictName: "dictMeter",
                                required: true,
                                panel: "base",
                                editable: true
            				})
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