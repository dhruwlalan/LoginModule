// ASSETS
import './assets.js';

// MAIN
import axios from 'axios';
import logoutModel from './models/logoutModel.js';
import showAlert from './views/alerts.js';
import dom from './views/dom.js';


dom.edit.addEventListener('click' , () => { location.assign('/edit') });
dom.logout.addEventListener('click' , logoutModel);