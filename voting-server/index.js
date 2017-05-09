import makeStore from './src/store';
import startServer from './server'

const store = makeStore()
startServer(store);