import React from 'react'

import { PROJECT_NAME } from '../../_helpers'


const footer = () => (
    <footer className="footer">
        © {new Date().getFullYear()} | {PROJECT_NAME}  <span className="text-muted d-none d-sm-inline-block float-right">Powered by <i className="fa fa-github"></i> <a target="_blank" rel="noopener noreferrer" href="https://github.com/panttojo">panttojo</a></span>
    </footer>
);

export default footer;
