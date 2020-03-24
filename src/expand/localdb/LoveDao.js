import AsyncStorage from "@react-native-community/async-storage";

const LOVE_KEY_PREFIX = 'love_';
export default class LoveDao{
    constructor(flag) {
        this.loveKey = LOVE_KEY_PREFIX + flag;
    }

    /**
     * 收藏项目，格式： movieid: {movieid: '1',moviename:'千与千寻'...}
     * @param {*} key 电影id
     * @param {*} value  收藏相关属性
     * @param {*} callback
     * @memberof LoveDao
     */
    saveLoveItem(key, value, callback){
        AsyncStorage.setItem(key, JSON.stringify(value),(error,result)=>{
            if(!error){
                // 如果存储没有出错,更新收藏的电影id集合
                this.updateLoveKeys(key, true);
            }
        });
    }


    /**
     * 更新收藏电影id的集合
     * @param {*} key  电影id
     * @param {*} isAdd  true为添加，flase为删除
     * @memberof LoveDao
     */
    updateLoveKeys(key, isAdd){
        AsyncStorage.getItem(this.loveKey,(error, result)=>{
            if(!error){

                let loveKeys = [];
                if(result){
                    loveKeys = JSON.parse(result);
                }
                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置,若没有则返回-1
                let index = loveKeys.indexOf(key);
                if (isAdd) {//如果是添加且key不在存在则添加到数组中
                    if (index === -1) loveKeys.push(key);
                } else {//如果是删除且key存在则将其从数值中移除
                    if (index !== -1) loveKeys.splice(index, 1);
                }
                AsyncStorage.setItem(this.loveKey, JSON.stringify(loveKeys));//将更新后的key集合保存到本地
            }
        })
    }


    /**
     * 取消收藏
     * @param {*} key  电影id
     * @memberof LoveDao
     */
    moveLoveItem(key){
        AsyncStorage.removeItem(key, (error, result)=>{
            if(!error){
                // 从集合中删除
                this.updateLoveKeys(key, false);
            }
        })
    }


    /**
     * 获取所有key值
     * @memberof LoveDao
     */
    getLoveKeys(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.loveKey, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                } else {
                    reject(error);
                    console.log('获取失败！')
                }
            });
        });
    }



    /**
     * 判断当前电影是否存在于收藏列表中
     * @param {*} key   电影id
     * @memberof LoveDao
     */
    isLoveKeys(key){
        return new Promise((resolve, reject) => {
            this.getLoveKeys().then((keys)=>{
                let index = keys.indexOf(key);
                if (index !== -1){
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
            .catch((e) => {
                reject(e);
            })
        })
    }
    /**
     * 获取所有收藏的项目
     * @return {Promise}
     */
    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getLoveKeys().then((keys) => {
                let items = [];
                if (keys) {
                    // 获取 keys 所包含的所有字段的值，其回调函数会传入一个 key-value 数组形式的数组：multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
                    AsyncStorage.multiGet(keys, (err, stores) => {
                        try {
                            stores.map((result, i, store) => {
                                // get at each store's key/value so you can work with it
                                let key = store[i][0];
                                let value = store[i][1];
                                if (value) items.push(JSON.parse(value));
                            });
                            resolve(items);
                        } catch (e) {
                            reject(e);
                        }
                    });
                } else {
                    resolve(items);
                }
            }).catch((e) => {
                reject(e);
            })
        })
    }


}

