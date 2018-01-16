import expect from 'expect';
import queueReducer from './queueReducer';
import * as actions from '../actions/queueActions';

describe('Course Reducer',()=>{
    it('should add entry when passed SAVE_TO_QUEUE',()=>
    {
        const initialState=[
            {title:'1'},
            {title:'2'}
        ];
        const newEntry={title:'3'};
        const action=actions.SavetoQueue(newEntry);
        const newState=queueReducer(initialState,action);
        expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('1');
    });
    });
    