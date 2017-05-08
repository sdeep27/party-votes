import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('Immutability', () => {
  describe('number function', () => {
    const increment = (currentState) => currentState+1;
    it('should not modify state', () => {
      const state = 1;
      const nextState = increment(state);
      expect(state).to.equal(1);
      expect(nextState).to.equal(2);
    });
  });
  describe('immutable lists', () => {
    const addMovie = (currentState, item) => currentState.push(item);
    const movies = List.of('12 Monkeys', 'Sixth Sense');
    const newMovie = 'Alien'
    it('should not mutate state', () => {
      const nextState = addMovie(movies, newMovie);
      expect(nextState).to.equal(List.of('12 Monkeys', 'Sixth Sense', 'Alien'));
      expect(movies).to.equal(List.of('12 Monkeys', 'Sixth Sense'));
    })
  })
  describe('immutable maps', () => {
    const movies = Map({movie: List.of('12 Monkeys', 'Sixth Sense')});
    const newMovie = 'Alien';
    const addMovie = (currentState, item) => {
      return currentState.set('movie',
      currentState.get('movie').push(item)
      )
    }
    it('should not mutate mutate map', () => {
      const nextState = addMovie(movies, newMovie);
      expect(movies).to.equal(Map({movie: List.of('12 Monkeys', 'Sixth Sense')}));
      expect(nextState).to.equal(Map({movie: List.of('12 Monkeys', 'Sixth Sense', newMovie)}));
    })
  })
});

