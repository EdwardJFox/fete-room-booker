const exampleResponse = {
  data: {
    tournament: {
      id: 123456,
      name: "Fete 3 Test",
      participants: {
        pageInfo: {
          total: 20
        },
        nodes: [
          {
            id: 654321,
            email: "edwardjfox@outlook.com",
            player: {
              gamerTag: "icemaz"
            },
            user: {
              id: 86591,
              images: [
                {
                  id: "4735110",
                  url: "https://images.start.gg/images/user/86591/image-cc08a4ccf94b7329be03f08030456a05.png?ehk=p%2FWIgp3wApZ0NR%2BIBNJcQsxVTjaww43c8gah0ywut5A%3D&ehkOptimized=nIG04tfjlte5NnGhCeWDwQl1NQG158yPid6zRMioC1A%3D"
                }
              ]
            }
          },
        ]
      }
    }
  },
  extensions: {
    cacheControl: {
      version: 1,
      hints: [
        {
          path: [
            "tournament"
          ],
          maxAge: 300,
          scope: "PRIVATE"
        }
      ]
    },
    queryComplexity: 61
  },
  actionRecords: []
}

export const getParticipants = (tourneySlug:string, page: number, perPage: number) => {
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

  return exampleResponse;

  return fetch(process.env.START_GG_API,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.START_GG_SECRET}`
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
