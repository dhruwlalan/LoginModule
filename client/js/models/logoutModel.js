import axios from 'axios';
import showAlert from '../views/alerts.js';

export default async (loc = '') => {
	if (typeof loc === 'object') loc = '';
	try {
		const res = await axios({
			method: 'GET' ,
			url: '/api/v1/users/logout' ,
		});
		if (res.data.status === 'success') {
			location.assign(`/${loc }`);
		}
	} catch (e) {
		showAlert('error' , e);
	}
}