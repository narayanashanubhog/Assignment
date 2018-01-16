export default function queueReducer(state=[],action){
    switch(action.type){
        case 'SAVE_TO_QUEUE' :
        return [...state,
        Object.assign({},action.queue)
        ];
        default :
         return state;
    }
    }