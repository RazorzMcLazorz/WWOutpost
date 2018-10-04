// src/js/reducers/index.js
import { ADD_ARTICLE, CHANGE_STATE } from "../constants/action-types";

const initialState = {
        buildMenuValue : '',
        upgrade : false,
        upgradeConnect : '',
        build : false,
        buildConnect : '',
        building : {
            'tl2' : false,
            'tl1' : false,
            'tl' : false,
            'ml' : false,
            'bl' : false,
            'bl1' : false,
            'bl2' : false,
        
            'tm2' : false,
            'tm1' : false,
            'tm' : false,
            'mm' : true,
            'bm' : false,
            'bm1' : false,
            'bm2' : false,
        
            'tr2' : false,
            'tr1' : false,
            'tr' : false,
            'mr' : false,
            'br' : false,
            'br1' : false,
            'br2' : false,
        },
        built : {
            'tl2' : '',
            'tl1' : '',
            'tl' : '',
            'ml' : '',
            'bl' : '',
            'bl1' : '',
            'bl2' : '',
        
            'tm2' : '',
            'tm1' : '',
            'tm' : '',
            'mm' : '',
            'bm' : '',
            'bm1' : '',
            'bm2' : '',
        
            'tr2' : '',
            'tr1' : '',
            'tr' : '',
            'mr' : '',
            'br' : '',
            'br1' : '',
            'br2' : '',
        },
        builtTier : {
            'tl2' : 't1',
            'tl1' : 't1',
            'tl' : 't1',
            'ml' : 't1',
            'bl' : 't1',
            'bl1' : 't1',
            'bl2' : 't1',
        
            'tm2' : 't1',
            'tm1' : 't1',
            'tm' : 't1',
            'mm' : 't1',
            'bm' : 't1',
            'bm1' : 't1',
            'bm2' : 't1',
        
            'tr2' : 't1',
            'tr1' : 't1',
            'tr' : 't1',
            'mr' : 't1',
            'br' : 't1',
            'br1' : 't1',
            'br2' : 't1',
        },
        research : {
            'homet1' : true,
            'campt1' : true,
            'storet1' : true,
            'schoolt1' : false,
            'factoryt1' : false,
            'homet2' : false,
        },
        wood : 30,
        food : 30,
        metal: 5,
        stone : 15,
        oil : 0,
        pop : 0,
        res : 5,
        troop : 32,
        woodAdd : 0,
        foodAdd : 0,
        metalAdd: 0,
        stoneAdd : 0,
        oilAdd : 0,
        troopAdd : 0,
        buildResource : false,
        text1 : 'text 1',
        text2 : 'text 2',
        troopAll : true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      state.articles.push(action.payload);
      return state;
    case CHANGE_STATE:
        const changedState = action.payload
        return {
            ...state,
            ...changedState
        }
    default:
      return state;
  }
};

export default rootReducer;