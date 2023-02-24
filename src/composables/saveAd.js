import axios from "./axios";
import createStore from '../store/index'


const url = '/listings/save-ad';

async function saveAd(id) {
    let data = {
        id: id
    }
    const save = await axios.post(url, data)
    createStore.commit('addSavedAds', id)
}

export default saveAd