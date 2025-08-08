import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { title, content} = req.body;
        const newNote = new Note({title, content})
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error adding note'});
    }

})

router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching notes'});
    }
})


router.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({message: 'Note not found'})
        }
        res.json(note);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Error fetching note'});
    }
})

router.put('/notes/:id', async (req, res) => {
    try {
        const {title, content} =req.body;

        await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {new: true}
        );
        res.status(200).json({message: 'Note updated successfully'});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: 'Error updating note'});
    }
})

router.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Note deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error deleting note'})
    }
})



export default router;