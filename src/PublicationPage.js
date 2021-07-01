import React, { useEffect, useState } from 'react';
import PublicationRow from './components/PublicationRow';

import PublicationsDataService from './PublicationsDataService';

let allPublications = []

function PublicationPage() {
  const [publications, setPublications] = useState([]);
  const [searchText, setSearchText] = useState(''); 

  const loadCSV = (response) => {
    let reader = response.body.getReader();
    let decoder = new TextDecoder('utf-8');

    return reader.read().then(function (result) {
      return decoder.decode(result.value);
    });
  }

  const handleInputChange = (evt) => {
    const searchValue = evt.target.value
    setSearchText(searchValue)
    const filteredPublications = allPublications.filter(publication => {
      const authorsMatched = publication.authors.filter(author => author.email.search(searchValue) > -1 ).length > 0;
      const isbnMatched = publication.isbn.search(searchValue) > -1;
      return authorsMatched || isbnMatched
    })
    console.log(filteredPublications);
    setPublications(filteredPublications)
  }

  useEffect(() => {
    Promise.all([
      fetch('authors.csv'),
      fetch('books.csv'),
      fetch('magazines.csv')
    ]).then(async ([authorsResponse, booksResponse, magazinesResponse]) => {
      const authorsCSV = await loadCSV(authorsResponse)
      const booksCSV = await loadCSV(booksResponse)
      const magazinesCSV = await loadCSV(magazinesResponse)
      const publicationsDataService = new PublicationsDataService();
      const data = publicationsDataService.parse(authorsCSV, booksCSV, magazinesCSV);
      allPublications = data
      setPublications(allPublications)
    });
  }, [])

  return(
    <div>
      <input type="text" value={searchText} onChange={handleInputChange} />
      <table>
        <tr>
          <th>Title</th>
          <th>Isbn</th>
          <th>Author Name</th>
          <th>Author Email</th>
        </tr>
      </table>
      {
        publications.map(publication => <PublicationRow key={publication} publication={publication} />)
      }
    </div>
  )
}
export default PublicationPage;
