export default {
  async afterCreate(event) {
    const { result } = event;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'harshikrawal7@gmail.com',
        from: 'no-reply@monkda.com', // Change this to your verified sender
        subject: `New Lead: ${result.fullName}`,
        text: `You have a new lead submission!\n\nName: ${result.fullName}\nEmail: ${result.email}\nDetails: ${result.message}\n\nSent from MonkDA Foundation CMS`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #d4af6e;">New Lead Received</h2>
            <p><strong>Name:</strong> ${result.fullName}</p>
            <p><strong>Email:</strong> ${result.email}</p>
            <p><strong>Details:</strong><br/>${result.message.replace(/\n/g, '<br/>')}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">Sent from MonkDA Foundation CMS</p>
          </div>
        `,
      });
      console.log('Email notification sent for lead:', result.id);
    } catch (err) {
      console.error('Failed to send lead email notification:', err);
    }
  },
};
