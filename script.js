// Obtain the XML file locally
fetch('book.xml')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch XML: ' + response.status);
    }
    // Convert the response to text format (XML needs to be read as text before parsing)
    return response.text();
  })
  .then(xmlText => {
    // Parse XML text
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Check if the parsing is incorrect
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('XML Parsing Error: ' + parseError.textContent);
    }

    // Obtain all book nodes
    const books = xmlDoc.getElementsByTagName('book');
    const bookBody = document.getElementById('bookBody');

    // Traverse the "book" node and insert table rows
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const id = book.getAttribute('id');
      const title = book.getElementsByTagName('title')[0].textContent;
      const author = book.getElementsByTagName('author')[0].textContent;
      const price = book.getElementsByTagName('price')[0].textContent;

      // Create table rows
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${author}</td>
        <td>$${price}</td>
      `;
      bookBody.appendChild(row);
    }
  })
  .catch(err => {
    // Capture and print errors
    console.error('Error: ' + err.message);
    document.getElementById('bookBody').innerHTML = `<tr><td colspan="4">Failed to load book data: ${err.message}</td></tr>`;
  });