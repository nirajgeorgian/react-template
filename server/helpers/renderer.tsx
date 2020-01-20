import fs from 'fs'
import util from 'util'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from '../../src/app'
import { Provider } from 'react-redux'

const readFile = util.promisify(fs.readFile)

export const serverRenderer = async (req, store) => {
    const htmlFile = await readFile('./build/index.html');
    const data = htmlFile.toString();
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <App />
            </StaticRouter>
        </Provider>
    )
	
    return data.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
}