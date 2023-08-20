
const BASE_URL = "http://localhost:3000/"
// all history
export const getHistorys = async () => {
    const response = await fetch(`${BASE_URL}api/historys`)
    const json = await response.json()

    return json;
}

// single history
export const getHistory = async (surahId) => {
    const response = await fetch(`${BASE_URL}api/historys/${surahId}`);
    const json = await response.json()

    if(json) return json;
    return {}
}

// posting a new history
export async function addHistory(formData){
    try{
        const Options = {
            method : 'POST',
            headers : { 'Content-Type': "application/json"},
            body: JSON.stringify(formData)
        }
        
        const response = await fetch(`${BASE_URL}api/historys`, Options)
        const json = await response.json()

        return json;
    }catch(error){
        return error;
    }
}


// Update a new history
export async function updateHistory(surahId, formData){
    const Options = {
        method : 'PUT',
        headers : { 'Content-Type': "application/json"},
        body: JSON.stringify(formData)
    }

    const response = await fetch(`${BASE_URL}api/historys/${surahId}`, Options)
    const json = await response.json()
    return json;
}


// Delete a new history
export async function deleteHistory(surahId){
    const Options = {
        method : 'DELETE',
        headers : { 'Content-Type': "application/json"},
    }

    const response = await fetch(`${BASE_URL}api/historys/${surahId}`, Options)
    const json = await response.json()
    return json;
}