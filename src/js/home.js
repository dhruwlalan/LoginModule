// ASSETS
import './assets.js';

// MAIN
import showAlert from './alerts.js';

const logout = document.getElementById('logout');

logout.addEventListener('click' , async () => {
	try {
		const res = await axios({
			method: 'GET' ,
			url: '/api/v1/users/logout' ,
		});
		if (res.data.status === 'success') {
			setTimeout(() => {
				showAlert('success' , 'Logged out Successfully!')
				setTimeout(() => {
					location.assign('/login');
				} , 500 );
			} , 500 );
		}
	} catch (e) {
		console.log(e);
	}
});