function menu_toggle() {
	var nav = document.querySelector('nav.nav');
	nav.classList.toggle('toggled');
}

function isHidden(el) {
	return (el.offsetParent === null)
}

function getJSON(url, qs_params) {
	function buildQueryString(params) {
		return Object.entries(params).map(d => `${d[0]}=${d[1]}`).join('&');
	}

	return new Promise((resolve, reject) => {
		const qs = qs_params ? '?' + buildQueryString(qs_params) : '';
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `${url}${qs}`);

		xhr.onload = function() {
			if (xhr.status >= 200 && xhr.status < 400) {
				resolve(JSON.parse(xhr.responseText));
			} else {
				resolve(xhr.responseText);
			}
		};
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
}

function formatMoney(number, decPlaces, decSep, thouSep) {
	decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
		decSep = typeof decSep === "undefined" ? "." : decSep;
	thouSep = typeof thouSep === "undefined" ? "," : thouSep;
	var sign = number < 0 ? "-" : "";
	var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
	var j = (j = i.length) > 3 ? j % 3 : 0;

	return sign +
		(j ? i.substr(0, j) + thouSep : "") +
		i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
		(decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

$(document).ready(function() {
	let menuObj, productsObj, menuHtml = '',
		timer;

	/*
	//////////////////////
	* Load menu
	//////////////////////
	*/
	getJSON("https://blackisp.herokuapp.com/menu")
		.then(data => {
			menuObj = data;

			// Build menu
			if (menuObj) {
				menuObj.forEach(function(data) {
					var nav_title = data.title;
					var nav_subItems = data.subItems;

					menuHtml += '<li>';
					menuHtml += '<a href="#" class="menu_link ' + (nav_subItems ? 'menu_toggle' : '') + '">' + nav_title + '</a>';

					if (nav_subItems) {
						menuHtml += '<ul class="sub-menu">';
						nav_subItems.forEach(function(subItems) {
							var subItems_title = subItems.title;
							menuHtml += '<li><a href="#">' + subItems_title + '</a></li>';
						});
						menuHtml += '</ul>';
					}

					menuHtml += '</li>';
				});

				var nav_list = document.querySelector('#nav-list');

				// Set HTML content
				nav_list.innerHTML = menuHtml;

				// Add event listeners to links
				var toggle_items = document.getElementsByClassName('menu_link');

				for (let i = 0; i < toggle_items.length; i++) {
					toggle_items[i].addEventListener("click", function() {
						console.log('Se hizo clic al menú ' + toggle_items[i].textContent);
					});

					if (toggle_items[i].classList.contains('menu_toggle')) {
						toggle_items[i].addEventListener("click", function() {
							if (isHidden(toggle_items[i].nextElementSibling)) {
								toggle_items[i].nextElementSibling.style.display = 'block';
							} else {
								toggle_items[i].nextElementSibling.style.display = 'none';
							}
						});
					}
				}
			}
		});

	/*
	//////////////////////
	* Load products
	//////////////////////
	*/
	getJSON("https://blackisp.herokuapp.com/products")
		.then(data => {
			productsObj = data;

			var total = 0,
				subtotal = 0,
				product_list = '';
			productsObj.forEach(function(product) {
				product_list += '<div class="resumen-item">';
				product_list += '<img class="resumen-item--image image-cover" src="' + product.image + '" />';
				product_list += '<div class="resumen-item--name">' + product.name + '</div>';
				product_list += '<div class="resumen-item--price">$' + formatMoney(product.price) + '</div>';
				product_list += '</div>';
				subtotal += parseInt(product.price);
			});
			total = subtotal;

			document.getElementById('resumen-items').innerHTML = product_list;
			document.getElementById('resumen-subtotal').textContent = formatMoney(subtotal);
			document.getElementById('resumen-total').textContent = formatMoney(total);
		});

	/*
	//////////////////////
	* Automate form inputs
	//////////////////////
	*/
	const input_zip = document.getElementById('zip');
	input_zip.addEventListener('input', updateInputs);

	function updateInputs(e) {
		var zip = e.srcElement.value ? e.srcElement.value : 0;
		// Avoid overload by clearing the timer script
		clearTimeout(timer);
		timer = setTimeout(function() {
			getJSON('https://blackisp.herokuapp.com/postalCodes/' + zip)
				.then(data => {
					var ciudad = data.city;
					var estado = data.state;
					var municipio = data.town;
					var colonias = data.colonies;

					document.getElementById('city').value = ciudad;
					document.getElementById('state').value = estado;
					document.getElementById('town').value = municipio;

					if (colonias && Object.keys(colonias).length > 1) {
						// Create select input
						var newColonies = document.createElement('select');
						newColonies.id = 'colonies';
						newColonies.classList = 'form-input';
						newColonies.setAttribute('name', 'colonies');
						colonias.forEach(function(val) {
							newColonies.innerHTML += '<option val="' + val + '">' + val + '</option>';
						});

						var currentColonies = document.getElementById('colonies');
						currentColonies.parentNode.replaceChild(newColonies, currentColonies);
					} else {
						// Create input
						var newColonies = document.createElement('input');
						newColonies.id = 'colonies';
						newColonies.classList = 'form-input';
						newColonies.value = (colonias ? colonias : '');
						newColonies.setAttribute('type', 'text');
						newColonies.setAttribute('placeholder', 'Colonia');
						newColonies.setAttribute('name', 'colonies');

						var currentColonies = document.getElementById('colonies');
						currentColonies.parentNode.replaceChild(newColonies, currentColonies);
						if (typeof colonias === 'undefined') {
							document.getElementById('city').value = '';
							document.getElementById('state').value = '';
							document.getElementById('town').value = '';
						}
					}
				});
		}, 1000);
	}
});

/*
//////////////////////
* Form Ajax
//////////////////////
*/
$("#form").submit(function(e) {
	e.preventDefault(); // avoid to execute the actual submit of the form.

	var form = $(this);
	var url = form.attr('action');

	$.ajax({
		type: "POST",
		url: url,
		data: form.serialize(), // serializes the form's elements.
		success: function(data) {
			form.find('.form-success').fadeIn();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			form.find('.form-error').fadeIn();
		}
	});


});