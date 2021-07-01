import React from 'react';

function PublicationRow({ publication }){
  return(
    <tr>
      <td>{publication.title}</td>
      <td>{publication.isbn}</td>
      <td>
        {publication.authors.map(author => {
          return `${author.firstName} ${author.lastName} | ${author.email}`;
        })
        }
      </td>
    </tr>
  )
}
export default PublicationRow;
