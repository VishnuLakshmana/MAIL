import Mail from "./mail.model.js";
import sendEmail from "./helper.js";

class MailService {
    async create(data) {
        const { scheduledAt } = data;
        const now = new Date();
        if (scheduledAt && new Date(scheduledAt) > now) {
            return Mail.create({
                ...data,
                status: "SCHEDULED",
            });
        }
        try {
            const mail = await Mail.create({
                ...data,
                status: "SENT",
                sentAt: now,
            });
            await sendEmail(mail);
            return mail;
        } catch (error) {
            return Mail.create({
                ...data,
                status: "FAILED",
                failureReason: error.message,
            });
        }
    }

    async getById(id) {
        return Mail.findById(id);
    }

    async list() {
        return Mail.find().sort({ scheduledAt: 1 });
    }

    async update(id, data) {
        return Mail.findByIdAndUpdate(
            id,
            {
                ...data,
                status: "SCHEDULED",
            },
            { new: true }
        );
    }

    async delete(id) {
        return Mail.findByIdAndUpdate(
            id,
            { status: "CANCELLED" },
            { new: true }
        );
    }

    async listFailed() {
        return Mail.find({
            status: { $in: ["FAILED", "SCHEDULED"] },
        });
    }

    async processScheduledEmails() {
        const now = new Date();
        const emails = await Mail.find({
            status: "SCHEDULED",
            scheduledAt: { $lte: now },
        });
        for (const email of emails) {
            try {
                await sendEmail(email);
                await Mail.findByIdAndUpdate(email._id, {
                    status: "SENT",
                    sentAt: new Date(),
                });
            } catch (err) {
                await Mail.findByIdAndUpdate(email._id, {
                    status: "FAILED",
                    failureReason: err.message,
                });
            }
        }
    }

}

export default new MailService();
