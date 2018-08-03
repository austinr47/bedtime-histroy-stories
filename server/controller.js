module.exports = {
  getEpisodes: (req, res) => {
    const db = req.app.get('db');
    db.get_episodes()
      .then( (response) => res.status(200).send(response) )
        .catch( (err) => res.status(500).send(err) );
  },

  getOneEpisode: (req, res) => {
    const db = req.app.get('db')
    db.get_one_episode([ req.params.id ])
      .then( (response) => res.status(200).send(response) )
        .catch( (err) => res.status(500).send(err) );
  },

  editEpisode: (req, res) => {
    const db = req.app.get('db')
    const { title, date, description, story, audio, video, id } = req.body;

    db.edit_episode([ date, title, description, story, audio, video, id ])
      .then( (response) => res.status(200).send(response) )
        .catch( (err) => res.status(500).send(err) );
  },

  addEpisodes: (req, res) => {
    const db = req.app.get('db');
    const { title, date, description, story, audio, video } = req.body;

    db.create_episode([ date, title, description, story, audio, video ])
      .then( (response) => res.status(200).send(response) )
        .catch( (err) => res.status(500).send(err) );
  },

  deleteEpisode: (req, res) => {
    const db = req.app.get('db');

    db.delete_episode(req.params.id)
      .then( (response) => res.status(200).send(response) )
        .catch( (err) => res.status(500).send(err) );
  },

  getFeatured: (req, res) => {
    const db = req.app.get('db');

    db.get_featured()
      .then( (response) => res.status(200).send(response) )
        .catch( (err) => res.status(500).send(err) );
  },

  setFeatured: (req, res) => {
    const db = req.app.get('db');

    db.set_featured(req.body.id)
      .then( (response) => res.status(200).send(response) )
        .catch( (err) => res.status(500).send(err) );
  },

  signout: ( req, res, next ) => {
    const { session } = req;
    session.destroy();
    res.status(200).send( req.session );
  }
}