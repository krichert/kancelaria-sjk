import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "Brak wymaganych pól." },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailText = [
            `Imię i nazwisko: ${name}`,
            `Email: ${email}`,
            subject ? `Temat: ${subject}` : null,
            "",
            "Wiadomość:",
            message,
        ]
            .filter(Boolean)
            .join("\n");

        await transporter.sendMail({
            from:
                process.env.CONTACT_FROM_EMAIL ||
                `"Formularz kontaktowy" <no-reply@sjkancelaria.pl>`,
            to: "j.szypniewska@sjkancelaria.pl",
            replyTo: email,
            subject: subject || "Nowa wiadomość z formularza kontaktowego",
            text: mailText,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Błąd wysyłki formularza kontaktowego:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.",
            },
            { status: 500 }
        );
    }
}

