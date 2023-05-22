export const signupEmailTemplate = (url: string) => `
<body style="background: #161c25;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="max-width: 600px; margin: auto;">
    <tr>
      <td align="center" style="padding: 0px 100px;">
        <img src="https://fete.gg/wp-content/uploads/2022/10/fete3.png" width="100%" height="auto" style="display: block;" alt="Fete 3 Logo" />
      </td>
    </tr>
    <tr>
      <td align="center" style="border-radius: 8px; padding: 24px 16px; text-align: center;" bgcolor="#293240">
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px;">You can now organise your accommodation for Fete 3. Create or join a group, and set your preferences by clicking the button below and signing in with your email.</p>
        <a
          href="https://room.fete.gg"
          target="_blank"
          style="background: #F5BC92; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #321805; text-decoration: none; border-radius: 4px; padding: 10px 20px; display: inline-block; font-weight: bold;">
          Check it out
        </a>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: #fff;">
        If you were not expecting this email, you can safely ignore it. <a href="https://fete.gg/terms/" style="color: #fff">Terms and Conditions</a>.
      </td>
    </tr>
  </table>
</body>
`