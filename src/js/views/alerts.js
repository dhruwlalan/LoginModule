
export default (type , message) => {
	let el;
	if (type === 'success') {
		el = `<div class="alert alert--success">${message }</div>`;
	} else if (type === 'error') {
		el = `<div class="alert alert--error">${message }</div>`;
	}
	document.body.insertAdjacentHTML('afterbegin' , el);
	document.querySelector('.alert').classList.add('slideInDown');
	setTimeout(() => {
		const alert = document.querySelector('.alert')
		alert.classList.add('slideOutUp');
		alert.classList.remove('slideInDown');
		setTimeout(() => {
			alert.remove();
		} , 500 );
	} , 1500 );
};