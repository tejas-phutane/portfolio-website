module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  console.log(`[Contact Form Submission]
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`);

  // Send email if Resend API key is configured in environment variables
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'tejasphutane.work@gmail.com',
          reply_to: email,
          subject: `Portfolio: ${subject}`,
          html: `<p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Subject:</strong> ${subject}</p>
                 <p><strong>Message:</strong></p>
                 <p>${message.replace(/\n/g, '<br>')}</p>`
        })
      });

      if (response.ok) {
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
      } else {
        const errorData = await response.json();
        console.error('Resend API error response:', errorData);
      }
    } catch (error) {
      console.error('Error sending email via Resend API:', error);
    }
  }

  // Return success even if Resend is not configured so the form validation works out-of-the-box
  return res.status(200).json({
    success: true,
    message: 'Message received! (Configure RESEND_API_KEY in Vercel to receive email forwards)'
  });
};
