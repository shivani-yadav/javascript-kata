class PublicationsDataService {
  parse(authorsCSV, booksCSV, magazinesCSV) {
    const authorsObj = this.parseAuthors(authorsCSV)
    const books = this.parseBooks(booksCSV, authorsObj)
    const magazines = this.parseMagazines(magazinesCSV, authorsObj)
    const publications = [...books, ...magazines].sort((a, b) => b.title > a.title)
    return publications
  }

  parseAuthors(authorsCSV) {
    const authors = {}
    const authorRows = authorsCSV.split('\n')
    authorRows.splice(0, 1)
    authorRows.splice(authorRows.length - 1, 1)
    authorRows.forEach(row => {
      const [email, firstName, lastName] =  row.split(';')
      authors[email] = {
        email,
        firstName,
        lastName
      }
    });
    return authors
  }

  parseBooks(booksCSV, authorsObj) {
    const booksRows = booksCSV.split('\n')
    booksRows.splice(0, 1)
    booksRows.splice(booksRows.length - 1, 1)
    return booksRows.map(row => {
      const [title, isbn, authorEmails, description] =  row.split(';')
      const authors = authorEmails.split(',').map(authorEmail => authorsObj[authorEmail])
      return {
        title,
        isbn,
        authors,
        description,
        publishedAt: ''
      }
    });
  }

  parseMagazines(magazinesCSV, authorsObj) {
    const magazinesRows = magazinesCSV.split('\n')
    magazinesRows.splice(0, 1)
    magazinesRows.splice(magazinesRows.length - 1, 1)
    return magazinesRows.map(row => {
      const [title, isbn, authorEmails, publishedAt] =  row.split(';')
      const authors = authorEmails.split(',').map(authorEmail => authorsObj[authorEmail])
      return {
        title,
        isbn,
        authors,
        publishedAt,
        description: ''
      }
    });
  }
}

export default PublicationsDataService;
