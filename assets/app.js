console.log("ici");

import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/app.scss';
import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app'));
root.render(<React.StrictMode><App /></React.StrictMode>);