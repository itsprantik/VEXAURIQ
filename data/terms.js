'use strict';

// Terms & Conditions text. Edit the date and wording here; layout is in views/terms.ejs.
// {name} and {email} are replaced automatically from data/site.js.
module.exports = {
  updated: '1 November 2026',
  intro: 'These Terms and Conditions ("Terms") govern your use of the {name} website. By accessing or using this website you agree to them. If you do not agree, please do not use the site.',
  sections: [
    {
      title: 'About this website',
      body: ['This website is operated by {name}, a parent company that owns independent brands and ventures. It provides information about the group and links to our companies. It does not sell products or take payments directly.'],
    },
    {
      title: 'Use of the website',
      body: ['You may use this website for lawful purposes only. You agree not to:'],
      list: [
        'Use the site in any way that breaks a law or regulation.',
        'Try to gain unauthorised access to the site, its servers or any connected systems.',
        'Introduce viruses or other harmful code, or disrupt the site or its performance.',
        'Copy or scrape the site at a scale that harms its operation.',
        'Misrepresent your identity or your connection with {name}.',
      ],
    },
    {
      title: 'Intellectual property',
      body: ['Unless stated otherwise, the content of this website, including the {name} name, logo, branding, text, graphics, imagery and design, belongs to {name} or its licensors and is protected by intellectual property laws. You may view the site and share its pages for personal, non-commercial use. You may not reproduce, modify, distribute or use our content or branding for commercial purposes without our written permission.', 'Names and logos of our companies, including Prism Frames, belong to their respective owners.'],
    },
    {
      title: 'Our companies and third-party links',
      body: ['This site links to websites run by our companies and by third parties. Each of those sites has its own terms and privacy practices, which apply when you use them. We do not control third-party websites and are not responsible for their content or conduct. A link is not an endorsement. Any purchase or agreement you make with one of our companies is governed by that company\'s own terms.'],
    },
    {
      title: 'No professional advice',
      body: ['Information on this website is provided for general purposes. It is not legal, financial, investment or other professional advice, and nothing here is an offer to enter into a business or investment arrangement. Contacting us does not create a business relationship.'],
    },
    {
      title: 'Availability and accuracy',
      body: ['We try to keep the site accurate and available, but we do not guarantee that it will be uninterrupted, error-free or always up to date. We may change, suspend or remove any part of the site at any time without notice.'],
    },
    {
      title: 'Disclaimer of warranties',
      body: ['The website and its content are provided "as is" and "as available", without warranties of any kind, express or implied, to the fullest extent permitted by law.'],
    },
    {
      title: 'Limitation of liability',
      body: ['To the fullest extent permitted by law, {name} will not be liable for any indirect, incidental, special or consequential loss, or for any loss of profits, data or goodwill, arising from your use of, or inability to use, this website or from your reliance on its content. Nothing in these Terms limits liability that cannot be limited by law.'],
    },
    {
      title: 'Privacy',
      body: ['How we handle personal information is explained in our Privacy Policy, which forms part of these Terms.'],
    },
    {
      title: 'Changes to these Terms',
      body: ['We may update these Terms from time to time. The "Last updated" date at the top shows when they last changed. By continuing to use the site after an update you accept the revised Terms.'],
    },
    {
      title: 'Governing law',
      body: ['These Terms are governed by the laws of [your country or state], and any dispute will be subject to the courts of [your city/jurisdiction], unless the law in your place of residence requires otherwise.'],
    },
    {
      title: 'Contact us',
      body: ['Questions about these Terms? Email {email}.'],
    },
  ],
};