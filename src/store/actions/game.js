import fire from '../../fire';

export const createGame = (game) => {
    return (dispatch, getState) => {
       const db = fire.database();
       
        db.ref('game').push({ 
            ...game,
            authorName: "Alvaro",
            topScore: '200',
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: 'CREATE_GAME', game})
        }).catch((err)=>{
            dispatch({type: 'CREATE_PROJECT_ERROR', err})
        })
       
    }
}