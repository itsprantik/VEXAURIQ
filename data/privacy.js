'use strict';

// Privacy policy text. Edit the date and wording here; the page layout is in views/privacy.ejs.
// {name} and {email} are replaced automatically from data/site.js.
module.exports = {
  updated: '1 November 2026',
  intro: 'This Privacy Policy explains what information {name} ("we", "us", "our") collects when you visit this website, how we use it, and the choices you have. We keep it short because we collect very little.',
  sections: [
    {
      title: 'Who we are',
      body: ['{name} is a parent company that owns and operates independent brands and ventures. This website is the home of the group and links out to our companies.'],
    },
    {
      title: 'Information we collect',
      body: ['We keep data collection to a minimum. The information we may receive falls into two groups.'],
      list: [
        'Information you send us. If you email us or contact us by another channel, we receive your name, email address and whatever you choose to write. This website has no sign-up, login or payment features.',
        'Technical information. Like most websites, our server and hosting provider may automatically record your IP address, browser and device type, the pages requested and the time of the visit. This is used to keep the site running and secure.',
      ],
    },
    {
      title: 'How we use information',
      body: ['We use information only for the purposes below. We do not sell your personal information.'],
      list: [
        'To reply to your messages and enquiries.',
        'To operate, maintain and secure the website.',
        'To understand in general terms whether the site is working properly.',
        'To meet legal obligations, where required.',
      ],
    },
    {
      title: 'Cookies and tracking',
      body: ['At the time of writing this website does not set advertising or analytics cookies and does not use tracking pixels. Our fonts and images are served from our own server. The cookie notice on this site stores your accept or decline choice in your browser so we do not ask you again; you can clear it any time in your browser settings. If this changes, for example if we add analytics, we will update this policy and only use optional cookies if you accept.'],
    },
    {
      title: 'Links to other websites',
      body: ['This site links to websites run by our companies and by third parties, including Prism Frames. Those websites are separate, have their own privacy practices, and are not covered by this policy. Please read the policy of any site you visit.'],
    },
    {
      title: 'Sharing your information',
      body: ['We share information only when needed: with service providers that help us run the site (such as our hosting provider and email service) who may process it on our behalf, with the relevant {name} company if your message concerns it, or when the law requires it. We do not share your information for advertising.'],
    },
    {
      title: 'How long we keep it',
      body: ['We keep messages for as long as needed to deal with your enquiry and for a reasonable period afterwards. Server logs are kept for a short period and then deleted or anonymised, unless needed to investigate a security issue.'],
    },
    {
      title: 'Security',
      body: ['We take reasonable technical and organisational steps to protect information, including secure headers on this site. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.'],
    },
    {
      title: 'Your rights',
      body: ['Depending on where you live, you may have the right to access the personal information we hold about you, ask us to correct or delete it, object to or restrict how we use it, and withdraw consent you gave earlier. To make a request, email us at {email}. We may need to verify your identity first.'],
    },
    {
      title: 'Children',
      body: ['This website is not directed at children, and we do not knowingly collect personal information from them. If you believe a child has sent us information, contact us and we will delete it.'],
    },
    {
      title: 'Changes to this policy',
      body: ['We may update this policy from time to time. The "Last updated" date at the top shows when it last changed. Continued use of the site after an update means you accept the revised policy.'],
    },
    {
      title: 'Contact us',
      body: ['Questions about this policy or your information? Email {email}.'],
    },
  ],
};