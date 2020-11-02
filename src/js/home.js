// ASSETS
import './assets.js';

// MAIN
import showAlert from './alerts.js';

const edit = document.getElementById('edit');
const logout = document.getElementById('logout');

edit.addEventListener('click' , () => {
	location.assign('/edit');
});
logout.addEventListener('click' , async () => {
	try {
		const res = await axios({
			method: 'GET' ,
			url: '/api/v1/users/logout' ,
		});
		if (res.data.status === 'success') {
			location.reload(true);
		}
	} catch (e) {
		showAlert('error' , e);
	}
});