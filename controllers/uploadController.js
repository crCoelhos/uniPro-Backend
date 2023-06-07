const upload = require('../services/multer');
const db = require('../models');
const Event = db.Event;
const User = db.User;
async function uploadUserPhoto(req, res) {
  try {
    const user = await User.findByPk(req.user.token.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    upload.single('user')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

  
      if (req.file.mimetype === 'application/pdf') {
        user.document = req.file.filename;
        user.save();
        return res.status(200).json({ message: 'Foto do documento atualizada' });
      } else {
        user.photo = req.file.filename;
        user.save();
        return res.status(200).json({ message: 'Foto do perfil atualizada' });
      }

    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function uploadEventPhoto(req, res) {
  try {

    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    upload.single('event')(req, res, (err) => {

      if (err) {
        return res.status(400).json({ message: err.message });
      }
      event.bannerEvent = req.file.filename;
      event.save();

      return res.status(200).json({ message: 'Foto de evento atualizada' });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  uploadUserPhoto,
  uploadEventPhoto
}

