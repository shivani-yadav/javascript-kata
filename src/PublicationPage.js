import React from 'react';
import PublicationRow from './components/PublicationRow';
import SearchBar from './components/SearchBar';

function PublicationPage(){
  return(
    <div>
      <SearchBar />
      <table>
        <tr>
          <th>Title</th>
          <th>Isbn</th>
          <th>Author Name</th>
          <th>Author Email</th>
        </tr>
      </table>
      {
        [1, 2, 3].map(publication => <PublicationRow key={publication} publication={publication} />)
      }
    </div>
  )
}
export default PublicationPage;
