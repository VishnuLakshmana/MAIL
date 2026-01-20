import mailService from "./mail.service.js";

class MailController {
    async create(req, res) {
        try {
            const mail = await mailService.create(req.body);
            if (!mail) {
                return res.status(400).send({
                    status: false,
                    message: "Mail creation failed",
                    data: null,
                });
            } else {
                return res.status(201).send({
                    status: true,
                    message: "Mail scheduled successfully",
                    data: mail,
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: error.message || "Internal server error",
                data: null,
            });
        }
    }

    async get(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send({
                    status: false,
                    message: "Mail ID is required",
                    data: null,
                });
            }
            const mail = await mailService.getById(id);
            if (!mail) {
                return res.status(404).send({
                    status: false,
                    message: "Mail not found",
                    data: null,
                });
            }
            return res.status(200).send({
                status: true,
                message: "Mail fetched successfully",
                data: mail,
            });
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: error.message || "Internal server error",
                data: null,
            });
        }
    }

    async list(req, res) {
        try {
            const mails = await mailService.list();
            return res.status(200).send({
                status: true,
                message: "Mail list fetched successfully",
                data: mails || [],
            });
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: error.message || "Internal server error",
                data: null,
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).send({
                    status: false,
                    message: "Mail ID is required",
                    data: null,
                });
            }
            const mail = await mailService.update(id, req.body);
            if (!mail) {
                return res.status(400).send({
                    status: false,
                    message: "Mail update failed",
                    data: null,
                });
            }
            return res.status(200).send({
                status: true,
                message: "Mail rescheduled successfully",
                data: mail,
            });
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: error.message || "Internal server error",
                data: null,
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).send({
                    status: false,
                    message: "Mail ID is required",
                    data: null,
                });
            }
            const deleted = await mailService.delete(id);
            if (!deleted) {
                return res.status(404).send({
                    status: false,
                    message: "Mail not found or already deleted",
                    data: null,
                });
            }
            return res.status(200).send({
                status: true,
                message: "Mail cancelled successfully",
                data: null,
            });
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: error.message || "Internal server error",
                data: null,
            });
        }
    }

    async failed(req, res) {
        try {
            const mails = await mailService.listFailed();
            return res.status(200).send({
                status: true,
                message: "Failed / unsent mails fetched successfully",
                data: mails || [],
            });
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: error.message || "Internal server error",
                data: null,
            });
        }
    }
}

export default new MailController();
