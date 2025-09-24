const Revenue = require("../models/revenue");

// Lấy tất cả revenues
exports.getAllrevenues = (req, res) => {
  Revenue.getAll((err, revenues) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Lỗi server", message: err.message });
    }
    res.json({ success: true, data: revenues, count: revenues.length });
  });
};

// Lấy revenue theo ID
exports.getrevenueById = (req, res) => {
  const { id } = req.params;
  Revenue.getById(id, (err, row) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Lỗi server", message: err.message });
    if (!row) return res.status(404).json({ error: "Không tìm thấy revenue" });
    res.json({ success: true, data: row });
  });
};

// Tạo revenue mới
exports.createrevenue = (req, res) => {
  const { idchannel, network, date, views, watch, duration, revenue } =
    req.body;

  if (!idchannel || !network) {
    return res.status(400).json({
      error: "Thiếu thông tin bắt buộc",
      required: ["idchannel", "network"],
    });
  }

  Revenue.create(
    { idchannel, network, date, views, watch, duration, revenue },
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Lỗi server", message: err.message });
      res.status(201).json({
        success: true,
        message: "Tạo revenue thành công",
        data: { id: result.id },
      });
    }
  );
};

// Cập nhật revenue
exports.updaterevenue = (req, res) => {
  const { id } = req.params;
  const { idchannel, network, date, views, watch, duration, revenue } =
    req.body;

  if (!idchannel || !network) {
    return res.status(400).json({
      error: "Thiếu thông tin bắt buộc",
      required: ["idchannel", "network"],
    });
  }

  Revenue.update(
    id,
    { idchannel, network, date, views, watch, duration, revenue },
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Lỗi server", message: err.message });
      if (result.changes === 0)
        return res
          .status(404)
          .json({ error: "Không tìm thấy revenue để cập nhật" });
      res.json({ success: true, message: "Cập nhật revenue thành công" });
    }
  );
};

// Xóa revenue
exports.deleterevenue = (req, res) => {
  const { id } = req.params;
  Revenue.delete(id, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Lỗi server", message: err.message });
    if (result.changes === 0)
      return res.status(404).json({ error: "Không tìm thấy revenue để xóa" });
    res.json({ success: true, message: "Xóa revenue thành công" });
  });
};
