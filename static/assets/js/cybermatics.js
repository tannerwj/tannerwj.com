(function ($, document){
	$.getJSON('/static/assets/cybermatics_data.json', function (data){
		var myHtml = ''
		for(var i = data.length - 1; i >= 0; --i){
			var g = data[i].group_number
			var c = data[i].chats
			var r = data[i].reports
			
			myHtml += 
			`<div class="card">
				<div class="card-header" id="group${g}">
					<h5>
				        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${g}" aria-expanded="true" aria-controls="collapse${data[i.group_number]}">
				          Participant #${g} | # of chats ${c.length} | # of reports ${r.length}
				        </button>
			       	</h5>
		      	</div>
				<div id="collapse${g}" class="collapse" aria-labelledby="group${g}" data-parent="#accordion">
					<div class="card-body">Reports
						<ul class="reports">`

			for(var j = 0; j < r.length; j++){
				if(r[j].day != 5){
					myHtml += `<li>Day ${r[j].day} - ${JSON.parse(r[j].report).summary}</li>`
				}else{
					myHtml += 
						`<li>Day ${r[j].day}</li><ul class="day5">
							<li>Summary:  ${JSON.parse(r[j].report).summary}</li>
							<li>Process:  ${JSON.parse(r[j].report)['process']}</li>
							<li>Conclusion:  ${JSON.parse(r[j].report).conclusion}</li>
						</ul>`
				}				
			}

			myHtml += `</ul>Chats<ul class="chats">`

			for(var j = 0; j < c.length; j++){
				myHtml += `<li>${c[j].text}</li>`
			}

			myHtml +=
					`</ul></div>
				</div>
			</div>`
		}
		document.getElementById('accordion').innerHTML = myHtml
	})
}(jQuery, document))
