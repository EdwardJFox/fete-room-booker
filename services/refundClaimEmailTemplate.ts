export const refundClaimEmailTemplate = () => `
<body style="background: #161c25;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="max-width: 600px; margin: auto;">
    <tr>
      <td align="center" style="padding: 0px 100px;">
        <img src="https://fete.gg/wp-content/uploads/2022/10/fete3.png" width="100%" height="auto" style="display: block;" alt="Fete 3 Logo" />
      </td>
    </tr>
    <tr>
      <td align="center" style="border-radius: 8px; padding: 24px 16px;" bgcolor="#293240">
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">For those of you on the London 19:30 coach that broke down on the way, you are eligible for a refund for your onward travel cost contribution.</p>
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">Please send an email to the following address:</p>

        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;"><b>office@goldhilltravel.co.uk</b></p>

        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">And include the following information:</p>

        <ul>
          <li style="color: white;">
            <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">Full name(s) of traveller(s) (all names if sharing cab).</p>
          </li>
          <li style="color: white;">
            <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">Total amount of claim WITH valid receipt(s) attachments for either train or uber fare.</p>
          </li>
          <li style="color: white;">
            <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">Name on bank account for recipient who paid for the travel and Sort Code & Account number.</p>
          </li>
        </ul>

        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">Each traveller claim will be paid for the receipt amount <b>ONLY</b> and <b>UP TO</b> a value of £45.30 (max single train ticket value) <b>PER PERSON</b> as agreed by Clive, the driver at time of breakdown.</p>
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">All claims <b>must</b> be submitted by <b>July 31st</b> & will be refunded 1st August.</p>
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">If you have any issues or questions, please message a member of the team on Discord. Thank you!</p>
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