export const getChords = async ({ rootNote, scale, use7thChords }) => {
  const url = `http://localhost:9000/api/${encodeURIComponent(rootNote.toLowerCase())}/${scale.replace(/ /g, '-').toLowerCase()}${use7thChords ? '?use7thChords='+use7thChords : ''}`

  return await fetch(url, {method: 'GET'})
    .then(response => {
      if (!response.ok) throw Error('oops');

      return response.json();
    })
    .catch(e => console.error(e));
}
