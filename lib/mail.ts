import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn("RESEND_API_KEY is missing. Emails will not be sent.");
}

const resend = apiKey ? new Resend(apiKey) : null;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  if (!resend) {
    console.error("Resend client is not initialized. Cannot send email.");
    return;
  }

  const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click this link to reset your password: <a href="${resetLink}">here</a> to reset.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  if (!resend) {
    console.error("Resend client is not initialized. Cannot send email.");
    return;
  }

  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email address",
    html: `<p>Click this link to confirm your email address: <a href="${confirmLink}">here</a> to confirm.</p>`,
  });
};
