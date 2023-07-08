import { utcToZonedTime, format } from 'date-fns-tz';

const timeZone = 'Europe/London';

export const updateEmailTemplate = (user: any) => `
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
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">Fête is next weekend so we thought we'd give you an update with some handy info you need to know.</p>
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">First up is a link straight to the Start.gg page, where you will always find your most up to date bracket information if you're logged in.</p>
        <a
          href="https://www.start.gg/tournament/f-te-3-by-the-sea/details"
          target="_blank"
          style="background: #F5BC92; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #321805; text-decoration: none; border-radius: 4px; padding: 10px 20px; display: inline-block; font-weight: bold;">
          Start.gg page
        </a>
        <br />
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 20px; text-align: left;">Next is the Fete 3 event schedule. We have a lot going on, so make sure you note down the times of the things you've entered or want to participate in!</p>
        <img src="https://images.start.gg/images/profileWidgetPageLayout/1948410/image-5b92fbb6eedb00e3faacaa1eed7ce843-optimized.png?ehk=WdiXW%2FfR0p%2BLYDHc6hFjKGUxTckrJAJOHrNdvJHPXpI%3D&ehkOptimized=it0%2BBVRO3cRIO%2FfFlD3JWiHlsQ7WZFiIwsDxTVEeZbw%3D" style="width: 100%;" />

        <br />
        <h2 style="font-size: 28px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 20px; margin-bottom: 10px;">Location and check-in</h2>
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 20px; text-align: left;">The event is at Pontins Camber Sands Holiday Park, New Lydd Rd, Camber, Rye, TN31 7RL.</p>
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 20px; text-align: left;">If you have early check-in, you can arrive from 2pm on Thursday 13th of July. For everyone else you can check in from 10am on Friday 14th.</p>
      </td>
    </tr>
    <tr>
      <td align="center" style="border-radius: 8px; padding: 24px 16px;" bgcolor="#293240">
        <h2 style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; margin-bottom: 10px;">Room group</h2>
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">You have been assigned an apartment and we have met everyone's preferences. If you were not part of a rooming group, you have been assigned your own apartment.</p>
      </td>
    </tr>
    ${
      user.travel ? `
      <tr>
        <td align="center" style="border-radius: 8px; padding: 24px 16px;" bgcolor="#293240">
          <h2 style="font-size: 32px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; margin-bottom: 10px;">Travel</h2>
          <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">You have booked a place on a coach getting to and from Fete 3. Here's the important information for getting that coach:</p>
          <b style="font-size: 24px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px;">Departure</b>
          <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">
            <strong>${user.travel.from.name}</strong> on ${format(utcToZonedTime(user.travel.departTime, timeZone), "eeee LLLL do 'at' HH:mm", { timeZone })}
            <br />
            ${user.travel.from.address}
          </p>

          <b style="font-size: 24px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px;">Return</b>
          <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">
            <strong>${user.travel.to.name}</strong> on ${format(utcToZonedTime(user.travel.returnTime, timeZone), "eeee LLLL do 'at' HH:mm", { timeZone })}
            <br />
            ${user.travel.to.address}
          </p>
        </td>
      </tr>
      ` : ''
    }
    <tr>
      <td align="center" style="border-radius: 8px; padding: 24px 16px;" bgcolor="#293240">
        <p style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #fff; line-height: 160%; margin-top: 0px; text-align: left;">That's it for now. We're looking forward to seeing you at Fete 3, and getting some games in. If you have any questions, you can join the Fete discord and ask us directly.</p>
        <a
          href="https://discord.com/invite/SgqJeDDT5F"
          target="_blank"
          style="background: #F5BC92; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #321805; text-decoration: none; border-radius: 4px; padding: 10px 20px; display: inline-block; font-weight: bold;">
          Join the discord
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