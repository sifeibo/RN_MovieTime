import Types from '../types'

/**
 * 收藏状态改变
 * @param {*} themeColor 
 */
var tag = 0
export function onCollectionAction(){
    return {
        type: Types.COLLECT_ACTION,
        tag: ++tag
    }
}
