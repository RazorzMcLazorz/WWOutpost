// src/js/actions/index.js

import { ADD_ARTICLE, CHANGE_STATE } from "../constants/action-types";
export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });
export const changeState = state => ({ type: CHANGE_STATE, payload: state });