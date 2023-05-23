const db = require("../models/index.js");

const Biodata = db.biodata;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }
  if (!req.body.tempat_lahir) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }
  if (!req.body.tanggal_lahir) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }
  if (!req.body.alamat) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }

  const biodata = {
    nama: req.body.nama,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
  };
  Biodata.create(biodata)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: "Failed",
        message: "Error occurred while inserting biodata",
      });
    });
};

exports.findAll = (req, res) => {
  Biodata.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: "Failed",
        message: err.message || "Error while retrieving biodata",
      });
    });
};

exports.findOne = (req, res) => {
  Biodata.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: "Failed",
        message: err.message || "Error while finding biodata ",
      });
    });
};

// exports.update = (req, res) => {
//   if (!req.body.nama) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//     return;
//   }
//   if (!req.body.tempat_lahir) {
//     res.status(400).send({
//       message: "author can not be empty! ",
//     });
//     return;
//   }
//   if (!req.body.tanggal_lahir) {
//     res.status(400).send({
//       message: " release_date can not be empty!",
//     });
//     return;
//   }
//   if (!req.body.alamat) {
//     res.status(400).send({
//       message: " subject can not be empty!",
//     });
//     return;
//   }
//   Biodata.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((data) => {
//       data.nama = req.body.nama;
//       data.tempat_lahir = req.body.tempat_lahir;
//       data.tanggal_lahir = req.body.release_date;
//       data.alamat = req.body.alamat;
//       data.save();

//       res.send({
//         status: "Success",
//         message: "Biodata is successfully update",
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         status: "Failed",
//         message: "Error updating biodata with id=" + id,
//       });
//     });
// };
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }
  if (!req.body.tempat_lahir) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }
  if (!req.body.tanggal_lahir) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }
  if (!req.body.alamat) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
    return;
  }

  Biodata.findByPk(id)
    .then((biodata) => {
      if (biodata) {
        biodata
          .update({
            nama: req.body.nama,
            tempat_lahir: req.body.tempat_lahir,
            tanggal_lahir: req.body.tanggal_lahir,
            alamat: req.body.alamat,
          })
          .then(() => {
            res.send({
              status: "Success",
              message: "Biodata has been updated successfully.",
            });
          })
          .catch((err) => {
            res.status(500).send({
              status: "Failed",
              message: "Error updating biodata with id=" + id,
            });
          });
      } else {
        res.status(404).send({
          status: "Failed",
          message: `Cannot update biodata with id=${id}. Biodata not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "Failed",
        message: "Error retrieving biodata with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Biodata.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status: "Success",
          message: "Biodata was deleted successfully.",
        });
      } else {
        res.status(404).send({
          status: "Failed",
          message: `Cannot delete Biodata with id=${id}. Biodata not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "Failed",
        message: "Could not delete  biodata with id = " + req.params.id + "!",
      });
    });
};
