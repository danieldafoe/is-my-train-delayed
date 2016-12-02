// ==========================================================================
// Application JavaScript for IMTD?
// ==========================================================================

document.addEventListener('DOMContentLoaded', init);

function init() {
	var trainInfo = document.querySelector('.train-info');

	trainInfo.addEventListener('click', function(e) {
		handleDelayInfoClick(e);
	});

	function handleDelayInfoClick(event) {
		event.preventDefault();

		if (event.target.parentElement.parentElement.nextSibling.classList.contains('delay-info--show')) {
			event.target.parentElement.parentElement.nextSibling.classList.remove('delay-info--show')
		}
		else {
			event.target.parentElement.parentElement.nextSibling.classList.add('delay-info--show');
		}
	}
	// function handleRefresh() {
	// 	var oReq = new XMLHttpRequest();
	// 	oReq.addEventListener("load", handleResponse);
	// 	oReq.open("GET", "http://localhost:5000/fetch");
	// 	oReq.send();
	// }
	// function handleResponse(res) {
	// 	console.log(res);
	// 	var data = JSON.parse(res.target.response);
	// 	if (res.target.status === 200) {
	// 		// OK
			
	// 	}
	//}
}