(function () {
	var byId = function (id) { return document.getElementById(id); }
	Sortable.create(byId('foo'), {
		group: "words",
		animation: 150,
	});
})();



