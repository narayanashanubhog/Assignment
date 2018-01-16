import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as queueActions from '../actions/queueActions';

describe('Store',function(){
    it('should handle new  entry',()=>{
        const store=createStore(rootReducer,initialState);
        const queue={
            title:'Narayanaa'
        };
        const action=queueActions.SavetoQueue(queue);
        store.dispatch(action);
    
        const actual=store.getState().queues[0];
        const expected={
            title:'Narayanaa'
        };
        expect(actual).toEqual(expected);
    
    });
    });