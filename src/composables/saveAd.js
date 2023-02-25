import axios from "./axios";
import createStore from '../store/index'


const url = '/listings/save-ad';

async function saveAd(id) {
    let data = {
        id: id
    }
    const save = await axios.post(url, data)
    if(createStore.state.user.savedAds.includes(id)) {
        createStore.commit('deleteSavedAd', id)
    } else createStore.commit('addSavedAd', id)
    
}

export default saveAd