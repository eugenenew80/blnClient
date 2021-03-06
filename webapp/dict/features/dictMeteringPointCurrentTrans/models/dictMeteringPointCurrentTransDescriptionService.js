(function () {
    angular.module("dictApp")
        .factory("dictMeteringPointCurrentTransDescriptionService", function ($filter, dataServices, buttonBuilder, fieldBuilder, tableFieldBuilder, responsiveTableFieldBuilder) {

			var serviceName = "dictMeteringPointCurrentTrans";
			var serviceDescPural = "Трансформаторы тока";
			var serviceDescSingular = "Трансформатор тока";

			//List fields description for search
			var searchFieldsDef = [
			];
        	
        	
			//List actions for search
			var searchActionsDef = [
			];    
			
			
            //List fields description for table
			var tableFieldsDef = [
  	            responsiveTableFieldBuilder.build({
		            name: "name",
		            desc: "Тип трансформатора",
		            headerStyle: "width: 50%",
	            }),

  	            responsiveTableFieldBuilder.build({
		            name: "manufacturer",
		            desc: "Производитель",
		            headerStyle: "width: 40%",
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
						desc: "Добавить",
						tooltip: "Добавить новую запись",
						classes: "btn btn-primary btn-xs",
						style: "",
						glyphicon: "glyphicon",
						disabled: false
					}
				},
				
				
				{
                    action: "back",
                    typeAction: "controllerMethod",

                    controllerMethod: {
                        name: "goBack"
                    },	
                    
                    trigger: "button",
					button: {
						desc: "Назад",
						tooltip: "Вернуться назад",
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
                        name: "removeChild"
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
                parentField: "meteringPointId",
                childField: "id",
                
                sections: {
                	
                	//header section
                	header: {
                		path: {
                			type: "breadcrumb",
                			items: ["НСИ", "Точки учёта", "@parentName", serviceDescPural],		
                		}
                	},

                	
					//Main section
                	main: {
                		
                		//Search form
                		search: {},
                		
                		
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

                        autoFill: {
                            dictName: "dictCurrentTransType",
                            desc: "Тип трансформатора тока",
                            tooltip: "Выбрать тип трансформатора тока",
                            fields: [
                                "name",
                                "manufacturer",
                                "maxCurrent",
                                "minCurrent",
                                "ratedCurrent1",
                                "ratedCurrent2",
                                "accuracyClass"
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
            					labelDesc: "Тип трансформатора тока",
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
            					name: "ratedCurrent1",
            					labelDesc: "Номинальный ток первичной обмотки",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                required: true,
								panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "ratedCurrent2",
            					labelDesc: "Номинальный ток вторичной обмотки",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                required: true,
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
            					name: "minCurrent",
            					labelDesc: "Минимальный ток, %",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "maxCurrent",
            					labelDesc: "Максимальная ток, %",
                                labelClass: "col-sm-8",
                                controlClass: "col-sm-4",
                                controlDataType: "number",
                                panel: "base",
                                editable: true
            				}),

            				fieldBuilder.build({
            					name: "startDate",
            					labelDesc: "Дата монтажа",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "date",
                                panel: "base",
                                editable: true
            				}),
            				
            				fieldBuilder.build({
            					name: "endDate",
            					labelDesc: "Дата демонтажа",
                                labelClass: "col-sm-4",
                                controlClass: "col-sm-4",
                                controlDataType: "date",
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