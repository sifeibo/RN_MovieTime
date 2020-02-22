// 离线缓存框架
import AsyncStorage from '@react-native-community/async-storage';                         
import axios from 'axios';

export default class DataStore{
    /**
     * 获取数据，优先获取本地数据，如果没有本地数据再进行网络获取
     * @param {*} url 
     */
    fetchData(url){
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData)=>{
                // 如果存在本地数据，并且时间戳正确则返回本地数据
                if(wrapData && DataStore.checkTimestampValid(wrapData.timestamp)){
                    console.log('获取本地保存数据');
                    resolve(wrapData);
                } else{
                    this.fetchNetData(url).then((data) =>{
                        console.log('获取网络数据');
                        resolve(this._wrapData(data));
                    }).catch((error)=>{
                        reject(error);
                    })
                }
            }).catch((error)=>{
                // 在获取本地数据过程中，只要出错就获取网络数据
                this.fetchNetData(url).then((data) =>{
                    console.log('出错，获取网络数据');
                    resolve(this._wrapData(data));
                }).catch((error)=>{
                    reject(error);
                })
            })
        })
    }


    /**
     * 保存数据
     * @param {*} url 
     * @param {*} data 
     * @param {*} callback 
     */
    saveData(url, data, callback){
        if(!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
    }

    /**
     * 获取本地数据
     * @param {*} url 
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) =>{
            AsyncStorage.getItem(url, (error, result) =>{
                if (!error){
                    try{
                        resolve(JSON.parse(result));
                    }catch(e){
                        reject(e);
                        console.error(e);
                    }
                }else{
                    reject(error);
                    console.error(error); 
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param {*} url 
     */
    fetchNetData(url){
        return new Promise((resolve, reject)=>{
            axios.get(url)
                .then((response)=>{
                    // 保存数据并且返回数据
                    this.saveData(url, response);
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                })
        })
    }

    /**
     * 为数据加入时间戳，这里的时间戳最好从服务器获取
     * @param {*} data 
     */
    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    static checkTimestampValid(timestamp){
        const currentDate = new Date();
        const taegetDate = new Date();
        taegetDate.setTime(timestamp);
        if(currentDate.getMonth() !== taegetDate.getMonth()) return false;
        if(currentDate.getDate() !== taegetDate.getDate()) return false;
        if(currentDate.getHours() - taegetDate.getHours() > 6) return false; //大于6小时就刷新
        return true
    }
}