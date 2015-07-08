$(document).on('click', '#fullview', function() {
    $('#myDiagram').addClass('fullscreendata');
    $(this).addClass('smallscreenlink');
    reload();
})

$(document).on('click', '.smallscreenlink', function() {
    $('#myDiagram').removeClass('fullscreendata');
    $(this).removeClass('smallscreenlink');

            
})

$(document).scroll(function() {
    var x = $("#sample").position();
    var menupostion = x.top - $(document).scrollTop();
    if (menupostion <= 0) {
        $('#myPalette').addClass('fixed');
        $('#objectinformation').addClass('fixed-setting');
       
    }
    if (menupostion > 0) {
        $('#myPalette').removeClass('fixed');
        $('#objectinformation').removeClass('fixed-setting');
    }
});

var allshapes = ["None", "DirectData", "StopSign", "Rectangle", "Database", "Pyramid2", "Pyramid1", "Prism2", "Cone1", "ISOProcess", "LogicFalsity", "LogicTruth", "LogicXor", "LogicOr", "LogicAnd", "LogicNot", "LogicIff", "LogicImplies", "Pie", "GenderFemale", "GenderMale", "ManualOperation", "Curve4", "Triangle", "Cloud", "Gate", "FramedRectangle", "HalfEllipse", "NotAllowed", "Parallelogram2", "RightTriangle", "RoundedRectangle", "Diamond", "Square", "Ellipse", "Circle", "LineH", "LineV", "FramedRectangle", "RoundedRectangle", "Line1", "Line2", "Border", "Cube1", "Cube2", "Junction", "Cylinder1", "Cylinder2", "Cylinder3", "Cylinder4", "PlusLine", "XLine", "ThinCross", "ThickCross"];

function init() {

    //if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var GO = go.GraphObject.make; // for conciseness in defining templates

    var yellowgrad = GO(go.Brush, go.Brush.Linear, {
        0: "rgb(254, 201, 0)",
        1: "rgb(254, 162, 0)"
    });
    var greengrad = GO(go.Brush, go.Brush.Linear, {
        0: "#98FB98",
        1: "#9ACD32"
    });
    var bluegrad = GO(go.Brush, go.Brush.Linear, {
        0: "#B0E0E6",
        1: "#87CEEB"
    });
    var redgrad = GO(go.Brush, go.Brush.Linear, {
        0: "#C45245",
        1: "#7D180C"
    });
    var whitegrad = GO(go.Brush, go.Brush.Linear, {
        0: "#F0F8FF",
        1: "#E6E6FA"
    });
    var bigfont = "bold 13pt Helvetica, Arial, sans-serif";
    var smallfont = "bold 11pt Helvetica, Arial, sans-serif";
    myDiagram =
        GO(go.Diagram, "myDiagram", // must name or refer to the DIV HTML element
            {
				
                 allowDrop: true,  // must be true to accept drops from the Palette
          "draggingTool.dragsLink": true,
          "draggingTool.isGridSnapEnabled": true,
          "linkingTool.isUnconnectedLinkValid": true,
          "linkingTool.portGravity": 20,
          "relinkingTool.isUnconnectedLinkValid": true,
          "relinkingTool.portGravity": 20,
          "relinkingTool.fromHandleArchetype":
            GO(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
          "relinkingTool.toHandleArchetype":
            GO(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
          "linkReshapingTool.handleArchetype":
            GO(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
          "rotatingTool.snapAngleMultiple": 15,
          "rotatingTool.snapAngleEpsilon": 15,
          // don't set some properties until after a new model has been loaded
          "InitialLayoutCompleted": loadDiagramProperties,  // this DiagramEvent listener is defined below
          "undoManager.isEnabled": true
            });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function(e) {
        var button = document.getElementById("SaveButton");
        if (button) button.disabled = !myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
            if (idx < 0) document.title += "*";
        } else {
            if (idx >= 0) document.title = document.title.substr(0, idx);
        }
    });
    var nodeSelectionAdornmentTemplate =
        GO(go.Adornment, "Auto",
            GO(go.Shape, {
                fill: null,
                stroke: "deepskyblue",
                strokeWidth: 1.5,
                strokeDashArray: [4, 2]
            }),
            GO(go.Placeholder)
        );
    var nodeResizeAdornmentTemplate =
        GO(go.Adornment, "Spot", {
                locationSpot: go.Spot.Right
            },
            GO(go.Placeholder),
            GO(go.Shape, {
                alignment: go.Spot.TopLeft,
                cursor: "nw-resize",
                desiredSize: new go.Size(6, 6),
                fill: "lightblue",
                stroke: "deepskyblue"
            }),
            GO(go.Shape, {
                alignment: go.Spot.Top,
                cursor: "n-resize",
                desiredSize: new go.Size(6, 6),
                fill: "lightblue",
                stroke: "deepskyblue"
            }),
            GO(go.Shape, {
                alignment: go.Spot.TopRight,
                cursor: "ne-resize",
                desiredSize: new go.Size(6, 6),
                fill: "lightblue",
                stroke: "deepskyblue"
            }),

            GO(go.Shape, {
                alignment: go.Spot.Left,
                cursor: "w-resize",
                desiredSize: new go.Size(6, 6),
                fill: "lightblue",
                stroke: "deepskyblue"
            }),
            GO(go.Shape, {
                alignment: go.Spot.Right,
                cursor: "e-resize",
                desiredSize: new go.Size(6, 6),
                fill: "lightblue",
                stroke: "deepskyblue"
            }),

            GO(go.Shape, {
                alignment: go.Spot.BottomLeft,
                cursor: "se-resize",
                desiredSize: new go.Size(6, 6),
                fill: "lightblue",
                stroke: "deepskyblue"
            }),
            GO(go.Shape, {
                alignment: go.Spot.Bottom,
                cursor: "s-resize",
                desiredSize: new go.Size(6, 6),
                fill: "lightblue",
                stroke: "deepskyblue"
            }),
            GO(go.Shape, {
                alignment: go.Spot.BottomRight,
                cursor: "sw-resize",
                desiredSize: new go.Size(6, 6),
                fill: "lightblue",
                stroke: "deepskyblue"
            })
        );
    var nodeRotateAdornmentTemplate =
        GO(go.Adornment, {
                locationSpot: go.Spot.Center,
                locationObjectName: "CIRCLE"
            },
            GO(go.Shape, "Circle", {
                name: "CIRCLE",
                cursor: "pointer",
                desiredSize: new go.Size(7, 7),
                fill: "lightblue",
                stroke: "deepskyblue"
            }),
            GO(go.Shape, {
                geometryString: "M3.5 7 L3.5 30",
                isGeometryPositioned: true,
                stroke: "deepskyblue",
                strokeWidth: 1.5,
                strokeDashArray: [4, 2]
            })
        );



    // helper definitions for node templates

    function nodeStyle() {
        return [
            // The Node.location comes from the "loc" property of the node data,
            // converted by the Point.parse static method.
            // If the Node.location is changed, it updates the "loc" property of the node data,
            // converting back using the Point.stringify static method.
            {
                locationSpot: go.Spot.Center
            },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
                selectable: true,
                selectionAdornmentTemplate: nodeSelectionAdornmentTemplate
            }, {
                resizable: true,
                resizeObjectName: "PANEL",
                resizeAdornmentTemplate: nodeResizeAdornmentTemplate
            }, {
                rotatable: true,
                rotateAdornmentTemplate: nodeRotateAdornmentTemplate
            },
            new go.Binding("angle").makeTwoWay()
        ];
    }

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort(name, spot, output, input) {
        // the port is basically just a small circle that has a white stroke when it is made visible

        return GO(go.Shape, "Circle", {
            fill: "transparent",
            stroke: null, // this is changed to "white" in the showPorts function
            desiredSize: new go.Size(8, 8),
            alignment: spot,
            alignmentFocus: spot, // align the port on the main Shape
            portId: name, // declare this object to be a "port"
            fromSpot: spot,
            toSpot: spot, // declare where links may connect at this port
            fromLinkable: output,
            toLinkable: input, // declare whether the user may draw links to/from here
            cursor: "pointer" // show a different cursor to indicate potential link point
        });
    }

    // define the Node templates for regular nodes

    var lightText = 'whitesmoke';
    myDiagram.nodeTemplate =
        GO(go.Node, "Spot", {
                locationSpot: go.Spot.Center
            },
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify), {
                selectable: true,
                selectionAdornmentTemplate: nodeSelectionAdornmentTemplate
            }, {
                resizable: true,
                resizeObjectName: "PANEL",
                resizeAdornmentTemplate: nodeResizeAdornmentTemplate
            }, {
                rotatable: true,
                rotateAdornmentTemplate: nodeRotateAdornmentTemplate
            },
            new go.Binding("angle").makeTwoWay(),
            // the main object is a Panel that surrounds a TextBlock with a Shape
            GO(go.Panel, "Auto", {
                    name: "PANEL"
                },
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                GO(go.Shape, "Rectangle", new go.Binding("fill", "color"), // default figure
                    {
                        portId: "", // the default port: if no spot on link data, use closest side
                        fromLinkable: true,
                        toLinkable: true,
                        cursor: "pointer",
                        fill: "#00A9C9",
                        stroke: null,
                        name: "SHAPE"
                    },
                    new go.Binding("stroke", "color").makeTwoWay(),
                    new go.Binding("figure", "figure").makeTwoWay()),
                GO(go.TextBlock, {
                        font: "bold 11pt Helvetica, Arial, sans-serif",
                        stroke: lightText,
                        margin: 8,
                        name: "TEXT",
                        maxSize: new go.Size(60, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },

                    new go.Binding("stroke", "stroke").makeTwoWay(),
                    new go.Binding("text", "text").makeTwoWay(),
                    new go.Binding("info", "info").makeTwoWay(),
                    new go.Binding("link", "link").makeTwoWay())
            ),
            GO(go.Picture, 
				{ 	source: base_url+"/images/info.png",
					
					width: 20, 
					height: 20 ,
					alignment: new go.Spot(0, 0),
					visible: false,
					
					name: "infoicon"	
				 }, new go.Binding("visible", "visible").makeTwoWay()),
			GO(go.Picture, 
				{ 	source: base_url+"/images/link.png",
					
					width: 15, 
					height: 15 ,
					alignment: new go.Spot(1, 0),
					visible: false,
					
					name: "infoicon2"
			}, new go.Binding("visible", "visible2").makeTwoWay()),	 
            
            // four small named ports, one on each side:
            makePort("T", go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, false), { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) {
                    showSmallPorts(node, true);
                },
                mouseLeave: function(e, node) {
                    showSmallPorts(node, false);
                }
            }
        );

    myDiagram.nodeTemplateMap.add("Diamond", // the default category
        GO(go.Node, "Spot", nodeStyle(),
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            GO(go.Panel, "Auto", {
                    name: "PANEL"
                },
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                GO(go.Shape, "Diamond", new go.Binding("fill", "color"), {
                        portId: "", // the default port: if no spot on link data, use closest side
                        fromLinkable: true,
                        toLinkable: true,
                        cursor: "pointer",
                        fill: "#00A9C9",
                        stroke: null,
                        name: "SHAPE"
                    },
                    new go.Binding("stroke", "color").makeTwoWay(),
                    new go.Binding("figure", "figure").makeTwoWay()),
                GO(go.TextBlock, {
                        font: "bold 11pt Helvetica, Arial, sans-serif",
                        stroke: lightText,
                        margin: 8,
                        name: "TEXT",
                        maxSize: new go.Size(60, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding("stroke", "stroke").makeTwoWay(),
                    new go.Binding("text", "text").makeTwoWay(),
                    new go.Binding("info", "info").makeTwoWay(),
                    new go.Binding("link", "link").makeTwoWay()
                )
            ),
            GO(go.Picture, 
				{ 	source: base_url+"/images/info.png",
					
					width: 20, 
					height: 20 ,
					alignment: new go.Spot(0.3, 0.2),
					visible: false,
					
					name: "infoicon"	
				 }, new go.Binding("visible", "visible").makeTwoWay()),
			GO(go.Picture, 
				{ 	source: base_url+"/images/link.png",
					
					width: 15, 
					height: 15 ,
					alignment: new go.Spot(0.7, 0.2),
					visible: false,
					
					name: "infoicon2"
			}, new go.Binding("visible", "visible2").makeTwoWay()),
            //nine named ports, one on each side:
            // four small named ports, one on each side:
            makePort("T", go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, false), { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) {
                    showSmallPorts(node, true);
                },
                mouseLeave: function(e, node) {
                    showSmallPorts(node, false);
                }
            }
        ));

    myDiagram.nodeTemplateMap.add("multyport", // the default category
        GO(go.Node, "Spot", nodeStyle(),
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            GO(go.Panel, "Auto", {
                    name: "PANEL"
                },
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                GO(go.Shape, "Rectangle", new go.Binding("fill", "color"), {
                        portId: "", // the default port: if no spot on link data, use closest side
                        fromLinkable: true,
                        toLinkable: true,
                        cursor: "pointer",
                        fill: "#00A9C9",
                        stroke: null,
                        name: "SHAPE"
                    },
                    new go.Binding("stroke", "color").makeTwoWay(),
                    new go.Binding("figure", "figure").makeTwoWay()),
                GO(go.TextBlock, {
                        font: "bold 11pt Helvetica, Arial, sans-serif",
                        stroke: lightText,
                        margin: 8,
                        name: "TEXT",
                        maxSize: new go.Size(60, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding("stroke", "stroke").makeTwoWay(),
                    new go.Binding("text", "text").makeTwoWay(),
                    new go.Binding("info", "info").makeTwoWay(),
                    new go.Binding("link", "link").makeTwoWay()
                )
            ),
            GO(go.Picture, 
				{ 	source: base_url+"/images/info.png",
					
					width: 20, 
					height: 20 ,
					alignment: new go.Spot(0, 0),
					visible: false,
					
					name: "infoicon"	
				 }, new go.Binding("visible", "visible").makeTwoWay()),
			GO(go.Picture, 
				{ 	source: base_url+"/images/link.png",
					
					width: 15, 
					height: 15 ,
					alignment: new go.Spot(1, 0),
					visible: false,
					
					name: "infoicon2"
			}, new go.Binding("visible", "visible2").makeTwoWay()),
            //nine named ports, one on each side:
            makePort("left1", new go.Spot(0, 0.7), true, true),
            makePort("left2", new go.Spot(0, 0.5), true, true),
            makePort("left3", new go.Spot(0, 0.3), true, true),

            makePort("top1", new go.Spot(0.3, 0), true, true),
            makePort("top2", new go.Spot(0.5, 0), true, true),
            makePort("top3", new go.Spot(0.7, 0), true, true),


            makePort("bottom1", new go.Spot(0.3, 1), true, true),
            makePort("bottom2", new go.Spot(0.5, 1), true, true),
            makePort("bottom3", new go.Spot(0.7, 1), true, true),

            makePort("right1", new go.Spot(1, 0.7), true, true),
            makePort("right2", new go.Spot(1, 0.5), true, true),
            makePort("right3", new go.Spot(1, 0.3), true, true),

            { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) {
                    showSmallPorts(node, true);
                },
                mouseLeave: function(e, node) {
                    showSmallPorts(node, false);
                }
            }
        ));

    myDiagram.nodeTemplateMap.add("Start",
        GO(go.Node, "Spot", nodeStyle(),
            GO(go.Panel, "Auto", {
                    name: "PANEL"
                },
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                GO(go.Shape, "Circle", new go.Binding("fill", "color"), {
                        minSize: new go.Size(40, 60),
                        fill: "#79C900",
                        stroke: null,
                        name: "SHAPE"
                    },
                    new go.Binding("stroke", "color").makeTwoWay(),
                    new go.Binding("figure", "figure").makeTwoWay()
                ),
                GO(go.TextBlock, "Start", {
                        margin: 5,
                        font: "bold 11pt Helvetica, Arial, sans-serif",
                        name: "TEXT",
                        stroke: lightText,
                        editable: true
                    },
                    new go.Binding("stroke", "stroke").makeTwoWay(),
                    new go.Binding("text", "text").makeTwoWay(),
                    new go.Binding("info", "info").makeTwoWay(),
                    new go.Binding("link", "link").makeTwoWay()
                )
            ),
            GO(go.Picture, 
				{ 	source: base_url+"/images/info.png",
					
					width: 20, 
					height: 20 ,
					alignment: new go.Spot(0, 0.2),
					visible: false,
					
					name: "infoicon"	
				 }, new go.Binding("visible", "visible").makeTwoWay()),
			GO(go.Picture, 
				{ 	source: base_url+"/images/link.png",
					
					width: 15, 
					height: 15 ,
					 alignment: new go.Spot(1, 0.2),
					visible: false,
					
					name: "infoicon2"
			}, new go.Binding("visible", "visible2").makeTwoWay()),
            // three named ports, one on each side except the top, all output only:
            makePort("L", go.Spot.Left, true, false),
            makePort("R", go.Spot.Right, true, false),
            makePort("B", go.Spot.Bottom, true, false), { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) {
                    showSmallPorts(node, true);
                },
                mouseLeave: function(e, node) {
                    showSmallPorts(node, false);
                }
            }
        ));

    var defaultAdornment =
        GO(go.Adornment, "Spot",
            GO(go.Panel, "Auto",
                GO(go.Shape, {
                    fill: null,
                    stroke: "dodgerblue",
                    strokeWidth: 4
                }),
                GO(go.Placeholder)),
            // the button to create a "next" node, at the top-right corner
            GO("Button", {
                    alignment: go.Spot.TopRight,
                    click: addNodeAndLink
                }, // this function is defined below
                new go.Binding("visible", "", function(a) {
                    return !a.diagram.isReadOnly;
                }).ofObject(),
                GO(go.Shape, "PlusLine", {
                    desiredSize: new go.Size(6, 6)
                })
            )
        );
    myDiagram.nodeTemplateMap.add("page",
        GO(go.Node, "Spot", nodeStyle(), {
                selectionAdornmentTemplate: defaultAdornment
            },
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            GO(go.Panel, "Auto", {
                    name: "PANEL"
                },
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                GO(go.Shape, "Rectangle", new go.Binding("fill", "color"), {
                        fill: "#00A9C9",
                        stroke: null,
                        name: "SHAPE"
                    },
                    new go.Binding("stroke", "color").makeTwoWay(),
                    new go.Binding("figure", "figure").makeTwoWay()
                ),
                GO(go.TextBlock, {
                        font: "bold 11pt Helvetica, Arial, sans-serif",
                        stroke: lightText,
                        margin: 8,
                        name: "TEXT",
                        maxSize: new go.Size(60, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding("stroke", "stroke").makeTwoWay(),
                    new go.Binding("text", "text").makeTwoWay(),
                    new go.Binding("info", "info").makeTwoWay(),
                    new go.Binding("link", "link").makeTwoWay()
                )
            ),
            GO(go.Picture, 
				{ 	source: base_url+"/images/info.png",
					
					width: 20, 
					height: 20 ,
					alignment: new go.Spot(0, 0),
					visible: false,
					
					name: "infoicon"	
				 }, new go.Binding("visible", "visible").makeTwoWay()),
			GO(go.Picture, 
				{ 	source: base_url+"/images/link.png",
					
					width: 15, 
					height: 15 ,
					alignment: new go.Spot(1, 0	),
					visible: false,
					
					name: "infoicon2"
			}, new go.Binding("visible", "visible2").makeTwoWay()),
            // four named ports, one on each side:
            makePort("T", go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, false), { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) {
                    showSmallPorts(node, true);
                },
                mouseLeave: function(e, node) {
                    showSmallPorts(node, false);
                }
            }
        ));


    myDiagram.nodeTemplateMap.add("directdata",
        GO(go.Node, "Spot", nodeStyle(),

            GO(go.Panel, "Auto", {
                    name: "PANEL"
                },
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                GO(go.Shape, "DirectData", new go.Binding("fill", "color"), {
                        minSize: new go.Size(40, 40),
                        fill: "transparent",
                        name: "SHAPE"
                    },
                    new go.Binding("stroke", "color").makeTwoWay(),
                    new go.Binding("figure", "figure").makeTwoWay(),
                    new go.Binding("strokeWidth", "10"),
                    new go.Binding("strokeDashArray", "dash")),
                GO(go.TextBlock, "DirectData", {
                        margin: 5,
                        font: "bold 11pt Helvetica, Arial, sans-serif",
                        name: "TEXT",
                        editable: true
                    },
                    new go.Binding("stroke", "stroke").makeTwoWay(),
                    new go.Binding("text", "text").makeTwoWay(),
                    new go.Binding("info", "info").makeTwoWay(),
                    new go.Binding("link", "link").makeTwoWay()
                )
            ),
            GO(go.Picture, 
				{ 	source: base_url+"/images/info.png",
					
					width: 20, 
					height: 20 ,
					alignment: new go.Spot(0, 0),
					visible: false,
					
					name: "infoicon"	
				 }, new go.Binding("visible", "visible").makeTwoWay()),
			GO(go.Picture, 
				{ 	source: base_url+"/images/link.png",
					
					width: 15, 
					height: 15 ,
					alignment: new go.Spot(1, 0),
					visible: false,
					
					name: "infoicon2"
			}, new go.Binding("visible", "visible2").makeTwoWay()),
            // three named ports, one on each side except the bottom, all input only:
            makePort("L", go.Spot.Left, true, false),
            makePort("R", go.Spot.Right, true, false),
            makePort("B", go.Spot.Bottom, true, false), { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) {
                    showSmallPorts(node, true);
                },
                mouseLeave: function(e, node) {
                    showSmallPorts(node, false);
                }
            }
        ));

    myDiagram.nodeTemplateMap.add("End",
        GO(go.Node, "Spot", nodeStyle(),
            GO(go.Panel, "Auto", {
                    name: "PANEL"
                },
                new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
                GO(go.Shape, "Circle", new go.Binding("fill", "color"), {
                        minSize: new go.Size(40, 60),
                        fill: "#DC3C00",
                        stroke: null,
                        name: "SHAPE"
                    },
                    new go.Binding("stroke", "color").makeTwoWay(),
                    new go.Binding("figure", "figure").makeTwoWay()
                ),
                GO(go.TextBlock, "End", {
                        margin: 5,
                        font: "bold 11pt Helvetica, Arial, sans-serif",
                        name: "TEXT",
                        stroke: lightText
                    },
                    new go.Binding("stroke", "stroke").makeTwoWay(),
                    new go.Binding("text", "text").makeTwoWay(),
                    new go.Binding("info", "info").makeTwoWay(),
                    new go.Binding("link", "link").makeTwoWay())
            ),
            GO(go.Picture, 
				{ 	source: base_url+"/images/info.png",
					
					width: 20, 
					height: 20 ,
					alignment: new go.Spot(0, 0.2),
					visible: false,
					
					name: "infoicon"	
				 }, new go.Binding("visible", "visible").makeTwoWay()),
			GO(go.Picture, 
				{ 	source: base_url+"/images/link.png",
					
					width: 15, 
					height: 15 ,
					alignment: new go.Spot(1, 0.2),
					visible: false,
					
					name: "infoicon2"
			}, new go.Binding("visible", "visible2").makeTwoWay()),
            // three named ports, one on each side except the bottom, all input only:
            makePort("T", go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, false, true),
            makePort("R", go.Spot.Right, false, true), { // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function(e, node) {
                    showSmallPorts(node, true);
                },
                mouseLeave: function(e, node) {
                    showSmallPorts(node, false);
                }
            }

        ));

    myDiagram.nodeTemplateMap.add("Comment",
        GO(go.Node, "Auto", nodeStyle(),
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            GO(go.Shape, "File", new go.Binding("fill", "color"), {
                    fill: "#EFFAB4",
                    stroke: null,
                    name: "SHAPE"
                },
                new go.Binding("figure", "figure").makeTwoWay()
            ),
            GO(go.TextBlock, {
                    margin: 5,
                    maxSize: new go.Size(200, NaN),
                    wrap: go.TextBlock.WrapFit,
                    textAlign: "center",
                    editable: true,
                    name: "TEXT",
                    font: "bold 12pt Helvetica, Arial, sans-serif",
                    stroke: '#454545'
                },
                new go.Binding("text", "text").makeTwoWay(),
                new go.Binding("info", "info").makeTwoWay(),
                new go.Binding("link", "link").makeTwoWay()
            ),
            GO(go.Picture, 
				{ 	source: base_url+"/images/info.png",
					
					width: 20, 
					height: 20 ,
					alignment: new go.Spot(0, 0),
					visible: false,
					
					name: "infoicon"	
				 }, new go.Binding("visible", "visible").makeTwoWay()),
			GO(go.Picture, 
				{ 	source: base_url+"/images/link.png",
					
					width: 15, 
					height: 15 ,
					alignment: new go.Spot(1, 10),
					visible: false,
					
					name: "infoicon2"
			}, new go.Binding("visible", "visible2").makeTwoWay())
            // no ports, because no links are allowed to connect with a comment
        ));


    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate =
        GO(go.Link, // the whole link panel
            {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                corner: 5,
                toShortLength: 4,
                relinkableFrom: true,
                relinkableTo: true,
                reshapable: true
            },
            new go.Binding("points").makeTwoWay(),
            new go.Binding("strokeDashArray", "dash").makeTwoWay(),
            new go.Binding("stroke", "color").makeTwoWay(),
            GO(go.Shape, // the link path shape
                {
                    isPanelMain: true,
                    strokeWidth: 2,
                    name: "link"
                },
                new go.Binding("stroke", "color").makeTwoWay(),
                new go.Binding("strokeDashArray", "dash").makeTwoWay()
            ),
            GO(go.Shape, // the arrowhead
                {
                    toArrow: "standard",
                    stroke: null,
                    name: "link"
                }, new go.Binding("stroke", "color").makeTwoWay(),
                new go.Binding("strokeDashArray", "dash").makeTwoWay()
            ),
            GO(go.Panel, "Auto", // the link label, normally not visible
                {
                    visible: false,
                    name: "LABEL",
                    segmentIndex: 2,
                    segmentFraction: 0.5
                },
                new go.Binding("visible", "visible").makeTwoWay(),
                GO(go.Shape, "RoundedRectangle", // the label shape
                    {
                        fill: "#F8F8F8",
                        stroke: null,
                        name: "link"
                    }, new go.Binding("fill", "color")),
                GO(go.TextBlock, "Yes", // the label
                    {
                        textAlign: "center",
                        font: "10pt helvetica, arial, sans-serif",
                        stroke: "#333333",
                        editable: true,
                        name: "TEXT",
                    },
                    new go.Binding("text", "text").makeTwoWay())
            )
        );

    // Make link labels visible if coming out of a "conditional" node.
    // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    load(); // load an initial diagram from some JSON text

    // initialize the Palette that is on the left side of the page
    myPalette =
      GO(go.Palette, "myPalette",  // must name or refer to the DIV HTML element
        {
          maxSelectionCount: 1,
          nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
          linkTemplate: // simplify the link template, just in this Palette
            GO(go.Link,
              { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
                // to line up the Link in the same manner we have to pretend the Link has the same location spot
                locationSpot: go.Spot.Center,
                selectionAdornmentTemplate:
                  GO(go.Adornment, "Link",
                    { locationSpot: go.Spot.Center },
                    GO(go.Shape,
                      { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
                    GO(go.Shape,  // the arrowhead
                      { toArrow: "Standard", stroke: null })
                  )
              },
              {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                corner: 5,
                toShortLength: 4
              },
              new go.Binding("points"),
              GO(go.Shape,  // the link path shape
                { isPanelMain: true, strokeWidth: 2 }),
              GO(go.Shape,  // the arrowhead
                { toArrow: "Standard", stroke: null })
            ),
          model: new go.GraphLinksModel([  // specify the contents of the Palette
            {
                        category: "Start",
                        text: "Start"
                    }, {
                        category: "multyport",
                        text: "Multi I/O",
                        figure: "Rectangle"
                    }, {
                        category: "page",
                        text: "Page"
                    }, {
                        text: "Step"
                    }, {
                        category: "Diamond",
                        text: "???",
                        figure: "Diamond"
                    }, {
                        text: "Data",
                        figure: "Parallelogram1"
                    }, {
                        text: "Stop",
                        figure: "StopSign"
                    }, {
                        category: "directdata",
                        text: "Data",
                        figure: "Cylinder3"
                    }, {
                        category: "End",
                        text: "End"
                    }, {
                        category: "Comment",
                        text: "Comment",
                        figure: "RoundedRectangle"
                    }
          ], [
            // the Palette also has a disconnected Link, which the user can drag-and-drop
            { points: new go.List(go.Point).addAll([new go.Point(0, 0), new go.Point(0, 0), new go.Point(0, 0), new go.Point(60, 0)]) }
          ])
        });


    myPalette.addDiagramListener("InitialLayoutCompleted", function(diagramEvent) {
        var pdrag = document.getElementById("paletteDraggable");
        var palette = diagramEvent.diagram;
        var paddingHorizontal = palette.padding.left + palette.padding.right;
        var paddingVertical = palette.padding.top + palette.padding.bottom;
        //pdrag.style.width = palette.documentBounds.width + 20  + "px";
        //pdrag.style.height = palette.documentBounds.height + 30 + "px";
    });

    var info = document.getElementById("myInfo");
    myDiagram.addDiagramListener("TextEdited", function(e1) {
        //alert('edited');	

    });

    myDiagram.addDiagramListener("ChangedSelection", function(e1) {

        var sel = e1.diagram.selection;
        var str = "";
        if (sel.count === 0) {
            str = "";
            $('.shapes').hide();
            info.innerHTML = str;
            return;
        } else if (sel.count > 1) {
            str = sel.count + " objects selected.";
            info.innerHTML = str;
            return;
        }
        // One object selected, display some information
        var elem = sel.first();
        var styl = '';
        var shape = elem.findObject("SHAPE");
        var txtblock = elem.findObject("TEXT");

        if (shape != null) {
            shapes(shape.figure);
            $('.shapes').show();
            $('#shapes').val(shape.figure);
            //str+="<p>Figure:<select id='shapes'></select><p>";
            if (typeof txtblock.info === 'undefined') {
                txtblock.info = '';
            };
            if (typeof txtblock.link === 'undefined') {
                txtblock.link = '';
            };
            str += "<p><strong>Text:</strong> <textarea style='height: 54px; margin: 0px; width: 100%;' id='nodetext'> " + txtblock.text + "</textarea></p>";
            str += "<p><strong>Info:</strong> <textarea style='height: 54px; margin: 0px; width: 100%;' id='nodeinfo' placeholder='Enter more info here'> " + txtblock.info + "</textarea></p>";
            str += "<p><strong>Link:</strong> <textarea placeholder='Enter Video/audio link here' style='height: 54px; margin: 0px; width: 100%;' id='nodelink'> " + txtblock.link + "</textarea></p>";
            var strokeColor = shape.stroke;

        } else {
            var shape = elem.findObject("link");
            $('.shapes').hide();
            styl = shape.strokeDashArray;

            str += "<p>Style: <select class='form-control' id='lineshape'><option value='0'>plane</option><option value='2'>Small dashed</option><option value='5'>Medium dashed</option><option value='8'>Large dashed</option></select></p>";

        }
        str += '<p style="float: left; margin-right: 10px;">Color: <input type="text" id="custom" /></p>';
        info.innerHTML = str;
        if (styl == null) styl = 0;
        $('#lineshape').val(styl);
        var button = document.getElementById("SaveButton");

        $(document).on('keyup', '#nodelink', function(a) {
            var sel = e1.diagram.selection;
            var elem = sel.first();
            var shape = elem.findObject("SHAPE");
            var txtblock = elem.findObject("TEXT");
            txtblock.link = $(this).val();
            var infoicon = elem.findObject("infoicon2");
            if ($(this).val() != '') {
                infoicon.visible = true;
            } else {
                infoicon.visible = false;
            }
            //myDiagram.model = go.Model.fromJson(myDiagram.model=myDiagram.model.toJson());
        })

        $(document).on('change', '#lineshape', function(a) {
            var sel = e1.diagram.selection;
            var elem = sel.first();
            var shape = elem.findObject("link");
            shape.strokeDashArray = [+$(this).val()];
            //myDiagram.model = go.Model.fromJson(myDiagram.model=myDiagram.model.toJson());
        })

        $(document).on('change', '#shapes', function(a) {
            var sel = e1.diagram.selection;
            var elem = sel.first();
            var shape = elem.findObject("SHAPE");
            var txtblock = elem.findObject("TEXT");
            shape.figure = $(this).val();
            //myDiagram.model = go.Model.fromJson(myDiagram.model=myDiagram.model.toJson());
        })

        $(document).on('keyup', '#nodeinfo', function(a) {
            button.disabled = false;
            var sel = e1.diagram.selection;
            var elem = sel.first();
            var shape = elem.findObject("SHAPE");
            var txtblock = elem.findObject("TEXT");
            var infoicon = elem.findObject("infoicon");
            txtblock.info = $(this).val();
            if ($(this).val() != '') {
                infoicon.visible = true;
            } else {
                infoicon.visible = false;
            }
            //myDiagram.model = go.Model.fromJson(myDiagram.model=myDiagram.model.toJson());
        })
        $(document).on('keyup', '#nodetext', function(a) {
                button.disabled = false;
                var sel = e1.diagram.selection;
                var elem = sel.first();
                var shape = elem.findObject("SHAPE");
                var txtblock = elem.findObject("TEXT");
                txtblock.text = $(this).val();
                //myDiagram.model = go.Model.fromJson(myDiagram.model=myDiagram.model.toJson());
            })
            // Initialize color picker
        $("#custom").spectrum({
            color: strokeColor,

            // Change colors by constructing a gradient
            change: function(color) {
                button.disabled = false;
                var c = color.toRgb();
                var r, g, b;
                var grad1 = new go.Brush(go.Brush.Linear);
                r = Math.min(c.r + 10, 255);
                g = Math.min(c.g + 10, 255);
                b = Math.min(c.b + 10, 255);
                grad1.addColorStop(0, "rgb(" + r + "," + g + "," + b + ")");
                grad1.addColorStop(0.5, color.toRgbString());
                r = Math.max(c.r - 30, 0);
                g = Math.max(c.g - 30, 0);
                b = Math.max(c.b - 30, 0);
                grad1.addColorStop(1, "rgb(" + r + "," + g + "," + b + ")");
                shape.fill = grad1;
                shape.stroke = "rgb(" + r + "," + g + "," + b + ")";
                txtblock.stroke = (r < 100 && g < 100 && b < 100) ? "white" : "black";
            }
        });

    });


    $(function() {
        $("#paletteDraggable").draggable({
            handle: "#paletteDraggableHandle"
        }).resizable({
            // After resizing, perform another layout to fit everything in the palette's viewport
            stop: function() {
                myPalette.layoutDiagram(true);
            }
        });
        $("#infoDraggable").draggable({
            handle: "#infoDraggableHandle"
        });
        $('#myDiagram').prepend('<i id="fullview" class="fa fa-arrows-alt link"></i>');
    });



}



function shapes() {
    var str = "";
    $.each(allshapes, function(index, value) {
        str += "<option value='" + value + "'>" + value + "</option>";
    });
    $('#shapes').html(str);

    var options = $('#shapes option');
    var arr = options.map(function(_, o) {
        return {
            t: $(o).text(),
            v: o.value
        };
    }).get();
    arr.sort(function(o1, o2) {
        return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;
    });
    options.each(function(i, o) {
        o.value = arr[i].v;
        $(o).text(arr[i].t);
    });

}
// Make all ports on a node visible when the mouse is over the node
function showPorts(node, show) {
    var diagram = node.diagram;
    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
    node.ports.each(function(port) {
        port.stroke = (show ? "white" : null);
    });
}



function reload() {
    myDiagram.model = go.Model.fromJson(myDiagram.model.toJson());
}

// Show the diagram's model in JSON format that the user may edit
function deletechart(chartcode, selectid, type) {
    var r = confirm("Are you sure you want to delete this chart?");
    if (r == false) {
        return false;
    }
    var url = base_url + '/createflowchart/deleteflowchart';
    if (type == 'org') {
        url = base_url + '/createflowchart/deleteorgflowchart';
    }
    $.ajax({
        url: url,
        type: 'POST',
        datatype: 'json',
        data: {
            'chartcode': chartcode
        },
        //data: "flowchartname=" + flowchartname + "&chartcode=" + chartcode + "&content=" + json,
        beforeSend: function() {

        },
        success: function(data) {
            var data = jQuery.parseJSON(data);
            if (data.status == "success") {
                $(selectid).parents('.flowcharts').remove();
            } else if (data.status == "error") {
                alert('some error to delete !please try again');
            }
            //$(update).html(data);
        },

        complete: function() {},

        error: function(data) {
            alert("There may an error on uploading. Try again later");
        },

    });
    myDiagram.isModified = false;
}

function save(type) {
    var url = base_url + '/createflowchart/saveflowchart';
    if (type == 'org') {
        url = base_url + '/createflowchart/saveorgflowchart';
    }
    var json = myDiagram.model.toJson();
    var chartcode = $('#flowchartcode').val();
    var flowchartname = $('#flowchartname').val();
    if(!flowchartname)
    {
		$('#flowchartname').addClass('error');
		$('#OrgCharts_chart_name_em_').text('Please enter a name.').show();
		return false;
	}else
	{
		$('#flowchartname').removeClass('error');
		$('#OrgCharts_chart_name_em_').text('').hide();
	}
    var wikidescription = tinyMCE.activeEditor.getContent();
    $.ajax({
        url: url,
        type: 'POST',
        datatype: 'json',
        data: {
            'flowchartname': flowchartname,
            'chartcode': chartcode,
            'content': json,
            'wiki': wikidescription
        },
        //data: "flowchartname=" + flowchartname + "&chartcode=" + chartcode + "&content=" + json,
        beforeSend: function() {
            $('#SaveButton').text('saving...');

            // do some loading options
        },
        success: function(data) {
            var data = jQuery.parseJSON(data);
            if (data.status == "success") {
                var button = document.getElementById("SaveButton");
                button.disabled = true;
                var button2 = document.getElementById("sharebutton");
				button2.disabled = false;
                $('.remaining').html('saved <t>0</t> sec ago');
                var html = '<div class="col-lg-12 flowcharts">';
                html += '<a href="javascript:showchart(\'' + data.code + '\',this,\'' + type + '\');">';
                html += data.name + '</a><i onclick="deletechart(\'' + data.code + '\',this)" class="fa fa-times-circle-o link deletechart"></i></div>';

                if (chartcode == '') $('#all-flowchart').append(html);
                $('#flowchartcode').val(data.code);
                $('#flowchartname').val(data.name);

            } else {
                $.each(data, function(key, val) {

                    $("." + key).css('border', '1px solid red');
                    $("#" + key + "_em_").text(val);
                    $("#" + key + "_em_").show();
                });
            }
            //$(update).html(data);
        },

        complete: function() {
            // success alerts
            $('#SaveButton').text('Save');
        },

        error: function(data) {
            alert(data);
        },

    });

}

function showchart(chartcode, id, type) {
    var url = base_url + '/createflowchart/showflowchart';
    if (type == 'org') {
        url = base_url + '/createflowchart/showorgflowchart';
    }
    $('.remaining t').text(0);
    $(id).parents('.flowcharts').addClass('active');
    $.ajax({
        url: url,
        type: 'POST',
        datatype: 'json',
        data: "chartcode=" + chartcode,
        beforeSend: function() {
            $('canvas').addClass('processing');
            $('#myDiagram').prepend('<img class="loader" src="' + base_url + '/images/loader.gif">');
        },
        success: function(data) {
            try {
                var data = jQuery.parseJSON(data);
                if (data.status == "success") {
					 var button2 = document.getElementById("sharebutton");
					button2.disabled = false;
					$('.nav-tabs a[href="#charts"]').tab('show');
                    $('#flowchartcode').val(data.code);
                    $('#flowchartname').val(data.name);
                    //$('#wikieditor').val(data.wiki);
                    tinyMCE.activeEditor.setContent(data.wiki);
                    myDiagram.model = go.Model.fromJson(data.json);
                    $('canvas').removeClass('processing');
					$('.loader').remove();
                }
            } catch (e) {
                showchart(chartcode, id, type);
            }
            //$(update).html(data);
        },

        complete: function() {
            
        },

        error: function(data) {
            alert(data);
        },

    });
}

function videolink() {
    alert('hieeeee');
}

function addNodeAndLink(e, obj) {
    var adorn = obj.part;
    if (adorn === null) return;
    e.handled = true;
    var diagram = adorn.diagram;
    diagram.startTransaction("Add State");
    // get the node data for which the user clicked the button
    var fromNode = adorn.adornedPart;
    var fromData = fromNode.data;
    // create a new "State" data object, positioned off to the right of the adorned Node
    var toData = {
        text: "new"
    };
    var p = fromNode.location;
    toData.loc = p.x + 200 + " " + p.y; // the "loc" property is a string, not a Point object
    // add the new node data to the model
    var model = diagram.model;
    model.addNodeData(toData);
    // create a link data from the old node data to the new node data
    var linkdata = {};
    linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
    linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
    // and add the link data to the model
    model.addLinkData(linkdata);
    // select the new Node
    var newnode = diagram.findNodeForData(toData);
    diagram.select(newnode);
    diagram.commitTransaction("Add State");
}

function load() {
    $('.remaining').html('');
    $('#flowchartcode').val("");
    $('#flowchartname').val("");
    tinyMCE.activeEditor.setContent('');
     var button2 = document.getElementById("sharebutton");
	button2.disabled = true;
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}

// add an SVG rendering of the diagram at the end of this page
function makeSVG(json) {

    myDiagram.model = go.Model.fromJson(json);
    var svg = myDiagram.makeSvg({
        scale: 1.5
    });

    svg.style.border = "1px solid #e2e2e2";
    obj = document.getElementById("SVGArea");
    obj.appendChild(svg);
    if (obj.children.length > 0)
        obj.replaceChild(svg, obj.children[0]);
}
function createimage()
{
	$('.shareinfo').html("you can save image with right click->save as");
	$('#chartimageadmin').html('');
	$('#chartimageadmin').css('text-align','center');
	$('.modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
	  var json = myDiagram.model.toJson();
	myDiagram.model = go.Model.fromJson(json);
    var svg = myDiagram.makeImage({
        scale: 1
    });

    svg.style.border = "1px solid #e2e2e2";
    svg.style.padding = "10px";
    obj = document.getElementById("chartimageadmin");
    obj.appendChild(svg);
    if (obj.children.length > 0)
        obj.replaceChild(svg, obj.children[0]);
}

function shareorgchart()
{
	var chartcode = $('#flowchartcode').val();
	$('.shareinfo').html("now its easy to share");
	$('#chartimageadmin').removeAttr('style');
	$('.modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button id="shareorgchart" type="button" class="btn btn-default" >Start Sharing</button>');
	var link='<lable for"emails">Link to share</lable><input class="form-control" value="'+base_url+'flowcharts/orgflowchart/'+chartcode+'"></br><strong>Or you can share with emails</strong></br>';
	$('#chartimageadmin').html(link+'<lable for"emails">Enter Emails(seperated by <strong>;</strong>)</lable><input class="form-control" type="text" name="shared_email" id="shared_emails">');
}

function sharechart()
{
	$('#chartimageadmin').removeAttr('style');
	var chartcode = $('#flowchartcode').val();
	$('.shareinfo').html("Enter ; seperated emails to share this chart");
	$('.modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button id="sharechart" type="button" class="btn btn-default" >Start Sharing</button>');
	var link='<lable for"emails">Link to share</lable><input class="form-control" value="'+base_url+'flowcharts/flowchart/'+chartcode+'"></br>';
	$('#chartimageadmin').html(link+'<lable for"emails">Enter Emails(seperated by <strong>;</strong>)</lable><input class="form-control" type="text" name="shared_email" id="shared_emails">');
}
function showsvg(code) {
    $.ajax({
        url: base_url + '/flowcharts/getflowchart',
        type: 'POST',
        datatype: 'json',
        data: "chartcode=" + code,
        beforeSend: function() {

        },
        success: function(data) {
            var data = jQuery.parseJSON(data);
            if (data.status == "success") {
                $('#chartname').text(data.name);
                makeSVG(data.json);
            }
            //$(update).html(data);
        },

        complete: function() {

        },

        error: function(data) {
            alert("There may an error on uploading. Try again later");
        },

    });

}
function loadDiagramProperties(e) {
    var pos = myDiagram.model.modelData.position;
    if (pos) myDiagram.position = go.Point.parse(pos);
  }
function showSmallPorts(node, show) {
    node.ports.each(function(port) {
        if (port.portId !== "") { // don't change the default port, which is the big shape
            port.fill = show ? "rgba(0,0,0,.3)" : null;
        }
    });
}


function showLinkLabel(e) {
    var label = e.subject.findObject("LABEL");
    if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
}
