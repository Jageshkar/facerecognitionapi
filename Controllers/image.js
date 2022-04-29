const Clarifai = require('clarifai');

const app = new Clarifai.App(
    {
      apiKey: 'b07dd8c919584b3284faf9820054b368'
    }
  );

  const handleApiCall = (req, res) => {
      app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(datas => {
          res.json(datas);
      }).catch(err => res.status(400).json('unable to work with api'))
  }

const handleImage = (req, res, knex) => {
    const {id} = req.body;
    knex('users').where('id', '=', id).increment('entries', 1)
    .returning('entries').then(entries => {
        res.json(entries[0].entries);
    }).catch(err => res.status(400).json('unable to get entries'))

}
module.exports = {
    handleImage,
    handleApiCall
}