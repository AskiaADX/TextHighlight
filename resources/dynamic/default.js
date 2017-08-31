(function () {

    /**
     * Change the color of the clicked span and change the value of the coresponding input
     * @param {HTMLElement} myDiv  The container of the adc
     * @param {HTMLElement}   btn    Button wich is clicked
     * @param {Array} values Array of values for the inputs
     */
    function changeColor(myDiv, btn, values) {
        var index = btn.parentNode.id.substr(7);
        var response = myDiv.getElementsByTagName("input")[index];
        var spanClass;

        switch (btn.className) {
            case ("likeIMG"):
                response.value = values[0];
                spanClass = "like";
                break;
            case ("neutralIMG"):
                response.value = values[1];
                spanClass = "neutral";
                break;
            case ("dislikeIMG"):
                response.value = values[values.length - 1];
                spanClass = "dislike";
                break;
            case ("removeIMG"):
                response.value = "";
                spanClass = "sentence";
                break;
        }

        myDiv.getElementsByTagName("span")[index].className = spanClass;
        myDiv.getElementsByTagName("span")[index].firstChild.className = spanClass;
        clic(myDiv.getElementsByTagName("span")[index]);
    }

    /**
     * Add the events to each button of the popup
     * @param {Array} buttons Array which contains all the buttons of the popup
     * @param {HTMLElement} myDiv   The container of the adc
     * @param {Array} values  Array of values for the inputs
     */
    function addButtonEvents(buttons, myDiv, values) {
        for (var j = 0; j < buttons.length; j++) {
            (function (j) {
                if (buttons[j].addEventListener) {
                    buttons[j].addEventListener("click", function (e) {
                        e.preventDefault();
                        changeColor(myDiv, this, values);
                        this.parentNode.className = this.parentNode.className.replace("show", "");
                    });
                } else {
                    buttons[j].attachEvent("onclick", function (e) {
                        e.preventDefault();
                        changeColor(myDiv, buttons[j], values);
                        buttons[j].parentNode.className = buttons[j].parentNode.className.replace("show", "");
                    });
                }
            }(j));
        }
    }

    /**
     * Add the buttons to the popup
     * @param {HTMLElement} popup  The container of the popup
     * @param {number} option Option which defines the number of buttons
     */
    function addButtons(popup, option) {
        var buttonL = document.createElement("button"),
            buttonD = document.createElement("button"),
            buttonN = document.createElement("button"),
            buttonR = document.createElement("button");

        buttonD.className = "dislikeIMG";
        buttonL.className = "likeIMG";
        buttonN.className = "neutralIMG";
        buttonR.className = "removeIMG";

        if (option == 3) {
            popup.appendChild(buttonL);
            popup.appendChild(buttonN);
            popup.appendChild(buttonD);
            popup.appendChild(buttonR);
        } else {
            popup.appendChild(buttonL);
            popup.appendChild(buttonD);
            popup.appendChild(buttonR);
        }
    }

    /**
     * Display the popup when a span is clicked
     * @param {number} option Option which defines the number of buttons
     * @param {HTMLElement}   popup  The container of the popup
     * @param {HTMLElement} myDiv  The container of the adc
     */
    function displayPopup(option, popup, myDiv, event) {
        
        popup.style.position = "fixed";
        var posleft = (event.clientX - (popup.clientWidth / 2) - 5);
        var postop = (event.clientY - popup.clientHeight - 10);
        
        if (posleft < 0) {
            posleft = 0;
        }
        
        if (postop < 0) {
            postop = 0;
        }
        
        popup.style.left = posleft + "px";
        popup.style.top = postop + "px";

        if (document.querySelectorAll(".show").length == 0) {
            popup.className += " show";
        } else {
            document.querySelector(".show").className = document.querySelector(".show").className.replace("show", "");
        }
    }
    
    /**
     * Toggle the clicked class on the span when click
     * @param {HTMLElement}   spans The clicked span
     */
    function clic(spans){
        var allSpans = document.getElementsByTagName("span");
        if (spans.className == "sentence" && document.querySelectorAll(".show").length == 0){
            spans.className = "clicked";
        } else {
            for(var i = 0; i < allSpans.length; i++){
                if(allSpans[i].className == "clicked"){
                    allSpans[i].className = "sentence";
                    allSpans[i].firstChild.className = "sentence";
                }
            }
        }
    }

    /**
     * Initialize the popups and the events on the spans when option is 2 or 3
     * @param {Array} spans  Array which contains the spans of the inputText
     * @param {HTMLElement} myDiv The container of the adc
     * @param {number} option Option which defines the number of buttons
     * @param {Array} values Array of values for the inputs
     */
    function popupAndButtons(spans, myDiv, option, values) {
        for (var i = 0; i < spans.length; i++) {
            (function (i) {
                var popup = document.createElement("div");
                popup.className = "popuptext";
                popup.id = "mypopup" + i;
                myDiv.querySelector(".inputText").appendChild(popup);
                
                addButtons(popup, option);
                addButtonEvents(popup.children, myDiv, values);
                
                if (spans[i].addEventListener) {
                    spans[i].addEventListener("click", function (e) {
                        e.preventDefault();
                        clic(spans[i]);
                        displayPopup(option, popup, myDiv, e);
                    });
                } else {
                    spans[i].attachEvent("onclick", function (e) {
                        e.preventDefault
                        clic(spans[i]);
                        displayPopup(option, popup, myDiv, e);
                    });
                }
            }(i));
        }
    }

    
    /**
     * Change the color of the selected span and change the value of the coresponding input
     * @param {Array} spans  Array which contains the spans of the inputText
     * @param {HTMLElement} myDiv The container of the adc
     * @param {Array} values Array of values for the inputs
     */
    function like(spans, myDiv, values) {
        for (var i = 0; i < spans.length; i++) {
            (function (i) {
                if (spans[i].addEventListener) {
                    spans[i].addEventListener("click", function (e) {
                        e.preventDefault
                        clic(spans[i]);
                        if (myDiv.getElementsByTagName("input")[i].value == "" && document.querySelectorAll(".show").length==0) {
                            myDiv.getElementsByTagName("input")[i].value = values[0];
                            spans[i].className = "like";
							spans[i].firstChild.className = "like";
                        } else if  (document.querySelectorAll(".show").length==0) {
                            myDiv.getElementsByTagName("input")[i].value = "";
                            spans[i].className = "sentence";
                            spans[i].firstChild.className = "sentence";
                        } else {
                            document.querySelector(".show").className = document.querySelector(".show").className.replace("show", "");
                        }
                    });
                } else {
                    spans[i].attachEvent("onclick", function (e) {
                        e.preventDefault();
                        clic(spans[i]);
                        if (myDiv.getElementsByTagName("input")[i].value == "" && document.querySelectorAll(".show").length==0) {
                            myDiv.getElementsByTagName("input")[i].value = values[0];
                            spans[i].className = "like";
                            spans[i].firstChild.className = "like";
                        } else if (document.querySelectorAll(".show").length==0){
                            myDiv.getElementsByTagName("input")[i].value = "";
                            spans[i].className = "sentence";
                            spans[i].firstChild.className = "sentence";
                        } else {
                            document.querySelector(".show").className = document.querySelector(".show").className.replace("show", "");
                        }
                    });
                }
            }(i));
        }
    }

    /**
     * Change the color of the selected span and change the value of the coresponding input
     * @param {Array} spans  Array which contains the spans of the inputText
     * @param {HTMLElement} myDiv The container of the adc
     * @param {Array} values Array of values for the inputs
     */
    function dislike(spans, myDiv, values) {
        for (var i = 0; i < spans.length; i++) {
            (function (i) {
                if (spans[i].addEventListener) {
                    spans[i].addEventListener("click", function (e) {
                        e.preventDefault();
                        clic(spans[i]);
                        if (myDiv.getElementsByTagName("input")[i].value == "" && document.querySelectorAll(".show").length==0) {
                            myDiv.getElementsByTagName("input")[i].value = values[0];
                            spans[i].className = "dislike";
                            spans[i].firstChild.className = "dislike";
                        } else if (document.querySelectorAll(".show").length==0) {
                            myDiv.getElementsByTagName("input")[i].value = "";
                            spans[i].className = "sentence";
                            spans[i].firstChild.className = "sentence";
                        } else {
                            document.querySelector(".show").className = document.querySelector(".show").className.replace("show", "");
                        }
                    });
                } else {
                    spans[i].attachEvent("onclick", function (e) {
                        e.preventDefault();
                        clic(spans[i]);
                        if (myDiv.getElementsByTagName("input")[i].value == "" && document.querySelectorAll(".show").length==0) {
                            myDiv.getElementsByTagName("input")[i].value = values[0];
                            spans[i].className = " dislike";
                            spans[i].firstChild.className = "dislike";
                        } else if (document.querySelectorAll(".show").length==0) {
                            myDiv.getElementsByTagName("input")[i].value = "";
                            spans[i].className = "sentence";
                            spans[i].firstChild.className = "sentence";
                        } else {
                            document.querySelector(".show").className = document.querySelector(".show").className.replace("show", "");
                        }
                    });
                }
            }(i));
        }
    }
    
    /**
     * Initialize the classes of the spans when inputs are already valued
     * @param {HTMLElement} spans  Array wich contains the spans of the inputText
     * @param {HTMLElement} inputs Array wich contains the inputs of the adc
     * @param {Array} values Array of values for the inputs
     */
    function init(spans, inputs, values, option){
        for (var i=0; i<spans.length; i++){
            if (inputs[i].value == values[0] && option != -1) {
                spans[i].className = "like";
            } else if (inputs[i].value == values[1] && values.length == 3) {
                spans[i].className = "neutral";
            } else if (inputs[i].value != "") {
                spans[i].className = "dislike";
            }
        }
    }



    /**
     * Creates a new instance of TextHighlight
     * @param {number} option Number of choices
     * @param {string} adc    ID of the container of the adc
     * @param {Array} values Array of values for the inputs
     */
    function TextHighlight(parameters) {
        this.option = parameters.option; //get the input option
        this.adcID = parameters.adcID;
        this.values = parameters.values;
        var myDiv = document.getElementById(this.adcID);

        var spans = document.getElementById(this.adcID).querySelectorAll(".sentence");
        
        init(spans, myDiv.getElementsByTagName("input"), this.values, this.option);

        if (this.option >= 2) {
            popupAndButtons(spans, myDiv, this.option, this.values);
        } else if (this.option == 1) {
            like(spans, myDiv, this.values);
        } else if (this.option == -1) {
            dislike(spans, myDiv, this.values);
        }
        
        if (window.addEventListener) {
            window.addEventListener('mouseup', function(event){
                event.preventDefault();
                if ((event.target.tagName != "BUTTON") && document.querySelectorAll(".show").length>0){
                    clic(myDiv.getElementsByTagName("span")[document.querySelector(".show").id.substr(7)]);
                    document.querySelector(".show").className = document.querySelector(".show").className.replace("show", "");
                }
            });
        } else  {        
            document.querySelector("body").attachEvent('onmouseup', function(event) {
                event.preventDefault();
                if ((window.event.srcElement.tagName != "BUTTON") && document.querySelectorAll(".show").length>0){
                    clic(myDiv.getElementsByTagName("span")[document.querySelector(".show").id.substr(7)]);
                    document.querySelector(".show").className = document.querySelector(".show").className.replace("show", "");
                }
            });
        }
        
        var spans = document.querySelectorAll("#adc_{%=CurrentADC.InstanceId %} span");
        for(i=0; i<spans.length; ++i){
            console.log(spans[i].className);
            spans[i].firstChild.className = spans[i].className;
        }
    }
    
    window.TextHighlight = TextHighlight;
}());