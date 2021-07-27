import {
    ADD,
    MINUS
} from "../constants/counter";
  
export const add = (num:number) => {
    return {
        type: ADD,
        num
    };
};
export const minus = () => {
    return {
        type: MINUS
    };
};
  
// 异步的 action
export function asyncAdd () {
    return dispatch => {
        setTimeout(() => {
            dispatch(add());
        }, 2000);
    };
}
  

export default {add,minus}