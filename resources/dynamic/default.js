(function() {
        var textHighlight1 = new TextHighlight({adcID:"adc_{%= CurrentADC.InstanceId %}",
        currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
		option: {% Dim i %}
        {% If CurrentQuestion.AvailableResponses.Count > 1 Then%}
        {%= CurrentQuestion.AvailableResponses.Count%}
        {% Else%}
        {%= CurrentADC.PropValue("likeOpt") %}
        {%EndIf%},
        values:[{% For i=1 To CurrentQuestion.AvailableResponses.Count%}
        {%= CurrentQuestion.AvailableResponses[i].InputValue() %},
        {%Next%}
        ]});
}());