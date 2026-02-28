const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (email, displayName) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set, skipping welcome email for', email);
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0f19; color: #e2e8f0; padding: 40px; border-radius: 12px; border: 1px solid #1e293b;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #fff; font-size: 32px; letter-spacing: 2px; margin: 0;">⬡ AGOS</h1>
        <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Autonomous Gaming Operating System</p>
      </div>
      
      <p style="font-size: 18px; line-height: 1.6;">Hello <strong>${displayName}</strong>, 👾</p>
      
      <p style="font-size: 16px; line-height: 1.6;">
        Welcome to the next generation of gaming. Your AGOS account has been successfully created and your player profile is now active on our servers.
      </p>
      
      <div style="background-color: #0f172a; border-left: 4px solid #06b6d4; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
        <h3 style="color: #06b6d4; margin-top: 0;">Getting Started:</h3>
        <ul style="padding-left: 20px; margin-bottom: 0;">
          <li style="margin-bottom: 10px;">Explore the <strong>Multiverse Map</strong> to find games tailored to your skills.</li>
          <li style="margin-bottom: 10px;">Complete <strong>Daily Quests</strong> to earn XP and Coins.</li>
          <li style="margin-bottom: 10px;">Visit the <strong>Marketplace</strong> to spend your earnings on rare cosmetics.</li>
          <li>Climb the <strong>Leaderboard</strong> to prove your dominance.</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://agos-start-up-zcd0.vercel.app/" style="background-color: #8b5cf6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Enter the Dashboard</a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; border-top: 1px solid #1e293b; padding-top: 20px; text-align: center;">
        If you have any questions, jump into the Global Chat in the platform. See you on the grid!
      </p>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: 'AGOS System <onboarding@resend.dev>', // resend.dev allows testing without domain verification
      to: email,
      subject: 'Welcome to AGOS 👾',
      html: html
    });
    console.log('Welcome email sent to', email, data);
    return data;
  } catch (err) {
    console.error('Failed to send welcome email:', err);
  }
};

module.exports = { sendWelcomeEmail };
