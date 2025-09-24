const Channel = require("../models/channel");

// Lấy tất cả channels
exports.getAllchannels = (req, res) => {
  Channel.getAll((err, channels) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Lỗi server", message: err.message });
    res.json({ success: true, data: channels, count: channels.length });
  });
};

// Lấy channel theo ID
exports.getchannelById = (req, res) => {
  const { id } = req.params;
  Channel.getById(id, (err, row) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Lỗi server", message: err.message });
    if (!row) return res.status(404).json({ error: "Không tìm thấy channel" });
    res.json({ success: true, data: row });
  });
};

// Tạo channel mới
exports.createchannel = (req, res) => {
  const { name, avatar, subs, views } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Thiếu thông tin bắt buộc",
      required: ["name"],
    });
  }

  Channel.create({ name, avatar, subs, views }, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Lỗi server", message: err.message });
    res.status(201).json({
      success: true,
      message: "Tạo channel thành công",
      data: { id: result.id },
    });
  });
};

// Cập nhật channel
exports.updatechannel = (req, res) => {
  const { id } = req.params;
  const { name, avatar, subs, views } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Thiếu thông tin bắt buộc",
      required: ["name"],
    });
  }

  Channel.update(id, { name, avatar, subs, views }, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Lỗi server", message: err.message });
    if (result.changes === 0)
      return res
        .status(404)
        .json({ error: "Không tìm thấy channel để cập nhật" });
    res.json({ success: true, message: "Cập nhật channel thành công" });
  });
};

// Xóa channel
exports.deletechannel = (req, res) => {
  const { id } = req.params;
  Channel.delete(id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Lỗi server", message: err.message });
    if (result.changes === 0)
      return res.status(404).json({ error: "Không tìm thấy channel để xóa" });
    res.json({ success: true, message: "Xóa channel thành công" });
  });
};
