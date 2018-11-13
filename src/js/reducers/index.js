// src/js/reducers/index.js
import { ADD_ARTICLE, CHANGE_STATE } from "../constants/action-types";

const initialState = {
        // Build Menu in Base
        buildMenuValue : '',
        build : false,

        // Upgrade Menu in Base
        upgradeConnect : '',
        upgrade : false,

        // connects the change of the building
        buildConnect : '',

        // Capital
        capital : false,
        capitalTier  : 1,

        // Is Somthing built on it?
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

        // Whats Built on it?
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

        // The Tier of whats built on it?
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

        // Upgrade type being used to upgrade with
        BUModel : '',

        // Upgrade price per building
        BUFood : 0,
        BUWood : 0,
        BUMetal : 0,
        BUStone : 0,
        BUOil : 0,

        // Upgrade Benefits
        BUPop : 0,
        BUPopM : 0,
        BUBattleSurvive : 0,
        BUResearch : 0,
        BUBattleWining : 0,

        // true false
        research : {
            'homet1' : true,
            'campt1' : true,
            'storet1' : true,
            'schoolt1' : false,
            'factoryt1' : false,
            'homet2' : false,
            'campt2' : false,
            'storet2' : false,
            'schoolt2' : false,
            'factoryt2' : false,
            'homet3' : false,
            'campt3' : false,
            'storet3' : false,
            'schoolt3' : false,
            'factoryt3' : false,
        },
        // Research on whats unlocked
        unlocklocks : {
            unlockhomet1 : '',
            unlockhomet2 : 'unlock',
            unlockhomet3 : 'locked',
            unlockcampt1 : '',
            unlockcampt2 : 'unlock',
            unlockcampt3 : 'locked',
            unlockstoret1 : '',
            unlockstoret2 : 'unlock',
            unlockstoret3 : 'locked',
            unlockschoolt1 : 'unlock',
            unlockschoolt2 : 'locked',
            unlockschoolt3 : 'locked',
            unlockfactoryt1 : 'unlock',
            unlockfactoryt2 : 'locked',
            unlockfactoryt3 : 'locked',
        },
        // whats being unlocked
        pUType : '',
        prevUnlock : '',
        pUTier : '',
        pUName : '',
        // whats being unlocked cost
        prevUnlockCost : 0,
        // Research
        res : 0,
        resAdd : 6,
        // Total Resources
        wood : 30,
        food : 30,
        metal: 5,
        stone : 15,
        oil : 0,
        pop : 0,
        troop : 32,
        // Resources Added Each Round
        woodAdd : 10,
        foodAdd : 10,
        metalAdd: 10,
        stoneAdd : 10,
        oilAdd : 10,
        troopAdd : 10,
        
        // Resource Production Tier
        Tier : {
            stoneTier : 1,
            woodTier : 1,
            oilTier : 1,
            foodTier : 1,
            metalTier : 1,
        },

        buildResource : false,

        // Lets the User Know whats happening
        text1 : '...',
        text2 : '...',

        troopAll : true,

        // What Round
        round : 1,

        // Upgrade Resource On or Off
        upgradeSupplies : false,

        // Resource Individual cost
        supCost1 : 0,
        supCost2 : 0,
        supCost3 : 0,
        supCost4 : 0,
        supCost5 : 0,

        // Resource Production Tier
        supTier : 1,

        // Resource Whats Selected
        resourceSelected : '',

        // Win or Loose?
        winLoose  : 'win/loose',
        // All that have survived
        survived  : 0,
        // How many people died during battle
        deaths : 0,

        // score of the game what the High score is
        // Whats going to be added
        scoreAdd : 0,
        // Total Score
        score : 0,

        // What Resources the user found during a battle
        woodGained : 0,
        foodGained : 0,
        metalGained : 0,
        stoneGained : 0,
        oilGained : 0,

        // How many Wars the user has won
        battleWon : 0,
        // Is the GameOver
        gameOver : false,
};

// Sends Out the Props and Updates the props
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