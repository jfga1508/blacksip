import logo from './logo.svg';
import './App.css';

function App() {
	return ( <
		div className = "App" >
		<
		header >
		<
		div className = "container" >
		<
		div className = "labels" >
		<
		div className = "labels-1" > Envío gratis x compra < /div><br / >
		<
		div className = "labels-2" > Superior a $150 .000 < /div> <
		/div> <
		div className = "nav-sub mt-3" >
		<
		div className = "nav-sub--labels" >
		<
		button className = "navbar-toggler"
		type = "button"
		onclick = "menu_toggle()" > < span className = "navbar-toggler-icon" / > < /button> <
		/div> <
		div className = "nav-sub--logo" > < a href = "#" > < img src = "assets/images/logo.jpg"
		width = {
			115
		}
		/></a > < /div> <
		div className = "nav-sub--nav" >
		<
		ul >
		<
		li className = "nav-sub--tienda" > < a href = "#" > < i className = "fas fa-map-marker-alt mr-2" / > < span > Tiendas < /span></a > < /li> <
		li className = "nav-sub--deseos" > < a href = "#" > < i className = "far fa-heart mr-2" / > < span > Lista de deseos < /span></a > < /li> <
		li className = "nav-sub--bolsa" > < a href = "#" > < i className = "fas fa-shopping-bag mr-2" / > < span > Mi bolsa < /span></a > < /li> <
		/ul> <
		/div> <
		/div> <
		nav className = "nav" >
		<
		div className = "nav-responsive-header" > < a href = "#" > < img className = "nav-responsive-logo"
		src = "assets/images/logo.jpg" / > < /a> <
		button className = "navbar-toggler"
		type = "button"
		onclick = "menu_toggle()" > < i className = "fas fa-times"
		style = {
			{
				fontSize: '30px'
			}
		}
		/></button >
		<
		/div> <
		ul id = "nav-list" / >
		<
		/nav> <
		/div> <
		/header> {
			/* { end header}*/ } {
			/* .......................{ global - content}*/ } <
		section className = "content" >
		<
		div className = "container" >
		<
		div className = "details" >
		<
		div className = "envio mb-3" >
		<
		div className = "envio-header" >
		<
		h2 > Dirección de envío < /h2> <
		/div> <
		div className = "envio-content" >
		<
		form className = "form"
		id = "form"
		action = "https://blackisp.herokuapp.com/contact"
		method = "post" >
		<
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-user" / > < /div> <
		input className = "form-input"
		id = "nombre"
		type = "text"
		name = "nombre"
		placeholder = "Nombre"
		required / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-user" / > < /div> <
		input className = "form-input"
		id = "apellidos"
		type = "text"
		name = "apellidos"
		placeholder = "Apellidos"
		required / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-envelope" / > < /div> <
		input className = "form-input"
		id = "email"
		type = "email"
		name = "email"
		placeholder = "Correo Electrónico"
		required / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-phone-alt" / > < /div> <
		input className = "form-input"
		id = "nombre"
		type = "text"
		name = "nombre"
		placeholder = "Número de teléfono" / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-map-marker-alt" / > < /div> <
		input className = "form-input"
		id = "zip"
		type = "text"
		name = "zip"
		placeholder = "Código postal" / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-map-marker-alt" / > < /div> <
		input className = "form-input"
		id = "colonies"
		type = "text"
		name = "colonies"
		placeholder = "Colonia" / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-map-marker-alt" / > < /div> <
		input className = "form-input"
		id = "state"
		type = "text"
		name = "state"
		placeholder = "Estado/Región" / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-map-marker-alt" / > < /div> <
		input className = "form-input"
		id = "city"
		type = "text"
		name = "city"
		placeholder = "Ciudad" / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-map-marker-alt" / > < /div> <
		input className = "form-input"
		id = "town"
		type = "text"
		name = "town"
		placeholder = "Delegación o municipio" / >
		<
		/div> <
		div className = "form-component" >
		<
		div className = "form-icon" > < i className = "fas fa-map-marked-alt" / > < /div> <
		input className = "form-input"
		id = "street"
		type = "text"
		name = "street"
		placeholder = "Calle" / >
		<
		/div> <
		div className = "form-footer" >
		<
		button className = "button button-black"
		type = "button" > Libreta de direcciones < /button> <
		button className = "button button-black"
		type = "submit" > Guardar < /button> <
		p >
		<
		input type = "checkbox" / > Utilizar como dirección de facturación. <
		/p> <
		p className = "form-success"
		style = {
			{
				display: 'none'
			}
		} > El formulario fue enviado. < /p> <
		p className = "form-error"
		style = {
			{
				display: 'none'
			}
		} > El formulario no se pudo enviar. < /p> <
		/div> <
		/form> <
		/div> <
		/div> <
		div className = "resumen" >
		<
		div className = "resumen-header" >
		<
		h2 > Resumen de la orden < /h2> <
		/div> <
		div className = "resumen-content"
		id = "resumen-items" / >
		<
		div className = "resumen-footer" >
		<
		div className = "resumen-footer--subtotal" >
		<
		div > SUBTOTAL < br / > ENVÍO < /div> <
		div className = "text-right" > < span id = "resumen-subtotal" / > < br / > < span > A calcular < /span></div >
		<
		/div> <
		div className = "resumen-footer--total" > < span > TOTAL < /span><span className="text-right" id="resumen-total" / > < /div> <
		/div> <
		/div> <
		/div> <
		/div> <
		/section> < /
		div >
	);
}

export default App;