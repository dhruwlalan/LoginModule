// ASSETS
import './assets.js';

// EXTERNALS
import axios from 'axios';
import logoutModel from './models/logoutModel.js';
import showAlert from './views/alerts.js';
import dom from './views/dom.js';

// CODE
dom.edit.addEventListener('click' , () => { location.assign('/edit') });
dom.logout.addEventListener('click' , logoutModel);