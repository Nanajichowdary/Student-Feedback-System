const axios = require('axios');  // For making HTTP requests
const Feedback = require('../models/Feedback');  // Assuming you're using a Mongoose model

// Submit feedback and get the summarized rating from ML model
exports.submitFeedback = async (req, res) => {
    const { teacher, student, rating, comments } = req.body;

    // Store feedback in the database
    try {
        const newFeedback = new Feedback({
            teacher,
            student,
            rating,
            comments,
        });
        await newFeedback.save();

        // Send feedback data to the Python API for summarization
        try {
            const response = await axios.post('http://localhost:5000/summarize', {
                rating,
                comments,
            });

            const summarizedRating = response.data.summarizedRating;

            // Optionally, update the feedback with the summarized rating
            newFeedback.summarizedRating = summarizedRating;
            await newFeedback.save();

            res.json({
                message: 'Feedback submitted and rating summarized successfully',
                summarizedRating,
            });
        } catch (err) {
            console.error('Error in calling ML model:', err);
            res.status(500).json({ message: 'Error in processing feedback with ML model' });
        }
    } catch (err) {
        console.error('Error in saving feedback:', err);
        res.status(500).json({ message: 'Error in saving feedback' });
    }
};
