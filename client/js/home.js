// ASSETS
import './assets.js';

// EXTERNALS
import logoutModel from './models/logoutModel.js';
import dom from './views/dom.js';

// CODE
dom.edit.addEventListener('click', () => {
   location.assign('/edit');
});
dom.logout.addEventListener('click', logoutModel);
