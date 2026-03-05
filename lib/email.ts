import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_fallback");

export async function sendPasswordResetEmail(email: string, resetLink: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: "RoadReady <noreply@roadready.rw>", // Update this when you have a verified domain on Resend
            to: email,
            subject: "Reset your RoadReady password",
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5d6eff;">Password Reset Request</h2>
          <p>We received a request to reset the password for your RoadReady account.</p>
          <p>Click the button below to set a new password. This link will expire in 1 hour.</p>
          <div style="margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #5d6eff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
          </div>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #888; font-size: 12px;">RoadReady &copy; ${new Date().getFullYear()}</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return false;
        }
        return true;
    } catch (err) {
        console.error("Error sending email:", err);
        return false;
    }
}
