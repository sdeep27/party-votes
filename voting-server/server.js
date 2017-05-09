import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  //subscriber to the redux store, will emit JS version of state to the all connected
  //socket clients on any changes to the state
  store.subscribe(() => io.emit('state', store.getState().toJS()))
  
  //we also need all new connections to be updated on the app state
  //and also be able to emit actions so they can vote
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  })

}