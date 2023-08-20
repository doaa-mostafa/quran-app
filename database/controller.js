/** Controller */
import History  from '../model/History'

// get : http://localhost:3000/api/historys
export async function getHistorys (req, res){
    try {
        const historys = await History.find({})

        if(!historys) return res.status(404).json( { error: "Data not Found"})
        res.status(200).json(historys)
    } catch (error) {
        res.status(404).json( { error : "Error While Fetching Data"})
    }
}

// get : http://localhost:3000/api/historys/1
export async function getHistory (req, res){
    try {
        const { surahId } = req.query;

        if(surahId){
            const history = await History.findById(surahId);
            res.status(200).json(history)
        }
        res.status(404).json({ error : "History not Selected...!"});
    } catch (error) {
        res.status(404).json({ error: "Cannot get the History...!"})
    }
}

// post : http://localhost:3000/api/historys
export async function postHistory(req, res) {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(404).json({ error: "Form Data Not Provided...!" });
        }

        // Validate the formData before creating the history record
        const { Surah_name } = formData;
        if (!Surah_name) {
            return res.status(400).json({ error: "Required field 'Surah_name' is missing." });
        }

        const data = await History.create(formData);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({ error });
    }
}




// put : http://localhost:3000/api/historys/1
export async function putHistory (req, res){
    try {
        const { surahId } = req.query;
        const formData = req.body;

        if(surahId && formData){
            const history = await History.findByIdAndUpdate(surahId, formData);
            res.status(200).json(history)
        }
        res.status(404).json( { error: "History Not Selected...!"})
    } catch (error) {
        res.status(404).json({ error: "Error While Updating the Data...!"})
    }
}

// delete : http://localhost:3000/api/historys/1
export async function deleteHistory(req, res){
    try {
        const {surahId } = req.query;

        if(surahId){
            const history = await History.findByIdAndDelete(surahId)
            return res.status(200).json(history)
        }

        res.status(404).json({ error: "History Not Selected...!"})

    } catch (error) {
        res.status(404).json({ error: "Error While Deleting the History...!"})
    }
}