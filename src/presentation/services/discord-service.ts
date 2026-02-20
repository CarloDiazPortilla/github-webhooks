export class DiscordService {
  constructor(
    private readonly discordWebHookUrl: string
  ) { }

  public async notify(message: string) {
    const body = {
      content: message,
      // embeds: [
      //   {
      //     image: { url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXVkaGI0aGF5Zno1cHgwNDN3b2ZiMHh2cGs0bTVxcHEzd2xjOHliMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7mkFSIIUGl3PYYo4pN/giphy.gif" }
      //   }
      // ]
    }

    const resp = await fetch(this.discordWebHookUrl, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(body)
    })

    if (!resp.ok) {
      console.log("Error sending message to discord")
      return false;
    }

    return true;

  }
}