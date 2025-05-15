async function loadData() {
    try {
      const [productsRes, sectionsRes] = await Promise.all([
        fetch('products.json'),
        fetch('sections.json')
      ]);

      if (!productsRes.ok || !sectionsRes.ok) throw new Error('Failed to fetch resources');

      const products = await productsRes.json();
      const sections = await sectionsRes.json();

      renderProducts(products);
      renderSections(sections);

    } catch (err) {
      displayError('product-list', 'Failed to load product data. Please try again later.');
      displayError('homepage-sections', 'Failed to load homepage content.');
      console.error(err);
    }
  }

  function renderProducts(products) {
    const container = document.getElementById('product-list');
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.title;

      const title = document.createElement('h3');
      title.textContent = product.title;

      const price = document.createElement('p');
      price.textContent = `Price: $${product.price}`;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);

      container.appendChild(card);
    });
  }

  function renderSections(sections) {
    const container = document.getElementById('homepage-sections');
    sections.forEach(section => {
      const block = document.createElement('div');
      block.className = 'section-block';

      const heading = document.createElement('h2');
      heading.textContent = section.heading;

      const content = document.createElement('p');
      content.textContent = section.content;

      block.appendChild(heading);
      block.appendChild(content);
      container.appendChild(block);
    });
  }

  function displayError(containerId, message) {
    const container = document.getElementById(containerId);
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error';
    errorMsg.textContent = message;
    container.appendChild(errorMsg);
  }

  loadData();