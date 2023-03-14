export const buildURL = (url: string, params: Record<string, string>) => {
  const filteredParams = Object.keys(params).reduce((toReturn: Record<string, string>, key) => {
    if (params[key] && params[key] !== "") {
      toReturn[key] = params[key];
    }

    return toReturn;
  }, {})

  const query = new URLSearchParams(filteredParams);
  return `${url}?${query.toString()}`;
}