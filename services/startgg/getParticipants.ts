const query = `
  query ParticipantsEmails($tourneySlug: String!, $page: Int!, $perPage: Int!) {
    tournament(slug: $tourneySlug) {
      id
      name
      participants(query: {
        page: $page
        perPage: $perPage
      }) {
        pageInfo {
          total
        }
        nodes {
          id
          email
          player {
            gamerTag
          }
          user {
            id
            images {
              id
              url
            }
          }
        }
      }
    }
  }
`;

export const getParticipants = (tourneySlug:string, page: number, perPage: number) => {
  return fetch(process.env.START_GG_API!!,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.START_GG_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          tourneySlug,
          page,
          perPage
        },
      }),
    }
  ).then((res) => res.json())
}
