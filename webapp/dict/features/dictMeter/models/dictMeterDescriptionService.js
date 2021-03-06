(function () {
    angular.module("dictApp")
        .factory("dictMeterDescriptionService", function ($filter, dataServices, buttonBuilder, fieldBuilder, tableFieldBuilder, responsiveTableFieldBuilder) {

			var serviceName = "dictMeter";
			var serviceDescPural = "Счётчики";
			var serviceDescSingular = "Счётчик";

        	
			//List fields description for search
			var searchFieldsDef = [
				fieldBuilder.build({
					name: "name",
					labelDesc: "Тип счетчика",
                    labelClass: "col-sm-2",
                    controlClass: "col-sm-4"
				}),

				fieldBuilder.build({
					name: "serialNumber",
					labelDesc: "Серийный №",
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
		            desc: "Тип счетчика",
		            headerStyle: "width: 40%",
	            }),

                responsiveTableFieldBuilder.build({
                    name: "serialNumber",
                    desc: "Серийный №",
                    headerStyle: "width: 20%",
                }),

  	            responsiveTableFieldBuilder.build({
		            name: "businessPartnerShortName",
		            desc: "Владелец",
		            headerStyle: "width: 30%",
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


            //Description for search form
            var searchTableFields = [
                responsiveTableFieldBuilder.build({
                    name: "name",
                    desc: "Тип счетчика",
                    headerStyle: "width: 40%",
                }),

                responsiveTableFieldBuilder.build({
                    name: "serialNumber",
                    desc: "Серийный №",
                    headerStyle: "width: 20%",
                }),

                responsiveTableFieldBuilder.build({
                    name: "businessPartnerShortName",
                    desc: "Владелец",
                    headerStyle: "width: 30%",
                })
            ];
            var searchTableActions = tableActionsDef;
            var searchRowActions = rowActionsDef;


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
		                },

                        searchTable: {
                            type: "table",
                            data: "elements",
                            tableType: "responsive",
                            templateURL: "common/directives/complexView/complexViewTable/complexViewTableTemplate.html",
                            tableClass: "table table-hover table-condensed table-bordered",
                            tableStyle: "table-layout: fixed; word-wrap: break-word;",
                            autoFill: false,

                            //fields
                            fields: searchTableFields,

                            //table actions
                            tableActions: {
                                type: "actions",
                                items: searchTableActions
                            },

                            //row actions
                            rowActions: {
                                type: "actions",
                                items: searchRowActions
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
                        style: "min-width: 500px;",

                        autoFill: {
                            dictName: "dictMeterType",
                            desc: "Тип счётчика",
                            tooltip: "Выбрать тип счётчика",
                            fields: [
                                "name",
                                "manufacturer",
                                "accuracyClass",
                                "minimumLoad",
                                "parameterAm",
                                "parameterAp",
                                "parameterRm",
                                "parameterRp",
                                "totalDigitsNumber",
                                "digitsAfterDecimalPoint",
                            ]
                        },

                        panels: [
                        	{
                        		name:   "base",
                        		title:  "Общие данные"  	
                        	}                  	
                        ],
                        
                        fields: [
            				fieldBuilder.build({
            					name: "name",
            					labelDesc: "Тип счётчика",
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
            					name: "serialNumber",
            					labelDesc: "Серийный / заводской номер",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                required: true,
                                panel: "base",
                                editable: true            						
            				}),

                            fieldBuilder.build({
                                name: "businessPartnerShortName",
                                controlValue: "businessPartnerId",
                                labelDesc: "Компания-владелец",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-8",
                                dictName: "dictBusinessPartner",
                                dictValueName: "id",
                                dictDisplayName: "shortName",
                                panel: "base",
                                editable: true,
                                control: "input"
                            }),

            				fieldBuilder.build({
            					name: "lastVerificationDate",
            					labelDesc: "Последняя поверка",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "date",
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "nextVerificationDate",
            					labelDesc: "Следующая поверка",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "date",
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "ratedCurrent",
            					labelDesc: "Номинальный ток, A",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	         
            				
            				fieldBuilder.build({
            					name: "ratedVoltage",
            					labelDesc: "Номинальное напряжение, B",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	            				
            				
            				fieldBuilder.build({
            					name: "accuracyClass",
            					labelDesc: "Класс точности",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	
            				
            				fieldBuilder.build({
            					name: "minimumLoad",
            					labelDesc: "Минимальная нагрузка в классе точности, %",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true            						
            				}),	 

            				fieldBuilder.build({
            					name: "totalDigitsNumber",
            					labelDesc: "Общее количество знаков в показаниях",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),,

            				fieldBuilder.build({
            					name: "digitsAfterDecimalPoint",
            					labelDesc: "Количество знаков после запятой",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),

                            fieldBuilder.build({
                                name: "parameterAp",
                                labelDesc: "Параметр A+",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                panel: "base",
                                editable: true,
                                controlDataType: "checkbox"
                            }),

                            fieldBuilder.build({
                                name: "parameterAm",
                                labelDesc: "Параметр A-",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                panel: "base",
                                editable: true,
                                controlDataType: "checkbox"
                            }),

                            fieldBuilder.build({
                                name: "parameterRp",
                                labelDesc: "Параметр R+",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                panel: "base",
                                editable: true,
                                controlDataType: "checkbox"
                            }),

                            fieldBuilder.build({
                                name: "parameterRm",
                                labelDesc: "Параметр R-",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                panel: "base",
                                editable: true,
                                controlDataType: "checkbox"
                            })  ,

                            fieldBuilder.build({
                                name: "withdrawn",
                                labelDesc: "Снят с баланса",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                panel: "base",
                                editable: true,
                                controlDataType: "checkbox"
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