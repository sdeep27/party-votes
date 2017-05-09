import makeStore from './src/store';
import startServer from './server'

const store = makeStore()
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});